"use client";

import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { challengeSets, Challenge, getSkillDescription } from "@/lib/fact-fiction-challenges";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Shield,
  Newspaper,
  Brain,
  Trophy,
  RotateCcw,
  Home,
  ChevronRight,
  ThumbsUp,
  ThumbsDown,
  HelpCircle,
  Lightbulb,
  Target,
  Star,
  Quote,
  BookOpen
} from "lucide-react";
import { useMetrics } from "@/components/providers/metrics-provider";
import { GAME_SKILLS } from "@/lib/artemis-iq";

type GamePhase =
  | "intro"
  | "challenge"
  | "reasoning"
  | "feedback"
  | "complete";

interface UserAnswer {
  challengeId: string;
  userAnswer: boolean | string;
  userReasoning: string;
  isCorrect: boolean;
  timeSpent: number;
}

export default function FactFictionChallengePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const setId = params.id as string;
  const { addSession } = useMetrics();

  const [phase, setPhase] = useState<GamePhase>("intro");
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | string | null>(null);
  const [userReasoning, setUserReasoning] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);
  const [challengeStartTime, setChallengeStartTime] = useState<number>(Date.now());
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [gameStartTime, setGameStartTime] = useState<number>(Date.now());
  const [hasSubmittedMetrics, setHasSubmittedMetrics] = useState(false);

  const challengeSet = challengeSets.find(s => s.id === setId);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (phase === "challenge") {
      setChallengeStartTime(Date.now());
    }
  }, [phase, currentChallengeIndex]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!session || !challengeSet) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-foreground mb-2">Challenge not found</h2>
          <Button variant="outline" asChild>
            <Link href="/dashboard/fact-fiction">Back to Challenges</Link>
          </Button>
        </div>
      </div>
    );
  }

  const currentChallenge = challengeSet.challenges[currentChallengeIndex];
  const progress = ((currentChallengeIndex + 1) / challengeSet.challenges.length) * 100;
  const correctAnswers = userAnswers.filter(a => a.isCorrect).length;

  const handleStartChallenge = () => {
    setPhase("challenge");
    setChallengeStartTime(Date.now());
  };

  const handleSelectAnswer = (answer: boolean | string) => {
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    setPhase("reasoning");
  };

  const handleSubmitReasoning = () => {
    if (!currentChallenge) return;

    const timeSpent = Math.round((Date.now() - challengeStartTime) / 1000);

    let isCorrect = false;
    if (currentChallenge.type === "headline" || currentChallenge.type === "statistic") {
      isCorrect = selectedAnswer === currentChallenge.isTrue;
    } else if (currentChallenge.correctAnswer) {
      isCorrect = selectedAnswer === currentChallenge.correctAnswer;
    }

    if (isCorrect) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > bestStreak) {
        setBestStreak(newStreak);
      }
    } else {
      setStreak(0);
    }

    setUserAnswers(prev => [...prev, {
      challengeId: currentChallenge.id,
      userAnswer: selectedAnswer as boolean | string,
      userReasoning: userReasoning,
      isCorrect,
      timeSpent
    }]);

    setPhase("feedback");
    setShowExplanation(true);
  };

  const handleNextChallenge = () => {
    if (currentChallengeIndex < challengeSet.challenges.length - 1) {
      setCurrentChallengeIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setUserReasoning("");
      setShowExplanation(false);
      setPhase("challenge");
    } else {
      // Submit metrics when completing the challenge set
      if (!hasSubmittedMetrics) {
        setHasSubmittedMetrics(true);
        const timeSpent = Math.round((Date.now() - gameStartTime) / 1000);
        const finalCorrect = userAnswers.filter(a => a.isCorrect).length + (userAnswers[userAnswers.length - 1]?.isCorrect ? 0 : 0);
        const accuracy = Math.round((correctAnswers / challengeSet.challenges.length) * 100);
        const avgReasoning = userAnswers.filter(a => a.userReasoning.length > 20).length;
        const reasoningScore = Math.min(100, 50 + (avgReasoning / challengeSet.challenges.length) * 50);

        addSession({
          gameType: "fact-fiction",
          gameId: setId,
          timeSpent,
          scores: {
            accuracy,
            reasoning: Math.round(reasoningScore),
            speed: timeSpent < 300 ? 85 : timeSpent < 600 ? 70 : 55,
            consistency: Math.round((accuracy + reasoningScore) / 2)
          },
          skills: GAME_SKILLS["fact-fiction"],
          rawData: {
            totalChallenges: challengeSet.challenges.length,
            correctAnswers,
            bestStreak,
            challengeSetId: setId
          }
        });
      }
      setPhase("complete");
    }
  };

  const handleRestart = () => {
    setPhase("intro");
    setCurrentChallengeIndex(0);
    setUserAnswers([]);
    setSelectedAnswer(null);
    setUserReasoning("");
    setShowExplanation(false);
    setStreak(0);
    setBestStreak(0);
    setGameStartTime(Date.now());
    setHasSubmittedMetrics(false);
  };

  const getScoreMessage = () => {
    const percentage = (correctAnswers / challengeSet.challenges.length) * 100;
    if (percentage === 100) return { emoji: "🏆", message: "Perfect Score! You're a Truth Master!" };
    if (percentage >= 80) return { emoji: "🌟", message: "Excellent! You have sharp critical thinking skills!" };
    if (percentage >= 60) return { emoji: "👍", message: "Good job! Keep practicing to sharpen your skills." };
    if (percentage >= 40) return { emoji: "💪", message: "Nice effort! Each mistake is a learning opportunity." };
    return { emoji: "🎯", message: "Keep learning! Spotting misinformation takes practice." };
  };

  const getLastAnswer = () => {
    return userAnswers[userAnswers.length - 1];
  };

  // INTRO PHASE
  if (phase === "intro") {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-16 gap-4">
              <Link
                href="/dashboard/fact-fiction"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back to Challenges</span>
              </Link>
              <div className="h-6 w-px bg-border" />
              <h1 className="text-xl font-serif text-foreground">{challengeSet.title}</h1>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-card border border-border rounded-xl p-6 sm:p-10 text-center">
            <div className="text-6xl mb-6">{challengeSet.icon}</div>
            <h2 className="text-3xl font-serif text-foreground mb-4">{challengeSet.title}</h2>
            <p className="text-muted-foreground text-lg mb-6 max-w-xl mx-auto">
              {challengeSet.description}
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="bg-muted rounded-full px-4 py-2 text-sm">
                <Newspaper className="h-4 w-4 inline mr-1.5" />
                {challengeSet.challenges.length} Challenges
              </div>
              <div className="bg-muted rounded-full px-4 py-2 text-sm">
                <Target className="h-4 w-4 inline mr-1.5" />
                {challengeSet.difficulty}
              </div>
              <div className="bg-muted rounded-full px-4 py-2 text-sm">
                <Brain className="h-4 w-4 inline mr-1.5" />
                {challengeSet.category}
              </div>
            </div>

            <div className="bg-muted/30 rounded-xl p-6 mb-8 text-left">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-500" />
                Skills You&apos;ll Practice
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {challengeSet.skillsFocused.map((skill) => (
                  <div key={skill} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8 text-left">
              <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                How to Play
              </h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>1. Read each claim, headline, or scenario carefully</li>
                <li>2. Decide if it&apos;s true, false, or pick the best answer</li>
                <li>3. Explain your reasoning (this helps you learn!)</li>
                <li>4. See the answer and learn about the tricks used</li>
              </ul>
            </div>

            <Button variant="glow" size="lg" onClick={handleStartChallenge}>
              Begin Challenge
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </main>
      </div>
    );
  }

  // CHALLENGE PHASE
  if (phase === "challenge" && currentChallenge) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <Link
                  href="/dashboard/fact-fiction"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Link>
                <h1 className="text-lg font-serif text-foreground">{challengeSet.title}</h1>
              </div>
              <div className="flex items-center gap-4">
                {streak > 0 && (
                  <div className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                    🔥 {streak} streak
                  </div>
                )}
                <span className="text-sm text-muted-foreground">
                  {currentChallengeIndex + 1} / {challengeSet.challenges.length}
                </span>
              </div>
            </div>
            <div className="h-1 bg-muted -mx-4 sm:-mx-6 lg:-mx-8">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Skill Badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full">
              {currentChallenge.skill}
            </span>
            <span className={`text-xs font-medium px-3 py-1 rounded-full ${
              currentChallenge.difficulty === "easy" ? "bg-green-100 text-green-700" :
              currentChallenge.difficulty === "medium" ? "bg-yellow-100 text-yellow-700" :
              "bg-red-100 text-red-700"
            }`}>
              {currentChallenge.difficulty}
            </span>
          </div>

          <div className="bg-card border border-border rounded-xl overflow-hidden">
            {/* Challenge Content */}
            <div className="p-6 sm:p-8 border-b border-border">
              {currentChallenge.type === "headline" && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2">
                    <Newspaper className="h-4 w-4" />
                    Headline Check
                  </h3>
                  <div className="bg-muted/50 rounded-xl p-6 mb-4">
                    <p className="text-xl sm:text-2xl font-serif text-foreground text-center">
                      &ldquo;{currentChallenge.content.headline}&rdquo;
                    </p>
                    {currentChallenge.content.source && (
                      <p className="text-center text-sm text-muted-foreground mt-3">
                        Source: {currentChallenge.content.source}
                      </p>
                    )}
                  </div>
                  <p className="text-muted-foreground text-center">
                    Is this headline <strong>TRUE</strong> or <strong>FAKE/MISLEADING</strong>?
                  </p>
                </div>
              )}

              {currentChallenge.type === "source" && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Source Detective
                  </h3>
                  <div className="bg-muted/50 rounded-xl p-6 mb-4">
                    <p className="text-lg text-foreground text-center">
                      <strong>Claim:</strong> {currentChallenge.content.claim}
                    </p>
                  </div>
                  <p className="text-muted-foreground text-center mb-4">
                    Which source would be <strong>most reliable</strong> for this claim?
                  </p>
                </div>
              )}

              {currentChallenge.type === "fallacy" && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Spot the Fallacy
                  </h3>
                  <div className="bg-muted/50 rounded-xl p-6 mb-4">
                    <Quote className="h-6 w-6 text-muted-foreground mb-2 mx-auto" />
                    <p className="text-xl text-foreground text-center italic">
                      &ldquo;{currentChallenge.content.claim}&rdquo;
                    </p>
                  </div>
                  <p className="text-muted-foreground text-center mb-4">
                    What&apos;s wrong with this argument?
                  </p>
                </div>
              )}

              {currentChallenge.type === "statistic" && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Stats Check
                  </h3>
                  <div className="bg-muted/50 rounded-xl p-6 mb-4">
                    <p className="text-xl font-semibold text-foreground text-center mb-3">
                      &ldquo;{currentChallenge.content.claim}&rdquo;
                    </p>
                    {currentChallenge.content.article && (
                      <div className="bg-background/50 rounded-lg p-4 mt-4">
                        <p className="text-sm text-muted-foreground">
                          <BookOpen className="h-4 w-4 inline mr-1.5" />
                          <strong>Context:</strong> {currentChallenge.content.article}
                        </p>
                      </div>
                    )}
                  </div>
                  <p className="text-muted-foreground text-center">
                    Is this statistic being used <strong>honestly</strong> or is it <strong>misleading</strong>?
                  </p>
                </div>
              )}
            </div>

            {/* Answer Options */}
            <div className="p-6 sm:p-8 bg-muted/30">
              {(currentChallenge.type === "headline" || currentChallenge.type === "statistic") && (
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <button
                    onClick={() => handleSelectAnswer(true)}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      selectedAnswer === true
                        ? "border-green-500 bg-green-50"
                        : "border-border hover:border-green-300 hover:bg-green-50/50"
                    }`}
                  >
                    <ThumbsUp className={`h-8 w-8 mx-auto mb-2 ${
                      selectedAnswer === true ? "text-green-600" : "text-muted-foreground"
                    }`} />
                    <p className={`font-semibold ${
                      selectedAnswer === true ? "text-green-700" : "text-foreground"
                    }`}>
                      {currentChallenge.type === "statistic" ? "Honest" : "True"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {currentChallenge.type === "statistic" ? "Used fairly" : "This is accurate"}
                    </p>
                  </button>
                  <button
                    onClick={() => handleSelectAnswer(false)}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      selectedAnswer === false
                        ? "border-red-500 bg-red-50"
                        : "border-border hover:border-red-300 hover:bg-red-50/50"
                    }`}
                  >
                    <ThumbsDown className={`h-8 w-8 mx-auto mb-2 ${
                      selectedAnswer === false ? "text-red-600" : "text-muted-foreground"
                    }`} />
                    <p className={`font-semibold ${
                      selectedAnswer === false ? "text-red-700" : "text-foreground"
                    }`}>
                      {currentChallenge.type === "statistic" ? "Misleading" : "Fake/Misleading"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {currentChallenge.type === "statistic" ? "Tricks used" : "Not accurate"}
                    </p>
                  </button>
                </div>
              )}

              {(currentChallenge.type === "source" || currentChallenge.type === "fallacy") &&
                currentChallenge.content.options && (
                <div className="space-y-3 mb-6">
                  {currentChallenge.content.options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleSelectAnswer(option.id)}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                        selectedAnswer === option.id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className={`font-bold ${
                          selectedAnswer === option.id ? "text-primary" : "text-muted-foreground"
                        }`}>
                          {option.id.toUpperCase()}.
                        </span>
                        <span className="text-foreground">{option.text}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              <Button
                variant="glow"
                className="w-full"
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
              >
                Submit Answer
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // REASONING PHASE
  if (phase === "reasoning" && currentChallenge) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <h1 className="text-lg font-serif text-foreground">{challengeSet.title}</h1>
              <span className="text-sm text-muted-foreground">
                {currentChallengeIndex + 1} / {challengeSet.challenges.length}
              </span>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-card border border-border rounded-xl p-6 sm:p-8">
            <div className="text-center mb-6">
              <Brain className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-serif text-foreground mb-2">Explain Your Thinking</h2>
              <p className="text-muted-foreground">
                Why did you choose that answer? What clues helped you decide?
              </p>
            </div>

            {/* Show their answer */}
            <div className="bg-muted/50 rounded-xl p-4 mb-6">
              <p className="text-sm text-muted-foreground mb-1">Your answer:</p>
              <p className="font-semibold text-foreground">
                {typeof selectedAnswer === "boolean"
                  ? (selectedAnswer
                    ? (currentChallenge.type === "statistic" ? "Honest/Fair" : "True")
                    : (currentChallenge.type === "statistic" ? "Misleading" : "Fake/Misleading"))
                  : currentChallenge.content.options?.find(o => o.id === selectedAnswer)?.text
                }
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-foreground mb-2">
                What made you think this? (optional but helpful!)
              </label>
              <textarea
                value={userReasoning}
                onChange={(e) => setUserReasoning(e.target.value)}
                placeholder="I noticed that... / The source seemed... / This reminded me of..."
                className="w-full h-32 p-4 rounded-xl border border-border bg-background text-foreground resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setPhase("challenge")}
                className="flex-1"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Change Answer
              </Button>
              <Button
                variant="glow"
                onClick={handleSubmitReasoning}
                className="flex-1"
              >
                See Result
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // FEEDBACK PHASE
  if (phase === "feedback" && currentChallenge) {
    const lastAnswer = getLastAnswer();
    const isCorrect = lastAnswer?.isCorrect;

    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <h1 className="text-lg font-serif text-foreground">{challengeSet.title}</h1>
              <div className="flex items-center gap-4">
                {streak > 1 && (
                  <div className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                    🔥 {streak} streak!
                  </div>
                )}
                <span className="text-sm text-muted-foreground">
                  {currentChallengeIndex + 1} / {challengeSet.challenges.length}
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Result Banner */}
          <div className={`rounded-xl p-6 mb-6 ${
            isCorrect
              ? "bg-green-50 border border-green-200"
              : "bg-red-50 border border-red-200"
          }`}>
            <div className="flex items-center gap-4">
              {isCorrect ? (
                <CheckCircle2 className="h-12 w-12 text-green-600" />
              ) : (
                <XCircle className="h-12 w-12 text-red-600" />
              )}
              <div>
                <h2 className={`text-2xl font-bold ${isCorrect ? "text-green-700" : "text-red-700"}`}>
                  {isCorrect ? "Correct!" : "Not Quite"}
                </h2>
                <p className={isCorrect ? "text-green-600" : "text-red-600"}>
                  {isCorrect
                    ? "Great critical thinking!"
                    : "This is a tricky one - let's learn from it."}
                </p>
              </div>
            </div>
          </div>

          {/* Explanation */}
          <div className="bg-card border border-border rounded-xl p-6 sm:p-8 mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              Explanation
            </h3>
            <p className="text-foreground mb-6">{currentChallenge.explanation}</p>

            {/* Red Flags */}
            {currentChallenge.redFlags.length > 0 && (
              <div className="mb-6">
                <h4 className="font-medium text-red-700 mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Red Flags to Watch For
                </h4>
                <ul className="space-y-2">
                  {currentChallenge.redFlags.map((flag, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                      {flag}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Green Flags */}
            {currentChallenge.greenFlags && currentChallenge.greenFlags.length > 0 && (
              <div>
                <h4 className="font-medium text-green-700 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Signs of Reliability
                </h4>
                <ul className="space-y-2">
                  {currentChallenge.greenFlags.map((flag, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      {flag}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Skill Learned */}
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 mb-6">
            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              Skill: {currentChallenge.skill}
            </h3>
            <p className="text-muted-foreground text-sm">
              {getSkillDescription(currentChallenge.skill)}
            </p>
          </div>

          {/* Your Reasoning */}
          {lastAnswer?.userReasoning && (
            <div className="bg-muted/50 rounded-xl p-4 mb-6">
              <h4 className="font-medium text-foreground mb-2">Your reasoning:</h4>
              <p className="text-muted-foreground text-sm italic">&ldquo;{lastAnswer.userReasoning}&rdquo;</p>
            </div>
          )}

          <Button variant="glow" className="w-full" onClick={handleNextChallenge}>
            {currentChallengeIndex < challengeSet.challenges.length - 1 ? (
              <>
                Next Challenge
                <ChevronRight className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                See Results
                <Trophy className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </main>
      </div>
    );
  }

  // COMPLETE PHASE
  if (phase === "complete") {
    const { emoji, message } = getScoreMessage();
    const percentage = Math.round((correctAnswers / challengeSet.challenges.length) * 100);

    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-16">
              <h1 className="text-xl font-serif text-foreground">Challenge Complete!</h1>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Results Card */}
          <div className="bg-card border border-border rounded-xl p-6 sm:p-10 text-center mb-8">
            <div className="text-6xl mb-4">{emoji}</div>
            <h2 className="text-3xl font-serif text-foreground mb-2">{challengeSet.title}</h2>
            <p className="text-xl text-primary font-medium mb-6">{message}</p>

            {/* Score Circle */}
            <div className="relative w-40 h-40 mx-auto mb-8">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="12"
                  className="text-muted"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="12"
                  strokeDasharray={`${percentage * 4.4} 440`}
                  className="text-primary"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-foreground">{correctAnswers}</span>
                <span className="text-sm text-muted-foreground">of {challengeSet.challenges.length}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-muted/50 rounded-xl p-4">
                <Target className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{percentage}%</p>
                <p className="text-xs text-muted-foreground">Accuracy</p>
              </div>
              <div className="bg-muted/50 rounded-xl p-4">
                <Star className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{bestStreak}</p>
                <p className="text-xs text-muted-foreground">Best Streak</p>
              </div>
              <div className="bg-muted/50 rounded-xl p-4">
                <Brain className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{challengeSet.skillsFocused.length}</p>
                <p className="text-xs text-muted-foreground">Skills Practiced</p>
              </div>
            </div>

            {/* Completion Message */}
            <div className="bg-primary/10 rounded-xl p-6 mb-8">
              <p className="text-foreground font-medium">{challengeSet.completionMessage}</p>
            </div>

            {/* Skills Summary */}
            <div className="text-left bg-muted/30 rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Skills You Practiced
              </h3>
              <div className="flex flex-wrap gap-2">
                {challengeSet.skillsFocused.map((skill) => (
                  <span
                    key={skill}
                    className="bg-background border border-border text-foreground text-sm px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" className="flex-1" onClick={handleRestart}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
              <Button variant="glow" className="flex-1" asChild>
                <Link href="/dashboard/fact-fiction">
                  <Home className="mr-2 h-4 w-4" />
                  More Challenges
                </Link>
              </Button>
            </div>
          </div>

          {/* Key Takeaways */}
          <div className="bg-gradient-to-r from-primary/10 to-transparent border border-primary/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              💡 Remember These Tips
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">Check the source before believing</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">Watch for emotional manipulation</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">Question statistics and percentages</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">Verify before you share</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return null;
}
