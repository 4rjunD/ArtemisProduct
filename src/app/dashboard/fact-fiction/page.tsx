"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { challengeSets } from "@/lib/fact-fiction-challenges";
import {
  ArrowLeft,
  Newspaper,
  Clock,
  Users,
  Lock,
  Star,
  Shield,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Search,
  Brain,
  Eye
} from "lucide-react";

export default function FactFictionHubPage() {
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
      case "News Literacy":
        return "bg-blue-100 text-blue-700";
      case "Source Evaluation":
        return "bg-purple-100 text-purple-700";
      case "Logic":
        return "bg-orange-100 text-orange-700";
      case "Statistics":
        return "bg-pink-100 text-pink-700";
      case "Social Media":
        return "bg-cyan-100 text-cyan-700";
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
            <h1 className="text-xl font-serif text-foreground">Fact or Fiction</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent rounded-2xl p-6 sm:p-10 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="text-6xl">📰</div>
            <div>
              <h2 className="text-3xl sm:text-4xl font-serif text-foreground mb-2">
                Become a Truth Detective
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl">
                In a world full of misinformation, the ability to spot fake news, misleading
                statistics, and logical tricks is a superpower. Train your brain to see
                through the noise.
              </p>
            </div>
          </div>

          {/* Skills Badge */}
          <div className="mt-6 flex flex-wrap gap-3">
            <div className="bg-background/80 backdrop-blur-sm rounded-full px-4 py-2 text-sm border border-border">
              <Search className="h-3.5 w-3.5 inline mr-1.5" />
              Source Checking
            </div>
            <div className="bg-background/80 backdrop-blur-sm rounded-full px-4 py-2 text-sm border border-border">
              <AlertTriangle className="h-3.5 w-3.5 inline mr-1.5" />
              Bias Detection
            </div>
            <div className="bg-background/80 backdrop-blur-sm rounded-full px-4 py-2 text-sm border border-border">
              <Brain className="h-3.5 w-3.5 inline mr-1.5" />
              Logical Fallacies
            </div>
            <div className="bg-background/80 backdrop-blur-sm rounded-full px-4 py-2 text-sm border border-border">
              <Eye className="h-3.5 w-3.5 inline mr-1.5" />
              Statistical Tricks
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-card border border-border rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            How Fact or Fiction Works
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-medium">1</span>
              </div>
              <div>
                <h4 className="font-medium text-foreground">See a Claim</h4>
                <p className="text-sm text-muted-foreground">Headlines, stats, or arguments</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-medium">2</span>
              </div>
              <div>
                <h4 className="font-medium text-foreground">Analyze It</h4>
                <p className="text-sm text-muted-foreground">Look for red flags and tricks</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-medium">3</span>
              </div>
              <div>
                <h4 className="font-medium text-foreground">Make Your Call</h4>
                <p className="text-sm text-muted-foreground">Real, fake, or misleading?</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-medium">4</span>
              </div>
              <div>
                <h4 className="font-medium text-foreground">Learn Why</h4>
                <p className="text-sm text-muted-foreground">Understand the tricks used</p>
              </div>
            </div>
          </div>
        </div>

        {/* Why This Matters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-4">
            <CheckCircle2 className="h-6 w-6 text-green-500 mb-2" />
            <h4 className="font-medium text-foreground mb-1">Protect Yourself</h4>
            <p className="text-sm text-muted-foreground">
              Misinformation can lead to bad decisions. Learn to verify before believing.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <XCircle className="h-6 w-6 text-red-500 mb-2" />
            <h4 className="font-medium text-foreground mb-1">Stop the Spread</h4>
            <p className="text-sm text-muted-foreground">
              Every time you don&apos;t share fake news, you break the chain of misinformation.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <Brain className="h-6 w-6 text-primary mb-2" />
            <h4 className="font-medium text-foreground mb-1">Think Clearer</h4>
            <p className="text-sm text-muted-foreground">
              Recognizing manipulation makes you a better thinker in all areas of life.
            </p>
          </div>
        </div>

        {/* Challenge Sets Grid */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Newspaper className="h-5 w-5" />
            Challenge Sets
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {challengeSets.map((set) => (
            <div
              key={set.id}
              className={`bg-card border border-border rounded-xl overflow-hidden transition-all duration-200 ${
                set.isLocked
                  ? "opacity-60"
                  : "hover:shadow-lg hover:border-primary/30 hover:-translate-y-1"
              }`}
            >
              {/* Set Header */}
              <div className="bg-gradient-to-r from-blue-500/10 to-transparent p-4 border-b border-border">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {set.isLocked ? (
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Shield className="h-4 w-4 text-blue-500" />
                      )}
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${getDifficultyColor(set.difficulty)}`}>
                        {set.difficulty.charAt(0).toUpperCase() + set.difficulty.slice(1)}
                      </span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getCategoryColor(set.category)}`}>
                        {set.category}
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
                      <span className="text-2xl">{set.icon}</span>
                      {set.title}
                    </h4>
                  </div>
                  <div className="flex">
                    {[...Array(getDifficultyStars(set.difficulty))].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Set Body */}
              <div className="p-4">
                <p className="text-muted-foreground text-sm mb-4">
                  {set.description}
                </p>

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{set.estimatedTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    <span>Ages {set.ageRange}</span>
                  </div>
                  {!set.isLocked && (
                    <div className="flex items-center gap-1">
                      <Newspaper className="h-3.5 w-3.5" />
                      <span>{set.challenges.length} challenges</span>
                    </div>
                  )}
                </div>

                {/* Skills */}
                {!set.isLocked && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {set.skillsFocused.map((skill) => (
                      <span
                        key={skill}
                        className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                {/* Action Button */}
                {set.isLocked ? (
                  <Button variant="outline" className="w-full" disabled>
                    <Lock className="h-4 w-4 mr-2" />
                    Coming Soon
                  </Button>
                ) : (
                  <Button variant="glow" className="w-full" asChild>
                    <Link href={`/dashboard/fact-fiction/challenge/${set.id}`}>
                      Start Challenge
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Red Flags Cheat Sheet */}
        <div className="mt-12 bg-gradient-to-r from-red-500/10 to-transparent border border-red-500/20 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Red Flags Cheat Sheet
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-start gap-2">
              <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-muted-foreground">ALL CAPS or excessive punctuation!!!</span>
            </div>
            <div className="flex items-start gap-2">
              <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-muted-foreground">&quot;You won&apos;t believe...&quot; clickbait</span>
            </div>
            <div className="flex items-start gap-2">
              <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-muted-foreground">No author or date given</span>
            </div>
            <div className="flex items-start gap-2">
              <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-muted-foreground">Unknown or sketchy website</span>
            </div>
            <div className="flex items-start gap-2">
              <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-muted-foreground">Too good (or bad) to be true</span>
            </div>
            <div className="flex items-start gap-2">
              <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-muted-foreground">Plays heavily on emotions</span>
            </div>
            <div className="flex items-start gap-2">
              <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-muted-foreground">One person&apos;s story as proof</span>
            </div>
            <div className="flex items-start gap-2">
              <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-muted-foreground">Attacks the person, not the idea</span>
            </div>
            <div className="flex items-start gap-2">
              <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-muted-foreground">Only one source, no verification</span>
            </div>
          </div>
        </div>

        {/* Pro Tip */}
        <div className="mt-8 bg-gradient-to-r from-primary/10 to-transparent border border-primary/20 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            💡 The 5-Second Rule
          </h3>
          <p className="text-muted-foreground mb-4">
            Before sharing anything online, pause for 5 seconds and ask yourself:
          </p>
          <div className="flex flex-wrap gap-3">
            <div className="bg-background/80 rounded-full px-4 py-2 text-sm border border-border">
              🤔 Is this from a reliable source?
            </div>
            <div className="bg-background/80 rounded-full px-4 py-2 text-sm border border-border">
              📅 Is this current or outdated?
            </div>
            <div className="bg-background/80 rounded-full px-4 py-2 text-sm border border-border">
              ✅ Have I seen this confirmed elsewhere?
            </div>
            <div className="bg-background/80 rounded-full px-4 py-2 text-sm border border-border">
              😤 Am I sharing this because I&apos;m emotional?
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
