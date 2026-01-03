import { cn } from "@/lib/utils";
import {
  IconEye,
  IconChartLine,
  IconShieldCheck,
  IconBrain,
  IconHeartHandshake,
  IconDeviceMobile,
  IconStar,
  IconTarget,
} from "@tabler/icons-react";

export function ForParentsSection() {
  const features = [
    {
      title: "You've Noticed the Change",
      description:
        "They used to try. Now they give up instantly or just ask AI. Their natural problem-solving instinct is fading.",
      icon: <IconBrain />,
    },
    {
      title: "Track Real Progress",
      description:
        "Weekly reports show their reasoning scores improving. Watch their confidence grow with real data.",
      icon: <IconChartLine />,
    },
    {
      title: "No Answers, Only Questions",
      description:
        "Artemis guides without solving. Kids do 100% of the thinking. That's how real learning happens.",
      icon: <IconTarget />,
    },
    {
      title: "See How They Think",
      description: "Our dashboard reveals exactly how your child approaches problems and where they're making breakthroughs.",
      icon: <IconEye />,
    },
    {
      title: "Break the AI Habit",
      description: "A structured approach that rebuilds mental independence. Less reliance, more self-trust.",
      icon: <IconShieldCheck />,
    },
    {
      title: "Built With Purpose",
      description:
        "Designed based on cognitive science principles about how kids learn best.",
      icon: <IconHeartHandshake />,
    },
    {
      title: "Works on Any Device",
      description:
        "Phone, tablet, or computer. Fits into your family's routine without extra hassle.",
      icon: <IconDeviceMobile />,
    },
    {
      title: "Kids Actually Like It",
      description: "Challenges feel like games, not homework. Kids stay engaged because it's genuinely fun.",
      icon: <IconStar />,
    },
  ];
  return (
    <section id="for-parents" className="py-16 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium uppercase tracking-wider">For Parents</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight mt-3 mb-4">You Know Something's Wrong</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Your kid used to figure things out. Now they just ask ChatGPT. Here's how we fix it.</p>
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
