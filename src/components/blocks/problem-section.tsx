"use client";

import { Card, CardContent } from "@/components/ui/card";

const stats = [
  {
    stat: "89%",
    description: "of students can't explain solutions they copied from AI",
  },
  {
    stat: "3x",
    description: "better retention when learning through questioning vs. answers",
  },
  {
    stat: "67%",
    description: "of students feel anxious when they can't use AI on tests",
  },
];

export function ProblemSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center mb-12">
          <span className="text-primary text-sm font-medium uppercase tracking-wider">
            The Problem
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight mt-3 mb-4">
            ChatGPT Gives Answers. We Build Understanding.
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            When students copy answers, they pass the assignment but fail to learn. Real understanding comes from figuring it out yourself — with the right guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {stats.map((item, index) => (
            <Card
              key={index}
              className="relative overflow-hidden border shadow-sm bg-background"
            >
              <CardContent className="pt-8 pb-8 text-center">
                <p className="font-serif text-5xl md:text-6xl text-primary mb-3">
                  {item.stat}
                </p>
                <p className="text-muted-foreground text-sm">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Before/After comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-muted-foreground" />
              <h3 className="font-serif text-2xl">Copy-Paste Learning</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                <span className="text-muted-foreground font-medium">01</span>
                <p className="text-foreground">Gets the answer, doesn't understand the process</p>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                <span className="text-muted-foreground font-medium">02</span>
                <p className="text-foreground">Freezes on tests without AI access</p>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                <span className="text-muted-foreground font-medium">03</span>
                <p className="text-foreground">Can't explain how they solved it</p>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                <span className="text-muted-foreground font-medium">04</span>
                <p className="text-foreground">Grades don't reflect actual knowledge</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-accent" />
              <h3 className="font-serif text-2xl">Socratic Learning</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 rounded-lg border border-accent/20 bg-accent/5">
                <span className="text-accent font-medium">01</span>
                <p className="text-foreground">Discovers the solution through guided questions</p>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg border border-accent/20 bg-accent/5">
                <span className="text-accent font-medium">02</span>
                <p className="text-foreground">Confident on tests because they actually know it</p>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg border border-accent/20 bg-accent/5">
                <span className="text-accent font-medium">03</span>
                <p className="text-foreground">Can explain their reasoning step by step</p>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg border border-accent/20 bg-accent/5">
                <span className="text-accent font-medium">04</span>
                <p className="text-foreground">Real understanding that sticks long-term</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
