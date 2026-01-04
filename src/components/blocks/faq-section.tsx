"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How is this different from ChatGPT?",
    answer:
      "ChatGPT gives you the answer. Artemis never does. Instead, we ask strategic questions that guide you to discover the solution yourself. It's the Socratic method — the same way great teachers have taught for 2,400 years. You learn by figuring it out, not by copying.",
  },
  {
    question: "What subjects do you cover?",
    answer:
      "We focus on STEM: Math (algebra, geometry, calculus, statistics) and Science (physics, chemistry, biology). These are subjects where understanding the 'why' matters most. We're adding more subjects based on user feedback.",
  },
  {
    question: "How do I use it for homework?",
    answer:
      "Paste any homework problem into Artemis. Our AI reads the problem and starts asking you guiding questions. 'What do you already know about this?' 'What would happen if you tried this approach?' You work through it step by step until you understand the solution — then you explain it back to prove you got it.",
  },
  {
    question: "Will this actually help my grades?",
    answer:
      "Yes, because you'll actually understand the material. When you figure something out yourself, you remember it. That's the difference on test day — you're not trying to recall something you copied, you're using knowledge you built yourself.",
  },
  {
    question: "Can my teacher tell I used this?",
    answer:
      "This IS learning. Unlike ChatGPT which does your homework for you, Artemis helps you understand so you can do it yourself. Your work is 100% your own thinking — we just asked the questions that got you there. Teachers want students who understand. That's what we help you become.",
  },
  {
    question: "What if I just want the answer?",
    answer:
      "That's what ChatGPT is for. We're for students who want to actually understand. It's frustrating at first when we won't just tell you — but that frustration is the feeling of your brain working. And when you figure it out yourself? That's real learning.",
  },
  {
    question: "How do parents track progress?",
    answer:
      "Parents get a full dashboard showing: every session completed, which concepts were covered, how the student's understanding improved, and what topics need more practice. You'll see the actual chat history — proof your student is thinking, not just copying.",
  },
  {
    question: "Is my data safe?",
    answer:
      "Yes. We never sell data, never show ads, and all information is encrypted. Session history is only visible to students and linked parent accounts. You can delete all data anytime from your dashboard.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. Cancel anytime with one click. Plus we offer a 30-day money-back guarantee — if Artemis isn't helping you learn, email us for a full refund. No questions asked.",
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
            Common Questions
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to know about learning with Artemis.
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
