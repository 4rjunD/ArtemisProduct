"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-primary">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight text-primary-foreground mb-4">
          Every Day You Wait, The Habit Gets Stronger
        </h2>
        <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
          AI dependency compounds. The neural pathways for independent thinking weaken with each shortcut. Start rebuilding today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            variant="secondary"
            className="text-base gap-2"
            asChild
          >
            <a href="/login">
              Get Started
              <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
        </div>
        <p className="text-primary-foreground/60 text-sm mt-4">
          30-day money-back guarantee. Cancel anytime.
        </p>
      </div>
    </section>
  );
}
