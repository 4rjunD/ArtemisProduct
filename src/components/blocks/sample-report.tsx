"use client";

import { TrendingUp, Clock, BookOpen, Target } from "lucide-react";

export function SampleReport() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-12">
          <span className="text-primary text-sm font-medium uppercase tracking-wider">
            Parent Dashboard
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight mt-3 mb-4">
            See Their Learning in Action
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every session is recorded. Watch your student's understanding grow with real data.
          </p>
        </div>

        {/* Sample Report Card */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-background rounded-2xl border-2 border-border shadow-lg overflow-hidden">
            {/* Report Header */}
            <div className="bg-primary/5 border-b border-border px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Weekly Learning Report</p>
                  <p className="font-serif text-xl text-foreground">Marcus's Progress</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">This Week</p>
                  <p className="text-sm font-medium text-primary">12 sessions completed</p>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 border-b border-border">
              <div className="text-center p-4 bg-muted/30 rounded-xl">
                <div className="flex justify-center mb-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <p className="text-2xl font-bold text-foreground">8</p>
                <p className="text-xs text-muted-foreground">Topics mastered</p>
                <p className="text-xs text-green-600 mt-1">+3 this week</p>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-xl">
                <div className="flex justify-center mb-2">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <p className="text-2xl font-bold text-foreground">87%</p>
                <p className="text-xs text-muted-foreground">Understanding rate</p>
                <p className="text-xs text-green-600 mt-1">+12% from last week</p>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-xl">
                <div className="flex justify-center mb-2">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <p className="text-2xl font-bold text-foreground">2.4h</p>
                <p className="text-xs text-muted-foreground">Time learning</p>
                <p className="text-xs text-green-600 mt-1">Avg 20 min/session</p>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-xl">
                <div className="flex justify-center mb-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <p className="text-2xl font-bold text-foreground">Algebra</p>
                <p className="text-xs text-muted-foreground">Top subject</p>
                <p className="text-xs text-green-600 mt-1">Strong progress</p>
              </div>
            </div>

            {/* Insights Section */}
            <div className="p-6">
              <h4 className="font-medium text-foreground mb-4">This Week's Insights</h4>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 shrink-0" />
                  <div>
                    <p className="text-foreground text-sm">
                      <strong>Quadratic equations:</strong> Marcus figured out the quadratic formula through guided questioning. He can now explain why it works, not just how to use it.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0" />
                  <div>
                    <p className="text-foreground text-sm">
                      <strong>Physics momentum:</strong> Started connecting math concepts to physics problems. Understanding how formulas relate across subjects.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 shrink-0" />
                  <div>
                    <p className="text-foreground text-sm">
                      <strong>Needs practice:</strong> Word problems still take longer to parse. Recommend more sessions on translating text to equations.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-muted/50 px-6 py-4 text-center">
              <p className="text-sm text-muted-foreground">
                Sample report. Actual reports show your student's real session history and progress.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
