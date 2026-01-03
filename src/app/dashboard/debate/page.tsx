"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { debateTopics } from "@/lib/debate-topics";
import {
  ArrowLeft,
  Scale,
  Clock,
  Users,
  Lock,
  Star,
  Swords,
  ArrowLeftRight,
  Brain,
  MessageSquare
} from "lucide-react";

export default function DebateHubPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-700 border-green-200";
      case "intermediate":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "advanced":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getDifficultyStars = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return 1;
      case "intermediate":
        return 2;
      case "advanced":
        return 3;
      default:
        return 1;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Technology":
        return "bg-blue-100 text-blue-700";
      case "Education":
        return "bg-purple-100 text-purple-700";
      case "Ethics":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-border" />
            <h1 className="text-xl font-serif text-foreground">Debate Arena</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-orange-500/10 via-orange-500/5 to-transparent rounded-2xl p-6 sm:p-10 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="text-6xl">⚖️</div>
            <div>
              <h2 className="text-3xl sm:text-4xl font-serif text-foreground mb-2">
                Argue Both Sides
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl">
                The best thinkers can argue ANY position convincingly. Pick a topic,
                argue one side, then switch and argue the opposite. Can you make strong
                points for both?
              </p>
            </div>
          </div>

          {/* Skills Badge */}
          <div className="mt-6 flex flex-wrap gap-3">
            <div className="bg-background/80 backdrop-blur-sm rounded-full px-4 py-2 text-sm border border-border">
              🎭 Perspective Taking
            </div>
            <div className="bg-background/80 backdrop-blur-sm rounded-full px-4 py-2 text-sm border border-border">
              💪 Argument Building
            </div>
            <div className="bg-background/80 backdrop-blur-sm rounded-full px-4 py-2 text-sm border border-border">
              🔍 Bias Recognition
            </div>
            <div className="bg-background/80 backdrop-blur-sm rounded-full px-4 py-2 text-sm border border-border">
              🧠 Critical Thinking
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-card border border-border rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Swords className="h-5 w-5 text-primary" />
            How Debate Arena Works
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-medium">1</span>
              </div>
              <div>
                <h4 className="font-medium text-foreground">Pick a Topic</h4>
                <p className="text-sm text-muted-foreground">Choose a debate question that interests you</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-medium">2</span>
              </div>
              <div>
                <h4 className="font-medium text-foreground">Argue Side A</h4>
                <p className="text-sm text-muted-foreground">Build your best arguments for one position</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                <ArrowLeftRight className="h-4 w-4 text-orange-500" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Switch Sides</h4>
                <p className="text-sm text-muted-foreground">Now argue the OPPOSITE position just as well</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-medium">4</span>
              </div>
              <div>
                <h4 className="font-medium text-foreground">Reflect</h4>
                <p className="text-sm text-muted-foreground">What did you learn from seeing both sides?</p>
              </div>
            </div>
          </div>
        </div>

        {/* Why This Matters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-4">
            <Brain className="h-6 w-6 text-primary mb-2" />
            <h4 className="font-medium text-foreground mb-1">Breaks Echo Chambers</h4>
            <p className="text-sm text-muted-foreground">
              Understanding opposing views makes you smarter than only hearing one side.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <MessageSquare className="h-6 w-6 text-primary mb-2" />
            <h4 className="font-medium text-foreground mb-1">Better Communicator</h4>
            <p className="text-sm text-muted-foreground">
              When you understand what the other side thinks, you can respond to it better.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <Scale className="h-6 w-6 text-primary mb-2" />
            <h4 className="font-medium text-foreground mb-1">Finds Middle Ground</h4>
            <p className="text-sm text-muted-foreground">
              Most real solutions combine good ideas from multiple perspectives.
            </p>
          </div>
        </div>

        {/* Topics Grid */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Scale className="h-5 w-5" />
            Debate Topics
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {debateTopics.map((topic) => (
            <div
              key={topic.id}
              className={`bg-card border border-border rounded-xl overflow-hidden transition-all duration-200 ${
                topic.isLocked
                  ? "opacity-60"
                  : "hover:shadow-lg hover:border-primary/30 hover:-translate-y-1"
              }`}
            >
              {/* Topic Header */}
              <div className="bg-gradient-to-r from-orange-500/10 to-transparent p-4 border-b border-border">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {topic.isLocked ? (
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Swords className="h-4 w-4 text-orange-500" />
                      )}
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${getDifficultyColor(topic.difficulty)}`}>
                        {topic.difficulty.charAt(0).toUpperCase() + topic.difficulty.slice(1)}
                      </span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getCategoryColor(topic.category)}`}>
                        {topic.category}
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
                      <span className="text-2xl">{topic.icon}</span>
                      {topic.title}
                    </h4>
                  </div>
                  <div className="flex">
                    {[...Array(getDifficultyStars(topic.difficulty))].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Topic Body */}
              <div className="p-4">
                {/* Question */}
                <div className="bg-muted/30 rounded-lg p-3 mb-4">
                  <p className="font-medium text-foreground text-center">
                    &ldquo;{topic.question}&rdquo;
                  </p>
                </div>

                <p className="text-muted-foreground text-sm mb-4">
                  {topic.description}
                </p>

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{topic.estimatedTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    <span>Ages {topic.ageRange}</span>
                  </div>
                </div>

                {/* Both Sides Preview */}
                {!topic.isLocked && (
                  <div className="flex gap-2 mb-4 text-xs">
                    <div className="flex-1 bg-green-50 border border-green-200 rounded p-2 text-center">
                      <span className="text-green-700">✓ YES side</span>
                    </div>
                    <div className="flex-1 bg-red-50 border border-red-200 rounded p-2 text-center">
                      <span className="text-red-700">✗ NO side</span>
                    </div>
                  </div>
                )}

                {/* Action Button */}
                {topic.isLocked ? (
                  <Button variant="outline" className="w-full" disabled>
                    <Lock className="h-4 w-4 mr-2" />
                    Coming Soon
                  </Button>
                ) : (
                  <Button variant="glow" className="w-full" asChild>
                    <Link href={`/dashboard/debate/topic/${topic.id}`}>
                      Start Debate
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pro Tip */}
        <div className="mt-12 bg-gradient-to-r from-primary/10 to-transparent border border-primary/20 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            💡 Pro Tip
          </h3>
          <p className="text-muted-foreground mb-4">
            The side that&apos;s HARDER to argue is usually where you&apos;ll learn the most. If you find yourself
            thinking &ldquo;this side is obviously wrong,&rdquo; that&apos;s exactly the side you need to practice arguing.
            Understanding why smart people disagree with you makes YOUR arguments stronger.
          </p>
          <div className="flex items-center gap-2 text-sm text-foreground">
            <Scale className="h-4 w-4 text-primary" />
            <span>A good debater can argue ANY side convincingly.</span>
          </div>
        </div>
      </main>
    </div>
  );
}
