"use client";

import { Button } from "@/components/ui/button";
import { GraduationCap, Users, Star, ArrowRight } from "lucide-react";

export function TutorSection() {
  return (
    <section id="tutoring" className="py-16 md:py-32 bg-primary/5">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-primary text-sm font-medium">Optional Add-On</span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight mt-2 mb-4">
              Find the Perfect Tutor
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              Want to go the extra mile? Artemis connects you with vetted K-12 tutors who share our philosophy: guide, don't give answers.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <GraduationCap className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <span className="font-medium">Subject Experts</span>
                  <p className="text-sm text-muted-foreground">Math, science, reading, writing, and more. All grade levels.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Users className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <span className="font-medium">Matched to Your Child</span>
                  <p className="text-sm text-muted-foreground">We pair tutors based on learning style, goals, and personality.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Star className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <span className="font-medium">Trained in Our Method</span>
                  <p className="text-sm text-muted-foreground">Every tutor learns the Artemis approach: build thinkers, not dependents.</p>
                </div>
              </li>
            </ul>
            <Button size="lg" className="gap-2">
              Learn About Tutoring <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="relative">
            <div className="bg-background rounded-2xl border shadow-lg p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <GraduationCap className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-lg">Tutoring Add-On</p>
                  <p className="text-muted-foreground">Starting at $40/session</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">1-on-1 sessions</span>
                  <span>50 minutes</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Scheduling</span>
                  <span>Flexible</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Grades</span>
                  <span>K-12</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Format</span>
                  <span>Online or In-Person</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
