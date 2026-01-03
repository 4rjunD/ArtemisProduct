"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How much time does Artemis take each day?",
    answer:
      "Each session is 10-15 minutes. That's it. We've found this is the sweet spot—long enough to build real cognitive skills, short enough that kids don't burn out or resist. Most families do one session after school or before bed.",
  },
  {
    question: "What if my child refuses to do it or finds it boring?",
    answer:
      "The first few days are the hardest. We recommend sitting with them for the first 2-3 sessions. After that, something clicks—they start wanting to 'beat' the challenges. If your child still resists after a week, we'll refund you fully. But honestly, most kids get hooked once they feel themselves getting better at the problems.",
  },
  {
    question: "What does a typical exercise look like?",
    answer:
      "Exercises are reasoning puzzles—not trivia, not memorization. Your child might see a logic problem and get guided through it with questions like 'What do you notice first?' and 'What happens if you try the opposite?' We never give answers. We only ask questions that lead them to discover the answer themselves.",
  },
  {
    question: "How is this different from other educational apps?",
    answer:
      "Most apps give answers or make learning 'fun' with games and rewards. Artemis does the opposite: it makes kids work for understanding. The satisfaction comes from genuine mental effort, not points or badges. The goal isn't entertainment—it's rebuilding their ability to reason independently.",
  },
  {
    question: "What age is Artemis designed for?",
    answer:
      "Artemis works for children ages 6-18. The exercises automatically adjust difficulty based on your child's age and current reasoning level. Younger kids get more visual, concrete problems. Older kids tackle abstract reasoning and logic.",
  },
  {
    question: "How long until I see results?",
    answer:
      "Most parents notice behavioral changes within 2-3 weeks—kids start trying harder before asking for help. You'll see it in small moments: they'll pause before reaching for ChatGPT, or they'll talk through a problem out loud. Full cognitive rebuilding typically takes 3-6 months of consistent use.",
  },
  {
    question: "What do the progress reports show?",
    answer:
      "Weekly reports show your child's reasoning patterns: where they're improving, where they're struggling, and how their confidence is changing. You'll see metrics like 'time spent thinking before answering' and 'problems solved without hints.' It's a window into how their brain is developing.",
  },
  {
    question: "Is my child's data safe?",
    answer:
      "Yes. We take children's privacy seriously. We never sell data, never show ads, and all information is stored securely. You can delete all data at any time from your parent dashboard.",
  },
  {
    question: "What if it doesn't work for my child?",
    answer:
      "We offer a 30-day money-back guarantee, no questions asked. If you don't see any improvement—or if your child just doesn't engage with it—email us and we'll refund you fully. We only want to keep customers whose kids are actually benefiting.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center mb-12">
          <span className="text-primary text-sm font-medium uppercase tracking-wider">
            FAQ
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight mt-3 mb-4">
            Questions Parents Ask
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to know before getting started.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-foreground hover:text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
