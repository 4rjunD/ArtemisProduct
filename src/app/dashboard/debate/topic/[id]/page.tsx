"use client";

import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getDebateTopicById, type DebateTopic, type DebateSide } from "@/lib/debate-topics";
import {
  ArrowLeft,
  ArrowRight,
  ArrowLeftRight,
  Send,
  Lightbulb,
  CheckCircle,
  XCircle,
  Scale,
  Trophy,
  RotateCcw,
  Home,
  Plus,
  Trash2,
  MessageCircle,
  Zap
} from "lucide-react";
import { useMetrics } from "@/components/providers/metrics-provider";
import { GAME_SKILLS } from "@/lib/artemis-iq";

type GamePhase = "intro" | "side1-build" | "side1-challenge" | "switch" | "side2-build" | "side2-challenge" | "reflection" | "complete";

interface UserArgument {
  id: string;
  text: string;
  wasChallengerd?: boolean;
}

interface ChallengeExchange {
  challenge: string;
  response: string;
}

export default function DebateTopicPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const topicId = params.id as string;
  const { addSession } = useMetrics();

  const [topic, setTopic] = useState<DebateTopic | null>(null);
  const [gamePhase, setGamePhase] = useState<GamePhase>("intro");
  const [firstSide, setFirstSide] = useState<"for" | "against">("for");
  const [side1Arguments, setSide1Arguments] = useState<UserArgument[]>([]);
  const [side2Arguments, setSide2Arguments] = useState<UserArgument[]>([]);
  const [currentArgument, setCurrentArgument] = useState("");
  const [challengeExchanges1, setChallengeExchanges1] = useState<ChallengeExchange[]>([]);
  const [challengeExchanges2, setChallengeExchanges2] = useState<ChallengeExchange[]>([]);
  const [currentChallenge, setCurrentChallenge] = useState<string | null>(null);
  const [challengeResponse, setChallengeResponse] = useState("");
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [reflectionAnswers, setReflectionAnswers] = useState<string[]>([]);
  const [currentReflection, setCurrentReflection] = useState("");
  const [reflectionIndex, setReflectionIndex] = useState(0);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [hasSubmittedMetrics, setHasSubmittedMetrics] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (topicId) {
      const topicData = getDebateTopicById(topicId);
      if (topicData) {
        setTopic(topicData);
      }
    }
  }, [topicId]);

  // Submit metrics when debate is complete
  useEffect(() => {
    if (gamePhase === "complete" && topic && !hasSubmittedMetrics) {
      setHasSubmittedMetrics(true);
      const timeSpent = Math.round((Date.now() - startTime) / 1000);

      // Calculate scores based on engagement
      const totalArgs = side1Arguments.length + side2Arguments.length;
      const totalChallenges = challengeExchanges1.length + challengeExchanges2.length;
      const totalReflections = reflectionAnswers.filter(r => r.length > 20).length;

      // Engagement score - did they actually engage with both sides?
      const engagementScore = Math.min(100, (totalArgs * 15) + (totalChallenges * 10) + (totalReflections * 10));

      // Quality score based on argument length
      const avgArgLength = totalArgs > 0
        ? ([...side1Arguments, ...side2Arguments].reduce((sum, a) => sum + a.text.length, 0) / totalArgs)
        : 0;
      const qualityScore = Math.min(100, avgArgLength > 100 ? 90 : avgArgLength > 50 ? 70 : 50);

      addSession({
        gameType: "debate",
        gameId: topicId,
        timeSpent,
        scores: {
          accuracy: engagementScore, // Using engagement as "accuracy" for debates
          reasoning: qualityScore,
          speed: timeSpent < 600 ? 85 : timeSpent < 900 ? 70 : 55,
          consistency: Math.round((engagementScore + qualityScore) / 2)
        },
        skills: GAME_SKILLS["debate"],
        rawData: {
          side1Arguments: side1Arguments.length,
          side2Arguments: side2Arguments.length,
          challengesHandled: totalChallenges,
          reflectionsCompleted: reflectionAnswers.length
        }
      });
    }
  }, [gamePhase, topic, hasSubmittedMetrics, side1Arguments, side2Arguments, challengeExchanges1, challengeExchanges2, reflectionAnswers, startTime, topicId, addSession]);

  if (status === "loading" || !topic) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading debate...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const getCurrentSide = (): DebateSide => {
    if (gamePhase.startsWith("side1")) {
      return firstSide === "for" ? topic.forSide : topic.againstSide;
    } else {
      return firstSide === "for" ? topic.againstSide : topic.forSide;
    }
  };

  const getOppositeSide = (): DebateSide => {
    if (gamePhase.startsWith("side1")) {
      return firstSide === "for" ? topic.againstSide : topic.forSide;
    } else {
      return firstSide === "for" ? topic.forSide : topic.againstSide;
    }
  };

  const addArgument = () => {
    if (!currentArgument.trim()) return;

    const newArg: UserArgument = {
      id: Date.now().toString(),
      text: currentArgument.trim()
    };

    if (gamePhase === "side1-build") {
      setSide1Arguments([...side1Arguments, newArg]);
    } else {
      setSide2Arguments([...side2Arguments, newArg]);
    }
    setCurrentArgument("");
  };

  const removeArgument = (id: string) => {
    if (gamePhase === "side1-build") {
      setSide1Arguments(side1Arguments.filter(a => a.id !== id));
    } else {
      setSide2Arguments(side2Arguments.filter(a => a.id !== id));
    }
  };

  const generateChallenge = (args: UserArgument[], side: DebateSide): string => {
    const argTexts = args.map(a => a.text.toLowerCase()).join(" ");

    for (const counter of side.counterArguments) {
      if (counter.triggerKeywords.some(kw => argTexts.includes(kw.toLowerCase()))) {
        return counter.challenge;
      }
    }

    // Default challenges if no keyword match
    const defaults = [
      "That's an interesting point, but have you considered the opposing view? What would someone who disagrees say?",
      "Can you think of a situation where your argument might NOT apply?",
      "What evidence would you need to prove this point to someone who disagrees?",
      "Is this based on facts or feelings? How would you back this up?"
    ];
    return defaults[Math.floor(Math.random() * defaults.length)];
  };

  const startChallenge = () => {
    const args = gamePhase === "side1-build" ? side1Arguments : side2Arguments;
    const oppositeSide = getOppositeSide();
    const challenge = generateChallenge(args, oppositeSide);
    setCurrentChallenge(challenge);
    setChallengeIndex(0);

    if (gamePhase === "side1-build") {
      setGamePhase("side1-challenge");
    } else {
      setGamePhase("side2-challenge");
    }
  };

  const submitChallengeResponse = () => {
    if (!challengeResponse.trim() || !currentChallenge) return;

    const exchange: ChallengeExchange = {
      challenge: currentChallenge,
      response: challengeResponse.trim()
    };

    if (gamePhase === "side1-challenge") {
      setChallengeExchanges1([...challengeExchanges1, exchange]);
    } else {
      setChallengeExchanges2([...challengeExchanges2, exchange]);
    }

    setChallengeResponse("");

    // Generate another challenge or move on
    if (challengeIndex < 1) { // 2 challenges per side
      setChallengeIndex(challengeIndex + 1);
      const args = gamePhase === "side1-challenge" ? side1Arguments : side2Arguments;
      const oppositeSide = getOppositeSide();

      // Get a different challenge
      const usedChallenges = gamePhase === "side1-challenge"
        ? challengeExchanges1.map(e => e.challenge)
        : challengeExchanges2.map(e => e.challenge);

      let newChallenge = generateChallenge(args, oppositeSide);
      let attempts = 0;
      while (usedChallenges.includes(newChallenge) && attempts < 5) {
        newChallenge = generateChallenge(args, oppositeSide);
        attempts++;
      }
      setCurrentChallenge(newChallenge);
    } else {
      // Move to next phase
      if (gamePhase === "side1-challenge") {
        setGamePhase("switch");
      } else {
        setGamePhase("reflection");
      }
      setCurrentChallenge(null);
    }
  };

  const submitReflection = () => {
    if (!currentReflection.trim()) return;

    setReflectionAnswers([...reflectionAnswers, currentReflection.trim()]);
    setCurrentReflection("");

    if (reflectionIndex < topic.reflectionQuestions.length - 1) {
      setReflectionIndex(reflectionIndex + 1);
    } else {
      setGamePhase("complete");
    }
  };

  const resetDebate = () => {
    setGamePhase("intro");
    setSide1Arguments([]);
    setSide2Arguments([]);
    setChallengeExchanges1([]);
    setChallengeExchanges2([]);
    setReflectionAnswers([]);
    setReflectionIndex(0);
    setChallengeIndex(0);
    setCurrentArgument("");
    setChallengeResponse("");
    setCurrentReflection("");
    setCurrentChallenge(null);
  };

  // INTRO PHASE
  if (gamePhase === "intro") {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-14 gap-4">
              <Link
                href="/dashboard/debate"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <div className="h-5 w-px bg-border" />
              <h1 className="text-lg font-serif text-foreground">Debate Arena</h1>
            </div>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-8">
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            {/* Topic Header */}
            <div className="bg-gradient-to-br from-orange-500/20 to-orange-500/5 p-8 text-center border-b border-border">
              <div className="text-6xl mb-4">{topic.icon}</div>
              <h1 className="text-2xl font-serif text-foreground mb-4">{topic.title}</h1>
              <div className="bg-background/80 rounded-lg p-4 max-w-md mx-auto">
                <p className="font-medium text-foreground text-lg">
                  &ldquo;{topic.question}&rdquo;
                </p>
              </div>
            </div>

            <div className="p-6">
              <p className="text-muted-foreground text-center mb-6">
                {topic.description}
              </p>

              {/* Choose Starting Side */}
              <div className="mb-6">
                <h3 className="font-medium text-foreground mb-3 text-center">
                  Which side do you want to argue FIRST?
                </h3>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  (Don&apos;t worry - you&apos;ll argue BOTH sides!)
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setFirstSide("for")}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      firstSide === "for"
                        ? "border-green-500 bg-green-50"
                        : "border-border hover:border-green-300"
                    }`}
                  >
                    <div className="text-2xl mb-2">✓</div>
                    <div className="font-medium text-foreground">YES</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {topic.forSide.label.replace("YES - ", "")}
                    </div>
                  </button>

                  <button
                    onClick={() => setFirstSide("against")}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      firstSide === "against"
                        ? "border-red-500 bg-red-50"
                        : "border-border hover:border-red-300"
                    }`}
                  >
                    <div className="text-2xl mb-2">✗</div>
                    <div className="font-medium text-foreground">NO</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {topic.againstSide.label.replace("NO - ", "")}
                    </div>
                  </button>
                </div>
              </div>

              {/* How It Works */}
              <div className="bg-muted/30 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-orange-500" />
                  How This Works
                </h4>
                <ol className="text-sm text-muted-foreground space-y-1">
                  <li>1. Build arguments for your first side</li>
                  <li>2. Face challenges from the &ldquo;devil&apos;s advocate&rdquo;</li>
                  <li>3. <strong>Switch sides</strong> and argue the opposite</li>
                  <li>4. Face challenges again</li>
                  <li>5. Reflect on what you learned</li>
                </ol>
              </div>

              <Button
                variant="glow"
                size="lg"
                className="w-full"
                onClick={() => setGamePhase("side1-build")}
              >
                Start Debate
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // SWITCH SIDES PHASE
  if (gamePhase === "switch") {
    const completedSide = getCurrentSide();
    const nextSide = getOppositeSide();

    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-14 gap-4">
              <Link
                href="/dashboard/debate"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <div className="h-5 w-px bg-border" />
              <h1 className="text-lg font-serif text-foreground">{topic.title}</h1>
            </div>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-8">
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-br from-orange-500/20 to-yellow-500/10 p-8 text-center">
              <div className="text-6xl mb-4">
                <ArrowLeftRight className="h-16 w-16 mx-auto text-orange-500" />
              </div>
              <h1 className="text-2xl font-serif text-foreground mb-2">Time to Switch Sides!</h1>
              <p className="text-muted-foreground">
                You did great arguing the {completedSide.position === "for" ? "YES" : "NO"} side.
              </p>
            </div>

            <div className="p-6">
              <div className="bg-muted/30 rounded-lg p-4 mb-6">
                <h3 className="font-medium text-foreground mb-2">Your Challenge:</h3>
                <p className="text-muted-foreground">
                  Now argue the <strong>OPPOSITE</strong> position just as convincingly.
                  This is where the real learning happens!
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-lg bg-muted/20 border border-border opacity-50">
                  <div className="text-sm text-muted-foreground mb-1">Completed ✓</div>
                  <div className="font-medium text-foreground">
                    {completedSide.position === "for" ? "YES" : "NO"} Side
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {side1Arguments.length} arguments made
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-primary/10 border-2 border-primary">
                  <div className="text-sm text-primary mb-1">Up Next →</div>
                  <div className="font-medium text-foreground">
                    {nextSide.position === "for" ? "YES" : "NO"} Side
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Argue this side now
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-yellow-800 mb-1 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  Pro Tip
                </h4>
                <p className="text-sm text-yellow-700">
                  Think about what annoyed you when you faced challenges on the first side.
                  Those challenges came from THIS side&apos;s perspective!
                </p>
              </div>

              <Button
                variant="glow"
                size="lg"
                className="w-full"
                onClick={() => setGamePhase("side2-build")}
              >
                Argue the {nextSide.position === "for" ? "YES" : "NO"} Side
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // REFLECTION PHASE
  if (gamePhase === "reflection") {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-14 gap-4">
              <Link
                href="/dashboard/debate"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <div className="h-5 w-px bg-border" />
              <h1 className="text-lg font-serif text-foreground">{topic.title}</h1>
            </div>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-8">
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-500/5 p-6 text-center border-b border-border">
              <div className="text-5xl mb-3">🤔</div>
              <h1 className="text-2xl font-serif text-foreground">Time to Reflect</h1>
              <p className="text-muted-foreground">
                You argued both sides. Now let&apos;s think about what you learned.
              </p>
            </div>

            <div className="p-6">
              {/* Progress */}
              <div className="flex items-center gap-2 mb-6">
                {topic.reflectionQuestions.map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 flex-1 rounded-full ${
                      i < reflectionIndex ? "bg-primary" :
                      i === reflectionIndex ? "bg-primary/50" : "bg-muted"
                    }`}
                  />
                ))}
              </div>

              <div className="mb-6">
                <div className="text-sm text-muted-foreground mb-2">
                  Question {reflectionIndex + 1} of {topic.reflectionQuestions.length}
                </div>
                <h3 className="text-lg font-medium text-foreground mb-4">
                  {topic.reflectionQuestions[reflectionIndex]}
                </h3>
                <textarea
                  value={currentReflection}
                  onChange={(e) => setCurrentReflection(e.target.value)}
                  placeholder="Take your time to think about this..."
                  className="w-full h-32 px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  autoFocus
                />
              </div>

              <Button
                variant="glow"
                className="w-full"
                onClick={submitReflection}
                disabled={currentReflection.trim().length < 10}
              >
                {reflectionIndex < topic.reflectionQuestions.length - 1 ? (
                  <>Next Question <ArrowRight className="ml-2 h-4 w-4" /></>
                ) : (
                  <>Complete Debate <CheckCircle className="ml-2 h-4 w-4" /></>
                )}
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // COMPLETE PHASE
  if (gamePhase === "complete") {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-14 gap-4">
              <Link
                href="/dashboard/debate"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <div className="h-5 w-px bg-border" />
              <h1 className="text-lg font-serif text-foreground">{topic.title}</h1>
            </div>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-8">
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            {/* Celebration Header */}
            <div className="bg-gradient-to-br from-green-500/20 to-green-500/5 p-8 text-center border-b border-border">
              <Trophy className="h-16 w-16 mx-auto text-green-500 mb-4" />
              <h1 className="text-2xl font-serif text-foreground mb-2">Debate Complete!</h1>
              <p className="text-muted-foreground">
                You successfully argued both sides of the debate.
              </p>
            </div>

            <div className="p-6">
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-700">{side1Arguments.length}</div>
                  <div className="text-sm text-green-600">
                    {firstSide === "for" ? "YES" : "NO"} Arguments
                  </div>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-red-700">{side2Arguments.length}</div>
                  <div className="text-sm text-red-600">
                    {firstSide === "for" ? "NO" : "YES"} Arguments
                  </div>
                </div>
              </div>

              {/* Key Insight */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
                <h3 className="font-medium text-foreground mb-2 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  Key Insight
                </h3>
                <p className="text-foreground">{topic.keyInsight}</p>
              </div>

              {/* Your Reflections */}
              <div className="mb-6">
                <h3 className="font-medium text-foreground mb-3">Your Reflections</h3>
                <div className="space-y-3">
                  {topic.reflectionQuestions.map((q, i) => (
                    <div key={i} className="bg-muted/30 rounded-lg p-3">
                      <div className="text-sm text-muted-foreground mb-1">{q}</div>
                      <div className="text-foreground">{reflectionAnswers[i]}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills Practiced */}
              <div className="mb-6">
                <h3 className="font-medium text-foreground mb-3">Skills You Practiced</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-muted px-3 py-1 rounded-full text-sm">🎭 Perspective Taking</span>
                  <span className="bg-muted px-3 py-1 rounded-full text-sm">💪 Argument Building</span>
                  <span className="bg-muted px-3 py-1 rounded-full text-sm">🔍 Bias Recognition</span>
                  <span className="bg-muted px-3 py-1 rounded-full text-sm">🧠 Critical Thinking</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" className="flex-1" onClick={resetDebate}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Debate Again
                </Button>
                <Button variant="glow" className="flex-1" asChild>
                  <Link href="/dashboard/debate">
                    <Home className="h-4 w-4 mr-2" />
                    More Topics
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // BUILD & CHALLENGE PHASES (Main Gameplay)
  const currentSide = getCurrentSide();
  const isBuilding = gamePhase === "side1-build" || gamePhase === "side2-build";
  const isChallenging = gamePhase === "side1-challenge" || gamePhase === "side2-challenge";
  const currentArgs = gamePhase.startsWith("side1") ? side1Arguments : side2Arguments;
  const sideNumber = gamePhase.startsWith("side1") ? 1 : 2;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card flex-shrink-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard/debate"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <div className="h-5 w-px bg-border" />
              <h1 className="text-lg font-serif text-foreground">{topic.title}</h1>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              currentSide.position === "for"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}>
              {currentSide.position === "for" ? "✓ YES" : "✗ NO"} Side
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="h-1 bg-muted flex-shrink-0">
        <div
          className="h-full bg-primary transition-all duration-500"
          style={{
            width: `${
              gamePhase === "side1-build" ? 20 :
              gamePhase === "side1-challenge" ? 35 :
              gamePhase === "side2-build" ? 60 :
              gamePhase === "side2-challenge" ? 80 : 100
            }%`
          }}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-2xl mx-auto px-4 py-6 w-full">
        {/* Question Reminder */}
        <div className="bg-muted/30 rounded-lg p-3 mb-4 text-center">
          <p className="text-sm text-muted-foreground">
            {currentSide.position === "for" ? "Arguing YES:" : "Arguing NO:"} &ldquo;{topic.question}&rdquo;
          </p>
        </div>

        {/* BUILD PHASE */}
        {isBuilding && (
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className={`p-4 border-b border-border ${
              currentSide.position === "for"
                ? "bg-green-50"
                : "bg-red-50"
            }`}>
              <h2 className="font-semibold text-foreground">
                Round {sideNumber}: Build Your Arguments
              </h2>
              <p className="text-sm text-muted-foreground">
                {currentSide.starterPrompt}
              </p>
            </div>

            <div className="p-4">
              {/* Current Arguments */}
              {currentArgs.length > 0 && (
                <div className="mb-4">
                  <div className="text-sm text-muted-foreground mb-2">
                    Your Arguments ({currentArgs.length})
                  </div>
                  <div className="space-y-2">
                    {currentArgs.map((arg, i) => (
                      <div
                        key={arg.id}
                        className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg group"
                      >
                        <div className={`h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                          currentSide.position === "for"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}>
                          {i + 1}
                        </div>
                        <p className="flex-1 text-foreground">{arg.text}</p>
                        <button
                          onClick={() => removeArgument(arg.id)}
                          className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-opacity"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Add Argument */}
              <div className="mb-4">
                <textarea
                  value={currentArgument}
                  onChange={(e) => setCurrentArgument(e.target.value)}
                  placeholder={`Add an argument for the ${currentSide.position === "for" ? "YES" : "NO"} side...`}
                  className="w-full h-24 px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      addArgument();
                    }
                  }}
                />
                <div className="flex justify-between items-center mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addArgument}
                    disabled={!currentArgument.trim()}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Argument
                  </Button>
                  <span className="text-xs text-muted-foreground">
                    Press Enter to add
                  </span>
                </div>
              </div>

              {/* Sample Arguments Hint */}
              <details className="mb-4">
                <summary className="text-sm text-primary cursor-pointer hover:underline">
                  💡 Need ideas? Click for hints
                </summary>
                <div className="mt-2 space-y-2">
                  {currentSide.sampleArguments.slice(0, 3).map((sample) => (
                    <div key={sample.id} className="text-sm p-2 bg-primary/5 rounded border-l-2 border-primary">
                      <span className="font-medium">{sample.point}:</span>{" "}
                      <span className="text-muted-foreground">{sample.explanation}</span>
                    </div>
                  ))}
                </div>
              </details>

              {/* Proceed to Challenge */}
              <Button
                variant="glow"
                className="w-full"
                onClick={startChallenge}
                disabled={currentArgs.length < 2}
              >
                {currentArgs.length < 2
                  ? `Add ${2 - currentArgs.length} more argument${currentArgs.length === 1 ? '' : 's'}`
                  : "Face the Devil's Advocate"
                }
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* CHALLENGE PHASE */}
        {isChallenging && currentChallenge && (
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="bg-orange-50 p-4 border-b border-border">
              <h2 className="font-semibold text-foreground flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-orange-500" />
                Devil&apos;s Advocate Challenge
              </h2>
              <p className="text-sm text-muted-foreground">
                Someone who disagrees with you says...
              </p>
            </div>

            <div className="p-4">
              {/* The Challenge */}
              <div className="bg-orange-100 border border-orange-200 rounded-lg p-4 mb-4">
                <p className="text-foreground font-medium">&ldquo;{currentChallenge}&rdquo;</p>
              </div>

              {/* Response Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-foreground mb-2">
                  How do you respond?
                </label>
                <textarea
                  value={challengeResponse}
                  onChange={(e) => setChallengeResponse(e.target.value)}
                  placeholder="Defend your position..."
                  className="w-full h-28 px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  autoFocus
                />
              </div>

              {/* Previous Exchanges */}
              {(gamePhase === "side1-challenge" ? challengeExchanges1 : challengeExchanges2).length > 0 && (
                <div className="mb-4">
                  <div className="text-sm text-muted-foreground mb-2">Previous exchanges:</div>
                  {(gamePhase === "side1-challenge" ? challengeExchanges1 : challengeExchanges2).map((ex, i) => (
                    <div key={i} className="text-sm bg-muted/30 rounded p-2 mb-2">
                      <div className="text-orange-700">Challenge: {ex.challenge}</div>
                      <div className="text-foreground mt-1">You: {ex.response}</div>
                    </div>
                  ))}
                </div>
              )}

              <Button
                variant="glow"
                className="w-full"
                onClick={submitChallengeResponse}
                disabled={challengeResponse.trim().length < 10}
              >
                <Send className="h-4 w-4 mr-2" />
                Submit Response
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-2">
                Challenge {challengeIndex + 1} of 2
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
