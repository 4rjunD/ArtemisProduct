"use client";

import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    quote: "After 3 weeks, my son stopped reaching for ChatGPT as his first move. Last week he spent 20 minutes working through a math problem on his own—something he never would have done before. He actually said 'I want to figure this out myself.'",
    name: "Anjay Y.",
    role: "Father of a 12-year-old",
    initials: "AY",
  },
  {
    quote: "By week 2, I noticed my daughter pausing before asking for help. The weekly reports showed her 'thinking time' went from 8 seconds to over a minute. Her teacher emailed me last month saying she's volunteering answers in class now.",
    name: "Vin D.",
    role: "Parent of a 9-year-old",
    initials: "VD",
  },
  {
    quote: "My kids have been using it for about 6 weeks now. The first few days were rough—they complained. But now they race each other to finish their daily challenges. My 8-year-old told me yesterday that 'the puzzles make my brain feel strong.'",
    name: "Jasmine P.",
    role: "Mother of 2 (ages 8 and 11)",
    initials: "JP",
  },
];

export function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-12">
          <span className="text-primary text-sm font-medium uppercase tracking-wider">
            Early Adopters
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight mt-3 mb-4">
            What Parents Are Saying
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Hear from families already using Artemis to rebuild their children's thinking skills.
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
