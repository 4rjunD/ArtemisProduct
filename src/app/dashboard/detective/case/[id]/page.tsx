"use client";

import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getCaseById, type Case, type Clue, type Suspect } from "@/lib/detective-cases";
import {
  ArrowLeft,
  Search,
  Users,
  FileText,
  MessageCircle,
  Send,
  CheckCircle,
  Eye,
  EyeOff,
  ChevronRight,
  Lightbulb,
  Award,
  RotateCcw
} from "lucide-react";
import { useMetrics } from "@/components/providers/metrics-provider";
import { GAME_SKILLS } from "@/lib/artemis-iq";

type GamePhase = "intro" | "investigation" | "accusation" | "result";
type Tab = "story" | "clues" | "suspects" | "notebook";

interface Message {
  role: "assistant" | "user";
  content: string;
}

export default function CasePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const caseId = params.id as string;
  const { addSession } = useMetrics();

  const [caseData, setCaseData] = useState<Case | null>(null);
  const [gamePhase, setGamePhase] = useState<GamePhase>("intro");
  const [activeTab, setActiveTab] = useState<Tab>("story");
  const [revealedClues, setRevealedClues] = useState<string[]>([]);
  const [selectedSuspect, setSelectedSuspect] = useState<string | null>(null);
  const [reasoning, setReasoning] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [hintsUsed, setHintsUsed] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showSuspectDetail, setShowSuspectDetail] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [hasSubmittedMetrics, setHasSubmittedMetrics] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (caseId) {
      const data = getCaseById(caseId);
      if (data) {
        setCaseData(data);
        setMessages([
          {
            role: "assistant",
            content: `Welcome, Detective ${session?.user?.name?.split(" ")[0] || ""}! I'm here to help you think through this case. I won't give you the answer, but I'll ask questions to help you reason through the evidence. Ready to start investigating?`
          }
        ]);
      }
    }
  }, [caseId, session]);

  if (status === "loading" || !caseData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading case file...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const revealClue = (clueId: string) => {
    if (!revealedClues.includes(clueId)) {
      setRevealedClues([...revealedClues, clueId]);
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = { role: "user", content: inputMessage };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");

    // Simulate AI response with Socratic questioning
    setTimeout(() => {
      let response = "";
      const lowerInput = inputMessage.toLowerCase();

      if (lowerInput.includes("hint") || lowerInput.includes("help")) {
        if (hintsUsed < caseData.guidingQuestions.length) {
          response = caseData.guidingQuestions[hintsUsed];
          setHintsUsed((prev) => prev + 1);
        } else {
          response = "You've used all the hints! Trust your reasoning - look at the evidence you've gathered and think about what it tells you.";
        }
      } else if (lowerInput.includes("emma") || lowerInput.includes("rodriguez")) {
        response = "Interesting that you're thinking about Emma. What evidence connects her to the crime? And what about her alibi - does it fully check out?";
      } else if (lowerInput.includes("tyler") || lowerInput.includes("brooks")) {
        response = "Tyler is a suspect, but think carefully: the principal says she was with him the whole time. How reliable is that alibi compared to others?";
      } else if (lowerInput.includes("patterson") || lowerInput.includes("teacher")) {
        response = "Mr. Patterson does seem grumpy! But consider: what size are the footprints? Would they match an adult? What else might rule him out?";
      } else if (lowerInput.includes("thread") || lowerInput.includes("orange")) {
        response = "Good observation about the thread! Physical evidence is important. Who was wearing something that matches? This is a strong clue.";
      } else if (lowerInput.includes("footprint") || lowerInput.includes("mud")) {
        response = "The muddy footprints tell us something about the person. Think about the size - does that narrow down your suspects?";
      } else if (lowerInput.includes("text") || lowerInput.includes("message")) {
        response = "That text message is very interesting! What was the timing? And what does the message suggest about what the person was planning?";
      } else if (lowerInput.includes("sure") || lowerInput.includes("know") || lowerInput.includes("think it")) {
        response = "Hold on - before you decide, can you explain your reasoning? What specific clues point to your suspect, and how do you rule out the others?";
      } else if (revealedClues.length < 3) {
        response = "You're asking good questions! But I notice you haven't found all the clues yet. More evidence might help you see the full picture. Keep investigating!";
      } else {
        const responses = [
          "That's an interesting thought. What evidence supports that idea?",
          "Good thinking! Now, how does that fit with the other clues you've found?",
          "Before deciding, ask yourself: does this suspect have a solid alibi? Can anyone confirm where they were?",
          "Think about motive AND opportunity. Who had both?",
          "What does the timeline tell you? When did things happen and who could have been there?"
        ];
        response = responses[Math.floor(Math.random() * responses.length)];
      }

      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    }, 800);
  };

  const handleAccusation = async () => {
    if (!selectedSuspect || !reasoning.trim() || !caseData) return;

    const isAnswerCorrect = selectedSuspect === caseData.solution.culprit;
    setIsCorrect(isAnswerCorrect);
    setGamePhase("result");

    // Submit metrics if not already submitted
    if (!hasSubmittedMetrics) {
      setHasSubmittedMetrics(true);
      const timeSpent = Math.round((Date.now() - startTime) / 1000);

      // Get AI evaluation of reasoning (token-optimized)
      let reasoningScore = 50;
      try {
        const evalRes = await fetch("/api/evaluate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            gameType: "detective",
            userReasoning: reasoning,
            context: caseData.title,
            isCorrect: isAnswerCorrect
          })
        });
        const evalData = await evalRes.json();
        reasoningScore = evalData.score || 50;
      } catch (e) {
        console.error("Evaluation failed:", e);
      }

      // Calculate accuracy based on clues found and correct answer
      const clueBonus = (revealedClues.length / caseData.clues.length) * 30;
      const hintPenalty = hintsUsed * 5;
      const accuracy = isAnswerCorrect
        ? Math.min(100, 70 + clueBonus - hintPenalty)
        : Math.max(20, 30 + clueBonus - hintPenalty);

      addSession({
        gameType: "detective",
        gameId: caseId,
        timeSpent,
        scores: {
          accuracy: Math.round(accuracy),
          reasoning: reasoningScore,
          speed: timeSpent < 300 ? 90 : timeSpent < 600 ? 75 : 60,
          consistency: Math.round((accuracy + reasoningScore) / 2)
        },
        skills: GAME_SKILLS["detective"],
        rawData: {
          cluesFound: revealedClues.length,
          totalClues: caseData.clues.length,
          hintsUsed,
          isCorrect: isAnswerCorrect
        }
      });
    }
  };

  const resetGame = () => {
    setGamePhase("intro");
    setActiveTab("story");
    setRevealedClues([]);
    setSelectedSuspect(null);
    setReasoning("");
    setMessages([
      {
        role: "assistant",
        content: `Welcome back, Detective! Ready to take another crack at this case? Remember what you learned last time!`
      }
    ]);
    setHintsUsed(0);
    setIsCorrect(null);
    setStartTime(Date.now());
    setHasSubmittedMetrics(false);
  };

  // Intro Phase
  if (gamePhase === "intro") {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-16 gap-4">
              <Link
                href="/dashboard/detective"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back to Cases</span>
              </Link>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            {/* Case File Header */}
            <div className="bg-gradient-to-r from-red-900 to-red-800 text-white p-6">
              <div className="flex items-center gap-2 text-red-200 text-sm mb-2">
                <FileText className="h-4 w-4" />
                CASE FILE #{caseData.id.toUpperCase()}
              </div>
              <h1 className="text-3xl font-serif mb-2">{caseData.title}</h1>
              <p className="text-red-100">Location: {caseData.setting}</p>
            </div>

            {/* Case Brief */}
            <div className="p-6">
              <div className="prose prose-sm max-w-none">
                <h3 className="text-lg font-semibold text-foreground mb-4">📋 Case Brief</h3>
                <div className="bg-muted/50 rounded-lg p-4 border border-border whitespace-pre-line text-foreground leading-relaxed">
                  {caseData.fullStory}
                </div>
              </div>

              {/* Mission Objectives */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">🎯 Your Mission</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary text-sm font-medium">1</span>
                    </div>
                    <span className="text-muted-foreground">Search for clues at different locations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary text-sm font-medium">2</span>
                    </div>
                    <span className="text-muted-foreground">Interview the suspects and check their alibis</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary text-sm font-medium">3</span>
                    </div>
                    <span className="text-muted-foreground">Use the AI assistant to help you think (not to get answers!)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary text-sm font-medium">4</span>
                    </div>
                    <span className="text-muted-foreground">Make your accusation and explain your reasoning</span>
                  </li>
                </ul>
              </div>

              {/* Start Button */}
              <div className="mt-8 flex justify-center">
                <Button
                  variant="glow"
                  size="lg"
                  className="text-lg px-8"
                  onClick={() => setGamePhase("investigation")}
                >
                  Begin Investigation
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Result Phase
  if (gamePhase === "result") {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-16 gap-4">
              <Link
                href="/dashboard/detective"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back to Cases</span>
              </Link>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            {/* Result Header */}
            <div className={`p-8 text-center ${isCorrect ? 'bg-gradient-to-r from-green-600 to-green-500' : 'bg-gradient-to-r from-orange-600 to-orange-500'} text-white`}>
              <div className="text-6xl mb-4">
                {isCorrect ? '🎉' : '🤔'}
              </div>
              <h1 className="text-3xl font-serif mb-2">
                {isCorrect ? 'Case Solved!' : 'Not Quite Right'}
              </h1>
              <p className="text-white/80">
                {isCorrect
                  ? 'Excellent detective work! You cracked the case!'
                  : "Good try! Let's look at what the evidence actually showed."}
              </p>
            </div>

            <div className="p-6">
              {/* Your Answer */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">Your Accusation</h3>
                <div className="bg-muted/50 rounded-lg p-4 border border-border">
                  <p className="font-medium text-foreground">
                    You accused: {caseData.suspects.find(s => s.id === selectedSuspect)?.name}
                  </p>
                  <p className="text-muted-foreground mt-2">Your reasoning: {reasoning}</p>
                </div>
              </div>

              {/* The Truth */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  The Solution
                </h3>
                <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                  <p className="font-medium text-foreground mb-2">
                    The culprit was: {caseData.suspects.find(s => s.id === caseData.solution.culprit)?.name}
                  </p>
                  <p className="text-muted-foreground">{caseData.solution.explanation}</p>
                </div>
              </div>

              {/* Key Learning */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-500" />
                  What This Case Teaches
                </h3>
                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                  <ul className="space-y-2 text-sm text-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Always verify alibis - can anyone confirm where someone was?</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Physical evidence (like thread color, footprint size) can narrow down suspects</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Timing matters - check when things happened and who could have been there</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Don&apos;t let first impressions fool you - follow the evidence, not assumptions</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-muted/50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-foreground">{revealedClues.length}/{caseData.clues.length}</div>
                  <div className="text-xs text-muted-foreground">Clues Found</div>
                </div>
                <div className="bg-muted/50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-foreground">{hintsUsed}</div>
                  <div className="text-xs text-muted-foreground">Hints Used</div>
                </div>
                <div className="bg-muted/50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-foreground">{isCorrect ? '⭐' : '—'}</div>
                  <div className="text-xs text-muted-foreground">Case Status</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" className="flex-1" onClick={resetGame}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
                <Button variant="glow" className="flex-1" asChild>
                  <Link href="/dashboard/detective">
                    Back to Cases
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Investigation Phase (Main Game)
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard/detective"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <div className="h-5 w-px bg-border" />
              <h1 className="text-lg font-serif text-foreground">{caseData.title}</h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm text-muted-foreground">
                🔍 {revealedClues.length}/{caseData.clues.length} clues
              </div>
              <Button
                variant="glow"
                size="sm"
                onClick={() => setGamePhase("accusation")}
                disabled={revealedClues.length < 3}
              >
                Make Accusation
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Accusation Modal */}
      {gamePhase === "accusation" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-xl border border-border max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-serif text-foreground mb-4">🎯 Make Your Accusation</h2>

              <div className="mb-4">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Who did it?
                </label>
                <div className="space-y-2">
                  {caseData.suspects.map((suspect) => (
                    <button
                      key={suspect.id}
                      onClick={() => setSelectedSuspect(suspect.id)}
                      className={`w-full text-left p-3 rounded-lg border transition-colors ${
                        selectedSuspect === suspect.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <span className="text-xl mr-2">{suspect.image}</span>
                      <span className="font-medium">{suspect.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Explain your reasoning (What evidence proves it?)
                </label>
                <textarea
                  value={reasoning}
                  onChange={(e) => setReasoning(e.target.value)}
                  placeholder="I think it was [suspect] because..."
                  className="w-full h-32 px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setGamePhase("investigation")}
                >
                  Keep Investigating
                </Button>
                <Button
                  variant="glow"
                  className="flex-1"
                  onClick={handleAccusation}
                  disabled={!selectedSuspect || reasoning.trim().length < 10}
                >
                  Submit Accusation
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Investigation Tabs */}
        <div className="flex-1 flex flex-col border-r border-border overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-border bg-card flex-shrink-0">
            {[
              { id: "story", label: "Story", icon: FileText },
              { id: "clues", label: "Clues", icon: Search },
              { id: "suspects", label: "Suspects", icon: Users },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-primary border-b-2 border-primary bg-primary/5'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
                {tab.id === "clues" && (
                  <span className="bg-primary/10 text-primary text-xs px-1.5 py-0.5 rounded-full">
                    {revealedClues.length}/{caseData.clues.length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === "story" && (
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">📋 Case Summary</h3>
                <div className="bg-muted/30 rounded-lg p-4 border border-border whitespace-pre-line text-foreground text-sm leading-relaxed">
                  {caseData.fullStory}
                </div>
              </div>
            )}

            {activeTab === "clues" && (
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">🔍 Search for Clues</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Click on locations to search for evidence. Find all the clues before making your accusation!
                </p>
                <div className="grid gap-3">
                  {caseData.clues.map((clue) => (
                    <div
                      key={clue.id}
                      className={`rounded-lg border transition-all ${
                        revealedClues.includes(clue.id)
                          ? 'bg-green-50 border-green-200'
                          : 'bg-card border-border hover:border-primary/50 cursor-pointer'
                      }`}
                    >
                      {revealedClues.includes(clue.id) ? (
                        <div className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xl">{clue.icon}</span>
                            <span className="font-medium text-foreground">{clue.title}</span>
                            <CheckCircle className="h-4 w-4 text-green-600 ml-auto" />
                          </div>
                          <p className="text-sm text-muted-foreground">{clue.description}</p>
                          <p className="text-xs text-muted-foreground mt-2">📍 Found at: {clue.location}</p>
                        </div>
                      ) : (
                        <button
                          onClick={() => revealClue(clue.id)}
                          className="w-full p-4 text-left"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-xl">📍</span>
                            <span className="font-medium text-foreground">{clue.location}</span>
                            <Eye className="h-4 w-4 text-muted-foreground ml-auto" />
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">Click to search this location...</p>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "suspects" && (
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">👤 Suspects</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Review each suspect&apos;s profile. Check their alibis carefully - can they be verified?
                </p>
                <div className="space-y-4">
                  {caseData.suspects.map((suspect) => (
                    <div
                      key={suspect.id}
                      className="bg-card rounded-lg border border-border overflow-hidden"
                    >
                      <button
                        onClick={() => setShowSuspectDetail(showSuspectDetail === suspect.id ? null : suspect.id)}
                        className="w-full p-4 text-left flex items-center gap-4"
                      >
                        <div className="text-4xl">{suspect.image}</div>
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">{suspect.name}</h4>
                          <p className="text-sm text-muted-foreground">{suspect.age}</p>
                        </div>
                        <ChevronRight
                          className={`h-5 w-5 text-muted-foreground transition-transform ${
                            showSuspectDetail === suspect.id ? 'rotate-90' : ''
                          }`}
                        />
                      </button>

                      {showSuspectDetail === suspect.id && (
                        <div className="px-4 pb-4 border-t border-border pt-4 space-y-3">
                          <div>
                            <h5 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Description</h5>
                            <p className="text-sm text-foreground">{suspect.description}</p>
                          </div>
                          <div>
                            <h5 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Alibi</h5>
                            <p className="text-sm text-foreground">{suspect.alibi}</p>
                          </div>
                          <div>
                            <h5 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Possible Motive</h5>
                            <p className="text-sm text-foreground">{suspect.motive}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - AI Assistant */}
        <div className="w-80 lg:w-96 flex flex-col bg-card">
          <div className="p-4 border-b border-border flex-shrink-0">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              <h3 className="font-medium text-foreground">Thinking Assistant</h3>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              I&apos;ll help you reason through the case. Ask me questions!
            </p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border flex-shrink-0">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask a question or say 'hint'..."
                className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
              <Button size="icon" onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              💡 Type &quot;hint&quot; if you&apos;re stuck ({caseData.guidingQuestions.length - hintsUsed} hints left)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
