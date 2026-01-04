import { cn } from "@/lib/utils";
import {
  IconEye,
  IconChartLine,
  IconShieldCheck,
  IconMath,
  IconFlask,
  IconDeviceMobile,
  IconClock,
  IconSchool,
} from "@tabler/icons-react";

export function ForParentsSection() {
  const features = [
    {
      title: "See Their Actual Reasoning",
      description:
        "Not just grades — see exactly how your child thinks through problems. Every session is recorded.",
      icon: <IconEye />,
    },
    {
      title: "Proof They're Not Cheating",
      description:
        "Full session history shows the questions asked and answers given. You'll know they did the work.",
      icon: <IconShieldCheck />,
    },
    {
      title: "Track Real Progress",
      description:
        "Weekly reports show which concepts they've mastered and where they need more practice.",
      icon: <IconChartLine />,
    },
    {
      title: "Math at Every Level",
      description: "From basic algebra to calculus. The tutor adapts to their current level and grows with them.",
      icon: <IconMath />,
    },
    {
      title: "Science Covered Too",
      description: "Physics, Chemistry, Biology. Same Socratic approach applied to all STEM subjects.",
      icon: <IconFlask />,
    },
    {
      title: "Works on Any Device",
      description:
        "Phone, tablet, or computer. Homework help whenever they need it.",
      icon: <IconDeviceMobile />,
    },
    {
      title: "Available 24/7",
      description: "Unlike human tutors, Artemis is always ready. Late-night homework? No problem.",
      icon: <IconClock />,
    },
    {
      title: "Real Learning, Not Shortcuts",
      description: "Our AI refuses to do their homework for them. It guides them to figure it out themselves.",
      icon: <IconSchool />,
    },
  ];
  return (
    <section id="for-parents" className="py-16 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium uppercase tracking-wider">For Parents</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight mt-3 mb-4">Know They Actually Understand</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Grades don't tell the full story. With Artemis, you see how your child thinks — not just what they turn in.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10">
          {features.map((feature, index) => (
            <Feature key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature border-border",
        (index === 0 || index === 4) && "lg:border-l border-border",
        index < 4 && "lg:border-b border-border"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-muted to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-muted to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-primary">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-border group-hover/feature:bg-primary transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-foreground">
          {title}
        </span>
      </div>
      <p className="text-sm text-muted-foreground max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
