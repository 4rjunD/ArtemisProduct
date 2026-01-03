"use client";

import { Card, CardContent } from "@/components/ui/card";

const stats = [
  {
    stat: "73%",
    description: "of students use AI for homework they should do themselves",
  },
  {
    stat: "2.3x",
    description: "faster kids give up on hard problems vs. 5 years ago",
  },
  {
    stat: "41%",
    description: "decline in critical thinking scores among heavy AI users",
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
            AI Is Rewiring Their Brains
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every time your child asks ChatGPT instead of thinking, their brain takes the easy path. Those neural pathways for reasoning? They're weakening.
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
              <h3 className="font-serif text-2xl">With AI Dependency</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                <span className="text-muted-foreground font-medium">01</span>
                <p className="text-foreground">Gives up after seconds on challenging problems</p>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                <span className="text-muted-foreground font-medium">02</span>
                <p className="text-foreground">Can't explain their own answers when asked</p>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                <span className="text-muted-foreground font-medium">03</span>
                <p className="text-foreground">Panics on tests without access to AI tools</p>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                <span className="text-muted-foreground font-medium">04</span>
                <p className="text-foreground">Loses confidence in their own thinking ability</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-accent" />
              <h3 className="font-serif text-2xl">After Artemis</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 rounded-lg border border-accent/20 bg-accent/5">
                <span className="text-accent font-medium">01</span>
                <p className="text-foreground">Works through challenges step by step</p>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg border border-accent/20 bg-accent/5">
                <span className="text-accent font-medium">02</span>
                <p className="text-foreground">Understands the "why" behind every solution</p>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg border border-accent/20 bg-accent/5">
                <span className="text-accent font-medium">03</span>
                <p className="text-foreground">Approaches new problems with confidence</p>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg border border-accent/20 bg-accent/5">
                <span className="text-accent font-medium">04</span>
                <p className="text-foreground">Trusts their own judgment and reasoning</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
