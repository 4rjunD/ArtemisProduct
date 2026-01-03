"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogOut, User, BookOpen, TrendingUp, Clock, Search, ChevronRight, Lock, Sparkles, BarChart3, Brain, Flame } from "lucide-react";
import { useMetrics } from "@/components/providers/metrics-provider";
import { getIQLabel } from "@/lib/artemis-iq";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { profile, isLoading: metricsLoading } = useMetrics();

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

  const games = [
    {
      id: "detective",
      title: "Detective's Notebook",
      description: "Solve mysteries by gathering clues, questioning suspects, and using logical reasoning.",
      icon: "🔍",
      skills: ["Critical Thinking", "Evidence Evaluation", "Logical Reasoning"],
      href: "/dashboard/detective",
      isAvailable: true,
      isNew: true,
    },
    {
      id: "story-quest",
      title: "Story Quest",
      description: "Navigate branching adventure stories where your choices and reasoning matter.",
      icon: "📖",
      skills: ["Decision Making", "Consequence Thinking"],
      href: "/dashboard/story-quest",
      isAvailable: true,
      isNew: true,
    },
    {
      id: "debate-arena",
      title: "Debate Arena",
      description: "Learn to argue both sides of an issue and build strong, balanced arguments.",
      icon: "⚖️",
      skills: ["Perspective Taking", "Argument Building"],
      href: "/dashboard/debate",
      isAvailable: true,
      isNew: true,
    },
    {
      id: "fact-fiction",
      title: "Fact or Fiction",
      description: "Spot misinformation and learn to evaluate sources and claims.",
      icon: "📰",
      skills: ["Bias Awareness", "Source Evaluation"],
      href: "/dashboard/fact-fiction",
      isAvailable: true,
      isNew: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-serif text-foreground">Artemis</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span>{session.user?.name || session.user?.email}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome section */}
        <div className="mb-8">
          <h2 className="text-3xl font-serif text-foreground mb-2">
            Welcome back, {session.user?.name?.split(" ")[0] || "there"}!
          </h2>
          <p className="text-muted-foreground">
            Ready to strengthen your thinking skills? Choose an activity below.
          </p>
        </div>

        {/* ArtemisIQ Banner */}
        {!metricsLoading && (
          <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-transparent border border-primary/20 rounded-xl p-6 mb-8">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">{profile.overallIQ}</div>
                    <div className="text-xs text-muted-foreground">IQ</div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    ArtemisIQ
                  </h3>
                  <p className={`text-sm font-medium ${getIQLabel(profile.overallIQ).color}`}>
                    {getIQLabel(profile.overallIQ).label}
                  </p>
                </div>
              </div>
              <div className="flex-1 flex flex-wrap gap-4 justify-center sm:justify-end">
                {profile.currentStreak > 0 && (
                  <div className="flex items-center gap-2 bg-background/50 rounded-full px-4 py-2">
                    <Flame className="h-4 w-4 text-orange-500" />
                    <span className="text-sm font-medium">{profile.currentStreak} day streak</span>
                  </div>
                )}
                <Button variant="outline" size="sm" asChild>
                  <Link href="/dashboard/parent">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Parent Dashboard
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-medium text-foreground">Games Completed</h3>
            </div>
            <p className="text-3xl font-semibold text-foreground">{profile.totalGamesPlayed}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {profile.totalGamesPlayed === 0 ? "Play your first game!" : `${profile.skillScores.length} skills tracked`}
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-accent/10">
                <TrendingUp className="h-5 w-5 text-accent" />
              </div>
              <h3 className="font-medium text-foreground">ArtemisIQ</h3>
            </div>
            <p className="text-3xl font-semibold text-foreground">{profile.overallIQ}</p>
            <p className={`text-sm mt-1 ${getIQLabel(profile.overallIQ).color}`}>
              {getIQLabel(profile.overallIQ).label}
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-medium text-foreground">Time Practiced</h3>
            </div>
            <p className="text-3xl font-semibold text-foreground">{profile.totalTimePracticed} min</p>
            <p className="text-sm text-muted-foreground mt-1">
              {profile.longestStreak > 0 ? `Best streak: ${profile.longestStreak} days` : "Start practicing!"}
            </p>
          </div>
        </div>

        {/* Thinking Activities */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Thinking Activities
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Games designed to build critical thinking skills
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {games.map((game) => (
              <div
                key={game.id}
                className={`bg-card border rounded-xl overflow-hidden transition-all duration-200 ${
                  game.isAvailable
                    ? "border-border hover:border-primary/50 hover:shadow-lg"
                    : "border-border opacity-60"
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{game.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-lg font-semibold text-foreground">{game.title}</h4>
                        {game.isNew && (
                          <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full font-medium">
                            NEW
                          </span>
                        )}
                        {!game.isAvailable && (
                          <span className="bg-muted text-muted-foreground text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                            <Lock className="h-3 w-3" />
                            Coming Soon
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{game.description}</p>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {game.skills.map((skill) => (
                          <span
                            key={skill}
                            className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      {game.isAvailable ? (
                        <Button variant="glow" asChild>
                          <Link href={game.href}>
                            Play Now
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Link>
                        </Button>
                      ) : (
                        <Button variant="outline" disabled>
                          <Lock className="h-4 w-4 mr-2" />
                          Coming Soon
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Activity */}
        <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-xl p-6 sm:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="text-6xl">🔍</div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Start with Detective&apos;s Notebook
              </h3>
              <p className="text-muted-foreground mb-4">
                Our most popular activity! Solve mysteries by gathering clues and using logical reasoning.
                Perfect for building critical thinking skills in a fun, engaging way.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="glow" size="lg" asChild>
                  <Link href="/dashboard/detective">
                    <Search className="h-4 w-4 mr-2" />
                    Start Investigating
                  </Link>
                </Button>
                <span className="text-sm text-muted-foreground">10-15 min per case</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
