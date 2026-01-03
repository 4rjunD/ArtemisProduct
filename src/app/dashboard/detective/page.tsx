"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cases } from "@/lib/detective-cases";
import {
  ArrowLeft,
  Search,
  Clock,
  Users,
  Lock,
  Star,
  Trophy
} from "lucide-react";

export default function DetectiveHubPage() {
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
            <h1 className="text-xl font-serif text-foreground">Detective&apos;s Notebook</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl p-6 sm:p-10 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="text-6xl">🔍</div>
            <div>
              <h2 className="text-3xl sm:text-4xl font-serif text-foreground mb-2">
                Become a Master Detective
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Solve mysteries by gathering clues, questioning suspects, and using your
                reasoning skills. Remember: a good detective doesn&apos;t jump to conclusions —
                they follow the evidence!
              </p>
            </div>
          </div>

          {/* Skills Badge */}
          <div className="mt-6 flex flex-wrap gap-3">
            <div className="bg-background/80 backdrop-blur-sm rounded-full px-4 py-2 text-sm border border-border">
              🧠 Critical Thinking
            </div>
            <div className="bg-background/80 backdrop-blur-sm rounded-full px-4 py-2 text-sm border border-border">
              🔎 Evidence Evaluation
            </div>
            <div className="bg-background/80 backdrop-blur-sm rounded-full px-4 py-2 text-sm border border-border">
              💭 Logical Reasoning
            </div>
            <div className="bg-background/80 backdrop-blur-sm rounded-full px-4 py-2 text-sm border border-border">
              🎯 Bias Awareness
            </div>
          </div>
        </div>

        {/* Cases Grid */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Search className="h-5 w-5" />
            Available Cases
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((caseItem) => (
            <div
              key={caseItem.id}
              className={`bg-card border border-border rounded-xl overflow-hidden transition-all duration-200 ${
                caseItem.isLocked
                  ? "opacity-60"
                  : "hover:shadow-lg hover:border-primary/30 hover:-translate-y-1"
              }`}
            >
              {/* Case Header */}
              <div className="bg-gradient-to-r from-primary/10 to-transparent p-4 border-b border-border">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {caseItem.isLocked ? (
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Trophy className="h-4 w-4 text-primary" />
                      )}
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${getDifficultyColor(caseItem.difficulty)}`}>
                        {caseItem.difficulty.charAt(0).toUpperCase() + caseItem.difficulty.slice(1)}
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold text-foreground">
                      {caseItem.title}
                    </h4>
                  </div>
                  <div className="flex">
                    {[...Array(getDifficultyStars(caseItem.difficulty))].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Case Body */}
              <div className="p-4">
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {caseItem.description}
                </p>

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{caseItem.estimatedTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    <span>Ages {caseItem.ageRange}</span>
                  </div>
                </div>

                {/* Case Stats */}
                {!caseItem.isLocked && (
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                    <span className="bg-muted px-2 py-1 rounded">
                      🔍 {caseItem.clues.length} Clues
                    </span>
                    <span className="bg-muted px-2 py-1 rounded">
                      👤 {caseItem.suspects.length} Suspects
                    </span>
                  </div>
                )}

                {/* Action Button */}
                {caseItem.isLocked ? (
                  <Button variant="outline" className="w-full" disabled>
                    <Lock className="h-4 w-4 mr-2" />
                    Complete Previous Case to Unlock
                  </Button>
                ) : (
                  <Button variant="glow" className="w-full" asChild>
                    <Link href={`/dashboard/detective/case/${caseItem.id}`}>
                      Start Investigation
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Tips Section */}
        <div className="mt-12 bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            💡 Detective Tips
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex gap-3">
              <div className="text-2xl">1️⃣</div>
              <div>
                <h4 className="font-medium text-foreground text-sm">Gather All Clues</h4>
                <p className="text-xs text-muted-foreground">Don&apos;t rush! Find every piece of evidence first.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="text-2xl">2️⃣</div>
              <div>
                <h4 className="font-medium text-foreground text-sm">Question Everything</h4>
                <p className="text-xs text-muted-foreground">Check alibis carefully. Can they be proven?</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="text-2xl">3️⃣</div>
              <div>
                <h4 className="font-medium text-foreground text-sm">Connect the Dots</h4>
                <p className="text-xs text-muted-foreground">Look for patterns between clues and suspects.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="text-2xl">4️⃣</div>
              <div>
                <h4 className="font-medium text-foreground text-sm">Explain Your Thinking</h4>
                <p className="text-xs text-muted-foreground">A good detective can explain WHY they know.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
