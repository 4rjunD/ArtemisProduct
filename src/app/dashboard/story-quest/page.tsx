"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { stories } from "@/lib/story-quests";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Users,
  Lock,
  Star,
  Sparkles,
  GitBranch
} from "lucide-react";

export default function StoryQuestHubPage() {
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
            <h1 className="text-xl font-serif text-foreground">Story Quest</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-transparent rounded-2xl p-6 sm:p-10 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="text-6xl">📖</div>
            <div>
              <h2 className="text-3xl sm:text-4xl font-serif text-foreground mb-2">
                Choose Your Own Adventure
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Navigate interactive stories where every choice matters. Before each decision,
                you&apos;ll explain your thinking. Then watch the consequences unfold!
              </p>
            </div>
          </div>

          {/* Skills Badge */}
          <div className="mt-6 flex flex-wrap gap-3">
            <div className="bg-background/80 backdrop-blur-sm rounded-full px-4 py-2 text-sm border border-border">
              🎯 Decision Making
            </div>
            <div className="bg-background/80 backdrop-blur-sm rounded-full px-4 py-2 text-sm border border-border">
              🔮 Consequence Thinking
            </div>
            <div className="bg-background/80 backdrop-blur-sm rounded-full px-4 py-2 text-sm border border-border">
              💭 Explaining Reasoning
            </div>
            <div className="bg-background/80 backdrop-blur-sm rounded-full px-4 py-2 text-sm border border-border">
              🌳 Multiple Outcomes
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-card border border-border rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <GitBranch className="h-5 w-5 text-primary" />
            How Story Quest Works
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-medium">1</span>
              </div>
              <div>
                <h4 className="font-medium text-foreground">Read the Situation</h4>
                <p className="text-sm text-muted-foreground">Each scene presents a dilemma with multiple choices</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-medium">2</span>
              </div>
              <div>
                <h4 className="font-medium text-foreground">Explain Your Choice</h4>
                <p className="text-sm text-muted-foreground">Before choosing, answer: &quot;Why this option?&quot;</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-medium">3</span>
              </div>
              <div>
                <h4 className="font-medium text-foreground">See What Happens</h4>
                <p className="text-sm text-muted-foreground">Your choices lead to different endings - some better than others!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stories Grid */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Available Stories
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <div
              key={story.id}
              className={`bg-card border border-border rounded-xl overflow-hidden transition-all duration-200 ${
                story.isLocked
                  ? "opacity-60"
                  : "hover:shadow-lg hover:border-primary/30 hover:-translate-y-1"
              }`}
            >
              {/* Story Header */}
              <div className="bg-gradient-to-r from-purple-500/10 to-transparent p-4 border-b border-border">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {story.isLocked ? (
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Sparkles className="h-4 w-4 text-purple-500" />
                      )}
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${getDifficultyColor(story.difficulty)}`}>
                        {story.difficulty.charAt(0).toUpperCase() + story.difficulty.slice(1)}
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
                      <span className="text-2xl">{story.coverImage}</span>
                      {story.title}
                    </h4>
                  </div>
                  <div className="flex">
                    {[...Array(getDifficultyStars(story.difficulty))].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Story Body */}
              <div className="p-4">
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {story.description}
                </p>

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{story.estimatedTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    <span>Ages {story.ageRange}</span>
                  </div>
                </div>

                {/* Themes */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {story.themes.map((theme) => (
                    <span
                      key={theme}
                      className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded-full"
                    >
                      {theme}
                    </span>
                  ))}
                </div>

                {/* Action Button */}
                {story.isLocked ? (
                  <Button variant="outline" className="w-full" disabled>
                    <Lock className="h-4 w-4 mr-2" />
                    Coming Soon
                  </Button>
                ) : (
                  <Button variant="glow" className="w-full" asChild>
                    <Link href={`/dashboard/story-quest/story/${story.id}`}>
                      Begin Story
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Multiple Endings Teaser */}
        <div className="mt-12 bg-gradient-to-r from-green-500/10 via-yellow-500/10 to-red-500/10 border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            🎭 Every Choice Changes the Story
          </h3>
          <p className="text-muted-foreground mb-4">
            Each story has multiple endings based on your decisions. Some choices lead to great outcomes,
            others... not so much. But every ending teaches you something!
          </p>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 text-sm">
              <div className="h-3 w-3 rounded-full bg-green-500" />
              <span className="text-muted-foreground">Great Ending</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="h-3 w-3 rounded-full bg-blue-500" />
              <span className="text-muted-foreground">Good Ending</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <span className="text-muted-foreground">Okay Ending</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <span className="text-muted-foreground">Bad Ending</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
