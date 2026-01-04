"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogOut, User, BookOpen, Clock, ChevronRight, Sparkles, BarChart3, MessageCircleQuestion, Calculator, FlaskConical } from "lucide-react";

export default function DashboardPage() {
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
            Ready to learn? I'll help you understand — without giving you the answers.
          </p>
        </div>

        {/* Main CTA - Start Tutoring */}
        <div className="bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-primary/20 rounded-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-background border-2 border-primary flex items-center justify-center shrink-0">
              <MessageCircleQuestion className="h-10 w-10 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-serif text-foreground mb-2">
                Start Learning
              </h3>
              <p className="text-muted-foreground mb-4">
                Paste any Math or Science homework problem. I'll guide you to the solution through questions — never giving you the answer directly.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="glow" size="lg" asChild>
                  <Link href="/dashboard/tutor">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Open Tutor
                  </Link>
                </Button>
                <span className="text-sm text-muted-foreground">
                  The Socratic method — learn by thinking
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-medium text-foreground">Sessions</h3>
            </div>
            <p className="text-3xl font-semibold text-foreground">0</p>
            <p className="text-sm text-muted-foreground mt-1">
              Start your first session!
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-accent/10">
                <Calculator className="h-5 w-5 text-accent" />
              </div>
              <h3 className="font-medium text-foreground">Subjects</h3>
            </div>
            <p className="text-3xl font-semibold text-foreground">2</p>
            <p className="text-sm text-muted-foreground mt-1">
              Math & Science
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-medium text-foreground">Time Learning</h3>
            </div>
            <p className="text-3xl font-semibold text-foreground">0 min</p>
            <p className="text-sm text-muted-foreground mt-1">
              Track your progress
            </p>
          </div>
        </div>

        {/* Subject Cards */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-foreground mb-4">
            Subjects Covered
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                  <Calculator className="h-6 w-6 text-blue-500" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-foreground mb-1">Mathematics</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Algebra, Geometry, Calculus, Trigonometry, Statistics
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/dashboard/tutor">
                      Start Math Session
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
                  <FlaskConical className="h-6 w-6 text-green-500" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-foreground mb-1">Science</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Physics, Chemistry, Biology
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/dashboard/tutor">
                      Start Science Session
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Parent Dashboard Link */}
        <div className="bg-muted/50 border border-border rounded-xl p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-background">
                <BarChart3 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Parent Dashboard</h4>
                <p className="text-sm text-muted-foreground">
                  View learning progress and session history
                </p>
              </div>
            </div>
            <Button variant="outline" asChild>
              <Link href="/dashboard/parent">
                View Dashboard
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
