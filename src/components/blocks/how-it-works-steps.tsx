"use client";

export function HowItWorksSteps() {
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-muted/30">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium uppercase tracking-wider">
            How It Works
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight mt-3 mb-4">
            Learn Any STEM Problem in 3 Steps
          </h2>
          <p className="text-muted-foreground text-lg">
            No complicated setup. Just paste your homework and start learning.
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
              <h3 className="font-serif text-xl mb-3">Paste Your Problem</h3>
              <p className="text-muted-foreground text-sm">
                Upload any Math or Science homework question you're stuck on. Or browse topics to practice.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-background border-2 border-primary mb-6">
                <span className="font-serif text-2xl text-primary">2</span>
              </div>
              <h3 className="font-serif text-xl mb-3">Get Guided, Not Given Answers</h3>
              <p className="text-muted-foreground text-sm">
                Our AI asks strategic questions that lead you to the solution. You do the thinking. We just guide.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-background border-2 border-primary mb-6">
                <span className="font-serif text-2xl text-primary">3</span>
              </div>
              <h3 className="font-serif text-xl mb-3">Actually Understand It</h3>
              <p className="text-muted-foreground text-sm">
                Explain the solution in your own words. That's how we know you learned it — and how you know too.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Works for <strong className="text-foreground">Math & Science</strong> at any level. Middle school to college.
          </p>
        </div>
      </div>
    </section>
  );
}
