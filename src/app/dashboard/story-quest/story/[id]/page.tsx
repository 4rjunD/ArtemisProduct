"use client";

import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getStoryById, getNodeById, type Story, type StoryNode, type Choice } from "@/lib/story-quests";
import {
  ArrowLeft,
  ChevronRight,
  RotateCcw,
  Home,
  BookOpen,
  MessageCircle,
  Check,
  Trophy,
  ThumbsUp,
  Meh,
  ThumbsDown,
  Lightbulb,
  GitBranch
} from "lucide-react";
import { useMetrics } from "@/components/providers/metrics-provider";
import { GAME_SKILLS } from "@/lib/artemis-iq";

type GamePhase = "reading" | "choosing" | "reasoning" | "transitioning";

interface HistoryEntry {
  nodeId: string;
  choiceId?: string;
  reasoning?: string;
}

export default function StoryPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const storyId = params.id as string;
  const { addSession } = useMetrics();

  const [story, setStory] = useState<Story | null>(null);
  const [currentNode, setCurrentNode] = useState<StoryNode | null>(null);
  const [gamePhase, setGamePhase] = useState<GamePhase>("reading");
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const [reasoning, setReasoning] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [showStoryStart, setShowStoryStart] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [hasSubmittedMetrics, setHasSubmittedMetrics] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (storyId) {
      const storyData = getStoryById(storyId);
      if (storyData) {
        setStory(storyData);
        const startNode = getNodeById(storyData, "start");
        if (startNode) {
          setCurrentNode(startNode);
          setHistory([{ nodeId: "start" }]);
        }
      }
    }
  }, [storyId]);

  // Submit metrics when reaching an ending
  useEffect(() => {
    if (currentNode?.isEnding && story && !hasSubmittedMetrics) {
      setHasSubmittedMetrics(true);
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      const choicesMade = history.filter(h => h.choiceId).length;
      const reasoningsGiven = history.filter(h => h.reasoning).length;

      // Score based on ending type and engagement
      const endingScore = {
        great: 95,
        good: 80,
        okay: 60,
        bad: 45
      }[currentNode.endingType || "okay"] || 60;

      const reasoningBonus = reasoningsGiven > 0 ? Math.min(20, reasoningsGiven * 5) : 0;

      addSession({
        gameType: "story-quest",
        gameId: storyId,
        timeSpent,
        scores: {
          accuracy: endingScore,
          reasoning: 50 + reasoningBonus,
          speed: timeSpent < 300 ? 85 : timeSpent < 600 ? 70 : 55,
          consistency: Math.round((endingScore + 50 + reasoningBonus) / 2)
        },
        skills: GAME_SKILLS["story-quest"],
        rawData: {
          endingType: currentNode.endingType,
          choicesMade,
          scenesVisited: history.length,
          reasoningsGiven
        }
      });
    }
  }, [currentNode, story, hasSubmittedMetrics, history, startTime, storyId, addSession]);

  if (status === "loading" || !story || !currentNode) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading story...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const handleChoiceSelect = (choice: Choice) => {
    setSelectedChoice(choice);
    setGamePhase("choosing");
  };

  const handleProceedToReasoning = () => {
    setGamePhase("reasoning");
  };

  const handleSubmitReasoning = () => {
    if (!selectedChoice || !reasoning.trim()) return;

    // Save to history
    const newHistoryEntry: HistoryEntry = {
      nodeId: currentNode.id,
      choiceId: selectedChoice.id,
      reasoning: reasoning.trim()
    };
    setHistory([...history, newHistoryEntry]);

    // Transition to next node
    setIsTransitioning(true);
    setGamePhase("transitioning");

    setTimeout(() => {
      const nextNode = getNodeById(story, selectedChoice.nextNodeId);
      if (nextNode) {
        setCurrentNode(nextNode);
        setHistory((prev) => [...prev, { nodeId: nextNode.id }]);
      }
      setSelectedChoice(null);
      setReasoning("");
      setGamePhase("reading");
      setIsTransitioning(false);
    }, 800);
  };

  const handleRestart = () => {
    const startNode = getNodeById(story, "start");
    if (startNode) {
      setCurrentNode(startNode);
      setHistory([{ nodeId: "start" }]);
      setSelectedChoice(null);
      setReasoning("");
      setGamePhase("reading");
      setShowStoryStart(true);
      setStartTime(Date.now());
      setHasSubmittedMetrics(false);
    }
  };

  const getEndingIcon = (type?: string) => {
    switch (type) {
      case "great":
        return <Trophy className="h-8 w-8 text-green-500" />;
      case "good":
        return <ThumbsUp className="h-8 w-8 text-blue-500" />;
      case "okay":
        return <Meh className="h-8 w-8 text-yellow-500" />;
      case "bad":
        return <ThumbsDown className="h-8 w-8 text-red-500" />;
      default:
        return <Trophy className="h-8 w-8 text-primary" />;
    }
  };

  const getEndingColor = (type?: string) => {
    switch (type) {
      case "great":
        return "from-green-500/20 to-green-500/5 border-green-500/30";
      case "good":
        return "from-blue-500/20 to-blue-500/5 border-blue-500/30";
      case "okay":
        return "from-yellow-500/20 to-yellow-500/5 border-yellow-500/30";
      case "bad":
        return "from-red-500/20 to-red-500/5 border-red-500/30";
      default:
        return "from-primary/20 to-primary/5 border-primary/30";
    }
  };

  // Story Start Screen
  if (showStoryStart) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-14 gap-4">
              <Link
                href="/dashboard/story-quest"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <div className="h-5 w-px bg-border" />
              <h1 className="text-lg font-serif text-foreground">{story.title}</h1>
            </div>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-8">
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            {/* Cover */}
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-500/5 p-8 text-center border-b border-border">
              <div className="text-7xl mb-4">{story.coverImage}</div>
              <h1 className="text-3xl font-serif text-foreground mb-2">{story.title}</h1>
              <p className="text-muted-foreground">{story.description}</p>
            </div>

            {/* Info */}
            <div className="p-6">
              {/* Themes */}
              <div className="flex flex-wrap gap-2 justify-center mb-6">
                {story.themes.map((theme) => (
                  <span
                    key={theme}
                    className="bg-muted text-muted-foreground text-sm px-3 py-1 rounded-full"
                  >
                    {theme}
                  </span>
                ))}
              </div>

              {/* How to play */}
              <div className="bg-muted/30 rounded-lg p-4 mb-6">
                <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  How to Play
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">1.</span>
                    Read each scene carefully
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">2.</span>
                    Think about your choices before deciding
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">3.</span>
                    Explain WHY you&apos;re making each choice
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">4.</span>
                    See how your decisions play out!
                  </li>
                </ul>
              </div>

              {/* Start Button */}
              <Button
                variant="glow"
                size="lg"
                className="w-full text-lg"
                onClick={() => setShowStoryStart(false)}
              >
                Begin Story
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Ending Screen
  if (currentNode.isEnding) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-14 gap-4">
              <Link
                href="/dashboard/story-quest"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <div className="h-5 w-px bg-border" />
              <h1 className="text-lg font-serif text-foreground">{story.title}</h1>
            </div>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-8">
          <div className={`bg-gradient-to-br ${getEndingColor(currentNode.endingType)} border rounded-2xl overflow-hidden`}>
            {/* Ending Header */}
            <div className="p-8 text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-background/80 mb-4">
                {getEndingIcon(currentNode.endingType)}
              </div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-2">
                {currentNode.endingType === "great" && "Great Ending"}
                {currentNode.endingType === "good" && "Good Ending"}
                {currentNode.endingType === "okay" && "Okay Ending"}
                {currentNode.endingType === "bad" && "Bad Ending"}
              </div>
              <h1 className="text-2xl font-serif text-foreground mb-2">
                {currentNode.endingTitle}
              </h1>
            </div>

            {/* Story Content */}
            <div className="px-6 pb-6">
              <div className="bg-background/80 rounded-xl p-6 mb-6">
                <div className="text-4xl mb-4 text-center">{currentNode.image}</div>
                <p className="text-foreground whitespace-pre-line leading-relaxed">
                  {currentNode.content}
                </p>
              </div>

              {/* Summary */}
              <div className="bg-background/60 rounded-lg p-4 mb-4">
                <h3 className="font-medium text-foreground mb-2">What Happened</h3>
                <p className="text-sm text-muted-foreground">{currentNode.endingSummary}</p>
              </div>

              {/* Lesson */}
              {currentNode.lesson && (
                <div className="bg-primary/10 rounded-lg p-4 mb-6">
                  <h3 className="font-medium text-foreground mb-2 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-primary" />
                    What This Teaches
                  </h3>
                  <p className="text-sm text-foreground">{currentNode.lesson}</p>
                </div>
              )}

              {/* Journey Stats */}
              <div className="bg-background/60 rounded-lg p-4 mb-6">
                <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
                  <GitBranch className="h-4 w-4" />
                  Your Journey
                </h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div>
                    <span className="font-medium text-foreground">{Math.floor(history.length / 2)}</span> choices made
                  </div>
                  <div className="h-4 w-px bg-border" />
                  <div>
                    <span className="font-medium text-foreground">{history.length}</span> scenes visited
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" className="flex-1" onClick={handleRestart}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Try Different Choices
                </Button>
                <Button variant="glow" className="flex-1" asChild>
                  <Link href="/dashboard/story-quest">
                    <Home className="h-4 w-4 mr-2" />
                    More Stories
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Main Story Interface
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card flex-shrink-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard/story-quest"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <div className="h-5 w-px bg-border" />
              <h1 className="text-lg font-serif text-foreground">{story.title}</h1>
            </div>
            <div className="text-sm text-muted-foreground">
              Scene {history.length}
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="h-1 bg-muted">
        <div
          className="h-full bg-primary transition-all duration-500"
          style={{ width: `${Math.min((history.length / 10) * 100, 100)}%` }}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-2xl mx-auto px-4 py-6 w-full">
        {/* Scene Card */}
        <div className={`bg-card border border-border rounded-xl overflow-hidden transition-opacity duration-300 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
          {/* Scene Header */}
          <div className="bg-gradient-to-r from-purple-500/10 to-transparent p-4 border-b border-border">
            <h2 className="text-xl font-serif text-foreground">{currentNode.title}</h2>
          </div>

          {/* Scene Content */}
          <div className="p-6">
            <div className="text-5xl mb-4 text-center">{currentNode.image}</div>
            <div className="prose prose-sm max-w-none">
              <p className="text-foreground whitespace-pre-line leading-relaxed text-base">
                {currentNode.content}
              </p>
            </div>
          </div>

          {/* Choices Section */}
          {currentNode.choices && gamePhase === "reading" && (
            <div className="p-6 pt-0">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">What do you do?</h3>
              <div className="space-y-3">
                {currentNode.choices.map((choice) => (
                  <button
                    key={choice.id}
                    onClick={() => handleChoiceSelect(choice)}
                    className="w-full text-left p-4 rounded-lg border border-border bg-background hover:border-primary/50 hover:bg-primary/5 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-foreground group-hover:text-primary transition-colors">
                        {choice.text}
                      </span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Choice Confirmation */}
          {gamePhase === "choosing" && selectedChoice && (
            <div className="p-6 pt-0">
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Your Choice</span>
                </div>
                <p className="text-foreground">{selectedChoice.text}</p>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setSelectedChoice(null);
                    setGamePhase("reading");
                  }}
                >
                  Change Mind
                </Button>
                <Button
                  variant="glow"
                  className="flex-1"
                  onClick={handleProceedToReasoning}
                >
                  Confirm Choice
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Reasoning Prompt */}
          {gamePhase === "reasoning" && selectedChoice && (
            <div className="p-6 pt-0">
              <div className="bg-muted/50 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <MessageCircle className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">Before you continue...</span>
                </div>
                <p className="text-foreground font-medium mb-4">
                  {selectedChoice.reasoningPrompt}
                </p>
                <textarea
                  value={reasoning}
                  onChange={(e) => setReasoning(e.target.value)}
                  placeholder="Type your thinking here..."
                  className="w-full h-24 px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  autoFocus
                />
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setGamePhase("choosing");
                    setReasoning("");
                  }}
                >
                  Back
                </Button>
                <Button
                  variant="glow"
                  className="flex-1"
                  onClick={handleSubmitReasoning}
                  disabled={reasoning.trim().length < 5}
                >
                  Continue Story
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center mt-3">
                There&apos;s no wrong answer - we just want to know your thinking!
              </p>
            </div>
          )}

          {/* Transitioning State */}
          {gamePhase === "transitioning" && (
            <div className="p-6 pt-0">
              <div className="flex items-center justify-center py-8">
                <div className="animate-pulse text-muted-foreground">
                  See what happens next...
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
