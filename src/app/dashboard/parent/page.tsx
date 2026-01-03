"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useMetrics } from "@/components/providers/metrics-provider";
import { getIQLabel, SKILL_CATEGORIES } from "@/lib/artemis-iq";
import {
  ArrowLeft,
  Brain,
  TrendingUp,
  TrendingDown,
  Minus,
  Clock,
  Flame,
  Target,
  BarChart3,
  Calendar,
  Award,
  BookOpen,
  Lightbulb,
  ChevronRight,
  Star,
  Zap
} from "lucide-react";

export default function ParentDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { profile, isLoading } = useMetrics();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const iqInfo = getIQLabel(profile.overallIQ);
  const sortedSkills = [...profile.skillScores].sort((a, b) => b.score - a.score);
  const topSkills = sortedSkills.slice(0, 3);
  const needsPractice = sortedSkills.filter(s => s.trend === "needs-practice").slice(0, 3);

  const recentSessions = profile.sessions.slice(-10).reverse();

  const getGameIcon = (type: string) => {
    switch (type) {
      case "detective": return "🔍";
      case "story-quest": return "📖";
      case "debate": return "⚖️";
      case "fact-fiction": return "📰";
      default: return "🎮";
    }
  };

  const getGameName = (type: string) => {
    switch (type) {
      case "detective": return "Detective's Notebook";
      case "story-quest": return "Story Quest";
      case "debate": return "Debate Arena";
      case "fact-fiction": return "Fact or Fiction";
      default: return type;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving": return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "needs-practice": return <TrendingDown className="h-4 w-4 text-red-500" />;
      default: return <Minus className="h-4 w-4 text-yellow-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back to Dashboard</span>
              </Link>
              <div className="h-6 w-px bg-border" />
              <h1 className="text-xl font-serif text-foreground flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Parent Dashboard
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ArtemisIQ Hero */}
        <div className="bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-primary/20 rounded-2xl p-6 sm:p-10 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* IQ Circle */}
            <div className="relative">
              <div className="w-40 h-40 rounded-full bg-background border-4 border-primary flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl font-bold text-foreground">{profile.overallIQ}</div>
                  <div className="text-sm text-muted-foreground">ArtemisIQ</div>
                </div>
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                {iqInfo.label}
              </div>
            </div>

            {/* IQ Description */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-serif text-foreground mb-2">
                {session.user?.name?.split(" ")[0] || "Your Child"}&apos;s Progress
              </h2>
              <p className="text-lg text-muted-foreground mb-4">
                {iqInfo.description}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <div className="flex items-center gap-2 bg-background/50 rounded-full px-4 py-2">
                  <Target className="h-4 w-4 text-primary" />
                  <span className="text-sm">{profile.totalGamesPlayed} games played</span>
                </div>
                <div className="flex items-center gap-2 bg-background/50 rounded-full px-4 py-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-sm">{profile.totalTimePracticed} min practiced</span>
                </div>
                <div className="flex items-center gap-2 bg-background/50 rounded-full px-4 py-2">
                  <Flame className="h-4 w-4 text-orange-500" />
                  <span className="text-sm">{profile.currentStreak} day streak</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card border border-border rounded-xl p-4">
            <Brain className="h-6 w-6 text-primary mb-2" />
            <p className="text-2xl font-bold text-foreground">{profile.skillScores.length}</p>
            <p className="text-sm text-muted-foreground">Skills Tracked</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <Award className="h-6 w-6 text-yellow-500 mb-2" />
            <p className="text-2xl font-bold text-foreground">{profile.longestStreak}</p>
            <p className="text-sm text-muted-foreground">Best Streak</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <TrendingUp className="h-6 w-6 text-green-500 mb-2" />
            <p className="text-2xl font-bold text-foreground">
              {profile.skillScores.filter(s => s.trend === "improving").length}
            </p>
            <p className="text-sm text-muted-foreground">Skills Improving</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <Calendar className="h-6 w-6 text-blue-500 mb-2" />
            <p className="text-2xl font-bold text-foreground">
              {profile.weeklyProgress[profile.weeklyProgress.length - 1]?.gamesPlayed || 0}
            </p>
            <p className="text-sm text-muted-foreground">Games This Week</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Skills Breakdown */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Skills Breakdown
            </h3>

            {profile.skillScores.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No skills tracked yet.</p>
                <p className="text-sm">Complete games to see skill progress!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {sortedSkills.map((skill) => (
                  <div key={skill.skill}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">{skill.skill}</span>
                        {getTrendIcon(skill.trend)}
                      </div>
                      <span className="text-sm text-muted-foreground">{skill.score}/100</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          skill.score >= 75 ? "bg-green-500" :
                          skill.score >= 50 ? "bg-yellow-500" :
                          "bg-orange-500"
                        }`}
                        style={{ width: `${skill.score}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {SKILL_CATEGORIES[skill.skill as keyof typeof SKILL_CATEGORIES]?.description || "Critical thinking skill"}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Weekly Progress Chart */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Weekly Progress
            </h3>

            {profile.weeklyProgress.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No weekly data yet.</p>
                <p className="text-sm">Play games to see progress over time!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Simple bar chart */}
                <div className="flex items-end gap-2 h-32">
                  {profile.weeklyProgress.slice(-8).map((week, i) => {
                    const height = ((week.iq - 70) / 80) * 100; // Map 70-150 to 0-100%
                    return (
                      <div key={week.week} className="flex-1 flex flex-col items-center">
                        <div
                          className="w-full bg-primary/80 rounded-t transition-all hover:bg-primary"
                          style={{ height: `${Math.max(10, height)}%` }}
                          title={`IQ: ${week.iq}, Games: ${week.gamesPlayed}`}
                        />
                        <span className="text-xs text-muted-foreground mt-1">
                          W{i + 1}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>ArtemisIQ over time</span>
                  <span>Latest: {profile.weeklyProgress[profile.weeklyProgress.length - 1]?.iq || 100}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Top Skills */}
          {topSkills.length > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Strongest Skills
              </h3>
              <div className="space-y-3">
                {topSkills.map((skill, i) => (
                  <div key={skill.skill} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-200 flex items-center justify-center text-green-700 font-bold text-sm">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-green-800">{skill.skill}</p>
                      <p className="text-sm text-green-600">Score: {skill.score}/100</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Areas to Practice */}
          {needsPractice.length > 0 ? (
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-orange-800 mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Areas to Practice
              </h3>
              <div className="space-y-3">
                {needsPractice.map((skill) => (
                  <div key={skill.skill} className="flex items-center gap-3">
                    <TrendingDown className="h-5 w-5 text-orange-500" />
                    <div className="flex-1">
                      <p className="font-medium text-orange-800">{skill.skill}</p>
                      <p className="text-sm text-orange-600">
                        Played {skill.gamesPlayed} times - needs more practice
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Keep It Up!
              </h3>
              <p className="text-blue-700">
                {profile.totalGamesPlayed === 0
                  ? "Start playing games to track progress and identify areas to improve!"
                  : "All skills are stable or improving. Great work maintaining consistent practice!"}
              </p>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Recent Activity
          </h3>

          {recentSessions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No games played yet.</p>
              <Button variant="glow" className="mt-4" asChild>
                <Link href="/dashboard">
                  Start Playing
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {recentSessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg"
                >
                  <div className="text-2xl">{getGameIcon(session.gameType)}</div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{getGameName(session.gameType)}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(session.completedAt).toLocaleDateString()} •{" "}
                      {Math.round(session.timeSpent / 60)} min
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <Target className="h-4 w-4 text-primary" />
                      <span className="font-semibold text-foreground">{session.scores.accuracy}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">accuracy</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* What ArtemisIQ Measures */}
        <div className="mt-8 bg-gradient-to-r from-primary/10 to-transparent border border-primary/20 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            What ArtemisIQ Measures
          </h3>
          <p className="text-muted-foreground mb-4">
            ArtemisIQ is a composite score (70-150 scale) measuring your child&apos;s critical thinking abilities across multiple dimensions:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <h4 className="font-medium text-foreground mb-2">Core Thinking</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Logical Reasoning</li>
                <li>• Evidence Evaluation</li>
                <li>• Pattern Recognition</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Information Literacy</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Source Evaluation</li>
                <li>• Bias Detection</li>
                <li>• Fact Checking</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Decision Making</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Consequence Thinking</li>
                <li>• Perspective Taking</li>
                <li>• Ethical Reasoning</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
