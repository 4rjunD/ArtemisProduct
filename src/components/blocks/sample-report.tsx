"use client";

import { TrendingUp, Clock, Brain, Target } from "lucide-react";

export function SampleReport() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-12">
          <span className="text-primary text-sm font-medium uppercase tracking-wider">
            Parent Dashboard
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight mt-3 mb-4">
            See Inside Their Progress
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every week, you'll get a clear picture of how your child's thinking is developing.
          </p>
        </div>

        {/* Sample Report Card */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-background rounded-2xl border-2 border-border shadow-lg overflow-hidden">
            {/* Report Header */}
            <div className="bg-primary/5 border-b border-border px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Weekly Progress Report</p>
                  <p className="font-serif text-xl text-foreground">Emma's Week 4 Summary</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Dec 15 - Dec 21</p>
                  <p className="text-sm font-medium text-primary">5 of 7 days active</p>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 border-b border-border">
              <div className="text-center p-4 bg-muted/30 rounded-xl">
                <div className="flex justify-center mb-2">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <p className="text-2xl font-bold text-foreground">47s</p>
                <p className="text-xs text-muted-foreground">Avg. thinking time</p>
                <p className="text-xs text-green-600 mt-1">+12s from last week</p>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-xl">
                <div className="flex justify-center mb-2">
                  <Brain className="w-5 h-5 text-primary" />
                </div>
                <p className="text-2xl font-bold text-foreground">23</p>
                <p className="text-xs text-muted-foreground">Challenges completed</p>
                <p className="text-xs text-green-600 mt-1">+5 from last week</p>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-xl">
                <div className="flex justify-center mb-2">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <p className="text-2xl font-bold text-foreground">78%</p>
                <p className="text-xs text-muted-foreground">Solved without hints</p>
                <p className="text-xs text-green-600 mt-1">+8% from last week</p>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-xl">
                <div className="flex justify-center mb-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <p className="text-2xl font-bold text-foreground">Level 4</p>
                <p className="text-xs text-muted-foreground">Current difficulty</p>
                <p className="text-xs text-green-600 mt-1">Advanced from L3</p>
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
                      <strong>Improved persistence:</strong> Emma is spending more time on difficult problems before asking for guidance. Her give-up rate dropped from 34% to 18%.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0" />
                  <div>
                    <p className="text-foreground text-sm">
                      <strong>Pattern recognition growing:</strong> She's recognizing similar problem types faster. This week she connected a logic puzzle to one she solved 2 weeks ago.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 shrink-0" />
                  <div>
                    <p className="text-foreground text-sm">
                      <strong>Area to watch:</strong> Abstract reasoning problems still take longer. Consider encouraging verbal explanation of her thought process.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-muted/50 px-6 py-4 text-center">
              <p className="text-sm text-muted-foreground">
                Sample report. Actual reports are personalized to your child's progress.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
