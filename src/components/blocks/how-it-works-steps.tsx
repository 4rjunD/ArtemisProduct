"use client";

export function HowItWorksSteps() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium uppercase tracking-wider">
            Simple Process
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight mt-3 mb-4">
            Get Started in 3 Steps
          </h2>
          <p className="text-muted-foreground text-lg">
            No complicated setup. No learning curve. Just results.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-16 left-[16.67%] right-[16.67%] h-px bg-border" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-background border-2 border-primary mb-6">
                <span className="font-serif text-2xl text-primary">1</span>
              </div>
              <h3 className="font-serif text-xl mb-3">Create Their Profile</h3>
              <p className="text-muted-foreground text-sm">
                Tell us their age and grade. We'll calibrate the difficulty to match where they are right now.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-background border-2 border-primary mb-6">
                <span className="font-serif text-2xl text-primary">2</span>
              </div>
              <h3 className="font-serif text-xl mb-3">They Solve Daily Challenges</h3>
              <p className="text-muted-foreground text-sm">
                Short, focused exercises that make them think. No answers given. Just guiding questions.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-background border-2 border-primary mb-6">
                <span className="font-serif text-2xl text-primary">3</span>
              </div>
              <h3 className="font-serif text-xl mb-3">Watch Them Improve</h3>
              <p className="text-muted-foreground text-sm">
                Weekly reports show their progress. You'll see the difference in how they approach problems.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Works for ages <strong className="text-foreground">6 to 18</strong>. Difficulty adapts automatically.
          </p>
        </div>
      </div>
    </section>
  );
}
