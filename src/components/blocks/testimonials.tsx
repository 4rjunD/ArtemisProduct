"use client";

import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    quote: "I actually understand my calculus homework now instead of just copying solutions from ChatGPT. The questions it asks make me think through each step. My test scores went up because I actually know the material.",
    name: "Marcus T.",
    role: "High school junior",
    initials: "MT",
  },
  {
    quote: "I was skeptical at first — another AI tool? But this one refuses to give my daughter the answers. She has to figure it out herself. Now I can actually see her reasoning in the session history. That's proof she's learning.",
    name: "Rachel M.",
    role: "Parent of a 14-year-old",
    initials: "RM",
  },
  {
    quote: "It's frustrating at first when it won't just tell you the answer. But then something clicks and you actually GET it. I explained a physics problem to my friend yesterday — that never would have happened before.",
    name: "Aiden K.",
    role: "10th grade student",
    initials: "AK",
  },
];

export function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-12">
          <span className="text-primary text-sm font-medium uppercase tracking-wider">
            Real Results
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight mt-3 mb-4">
            Students & Parents Love It
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Hear from students who actually understand their homework now — and parents who can prove it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="relative overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow bg-background"
            >
              <CardContent className="pt-8 pb-8">
                <div className="flex flex-col h-full">
                  {/* Quote marks */}
                  <svg
                    className="w-8 h-8 text-primary/20 mb-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>

                  <p className="text-foreground mb-6 flex-grow">
                    "{testimonial.quote}"
                  </p>

                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-sm">
                      {testimonial.initials}
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">
                        {testimonial.name}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}
