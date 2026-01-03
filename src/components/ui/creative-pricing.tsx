"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Brain, Users, Sparkles, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingTier {
    name: string;
    icon: React.ReactNode;
    monthlyPrice: number;
    yearlyPrice: number;
    description: string;
    features: string[];
    popular?: boolean;
    color: string;
}

const defaultTiers: PricingTier[] = [
    {
        name: "Basic",
        icon: <Brain className="w-6 h-6" />,
        monthlyPrice: 15,
        yearlyPrice: 12,
        description: "Perfect for getting started",
        features: [
            "1 child profile",
            "Daily cognitive exercises",
            "Weekly progress reports",
            "Basic reasoning analytics",
            "Email support",
        ],
        color: "blue",
    },
    {
        name: "Pro",
        icon: <Sparkles className="w-6 h-6" />,
        monthlyPrice: 29,
        yearlyPrice: 24,
        description: "For families with multiple kids",
        features: [
            "Up to 2 children",
            "Personalized difficulty calibration",
            "Advanced reasoning and confidence tracking",
            "Parent insight dashboard",
            "Priority support",
        ],
        popular: true,
        color: "amber",
    },
    {
        name: "Premium",
        icon: <Users className="w-6 h-6" />,
        monthlyPrice: 49,
        yearlyPrice: 40,
        description: "For families who want full visibility",
        features: [
            "Unlimited children",
            "Custom learning paths",
            "Deep reasoning and behavior insights",
            "Family level dashboard",
            "Monthly progress summary",
            "Direct onboarding support",
        ],
        color: "emerald",
    },
];

function CreativePricing({
    tag = "Simple Pricing",
    title = "Invest in Their Future. Not Another App.",
    description = "Cancel anytime. 30-day money-back guarantee.",
    tiers = defaultTiers,
}: {
    tag?: string;
    title?: string;
    description?: string;
    tiers?: PricingTier[];
}) {
    const [isYearly, setIsYearly] = useState(false);

    return (
        <section id="pricing" className="py-16 md:py-32">
        <div className="w-full max-w-6xl mx-auto px-4">
            <div className="text-center space-y-6 mb-12">
                <span className="text-primary text-sm font-medium uppercase tracking-wider">
                    {tag}
                </span>
                <div className="relative">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-foreground">
                        {title}
                    </h2>
                </div>
                <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                    {description}
                </p>

                {/* Billing toggle */}
                <div className="flex items-center justify-center gap-4">
                    <span className={cn("text-sm", !isYearly ? "text-foreground font-medium" : "text-muted-foreground")}>
                        Monthly
                    </span>
                    <button
                        onClick={() => setIsYearly(!isYearly)}
                        className={cn(
                            "relative w-14 h-7 rounded-full transition-colors",
                            isYearly ? "bg-primary" : "bg-muted"
                        )}
                    >
                        <div
                            className={cn(
                                "absolute top-1 w-5 h-5 rounded-full bg-white transition-transform",
                                isYearly ? "translate-x-8" : "translate-x-1"
                            )}
                        />
                    </button>
                    <span className={cn("text-sm", isYearly ? "text-foreground font-medium" : "text-muted-foreground")}>
                        Yearly
                    </span>
                    {isYearly && (
                        <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full">
                            Save 2 months
                        </span>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {tiers.map((tier, index) => (
                    <div
                        key={tier.name}
                        className={cn(
                            "relative group",
                            "transition-all duration-300",
                            index === 0 && "rotate-[-1deg]",
                            index === 1 && "rotate-[1deg]",
                            index === 2 && "rotate-[-2deg]"
                        )}
                    >
                        <div
                            className={cn(
                                "absolute inset-0 bg-white dark:bg-zinc-900",
                                "border-2 border-zinc-900 dark:border-white",
                                "rounded-lg shadow-[4px_4px_0px_0px] shadow-zinc-900 dark:shadow-white",
                                "transition-all duration-300",
                                "group-hover:shadow-[8px_8px_0px_0px]",
                                "group-hover:translate-x-[-4px]",
                                "group-hover:translate-y-[-4px]"
                            )}
                        />

                        <div className="relative p-6">
                            {tier.popular && (
                                <div
                                    className="absolute -top-2 -right-2 bg-primary text-primary-foreground
                                    px-3 py-1 rounded-full rotate-12 text-sm border-2 border-foreground"
                                >
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-6">
                                <div
                                    className={cn(
                                        "w-12 h-12 rounded-full mb-4",
                                        "flex items-center justify-center",
                                        "border-2 border-foreground",
                                        "text-primary"
                                    )}
                                >
                                    {tier.icon}
                                </div>
                                <h3 className="font-serif text-2xl text-foreground">
                                    {tier.name}
                                </h3>
                                <p className="text-muted-foreground">
                                    {tier.description}
                                </p>
                            </div>

                            {/* Price */}
                            <div className="mb-6">
                                <span className="text-4xl font-bold text-foreground">
                                    ${isYearly ? tier.yearlyPrice : tier.monthlyPrice}
                                </span>
                                <span className="text-muted-foreground">
                                    /month
                                </span>
                                {isYearly && (
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Billed annually (${tier.yearlyPrice * 12}/year)
                                    </p>
                                )}
                            </div>

                            <div className="space-y-3 mb-6">
                                {tier.features.map((feature) => (
                                    <div
                                        key={feature}
                                        className="flex items-center gap-3"
                                    >
                                        <div
                                            className="w-5 h-5 rounded-full border-2 border-foreground
                                            flex items-center justify-center"
                                        >
                                            <Check className="w-3 h-3" />
                                        </div>
                                        <span className="text-foreground">
                                            {feature}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <Button
                                className={cn(
                                    "w-full h-12 text-base relative",
                                    "border-2 border-foreground",
                                    "transition-all duration-300",
                                    "shadow-[4px_4px_0px_0px] shadow-foreground",
                                    "hover:shadow-[6px_6px_0px_0px]",
                                    "hover:translate-x-[-2px] hover:translate-y-[-2px]",
                                    tier.popular
                                        ? [
                                              "bg-primary text-primary-foreground",
                                              "hover:bg-primary/90",
                                          ]
                                        : [
                                              "bg-background",
                                              "text-foreground",
                                              "hover:bg-muted",
                                          ]
                                )}
                            >
                                Start Now
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Guarantee - More Prominent */}
            <div className="mt-16 max-w-2xl mx-auto">
                <div className="relative bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20 rounded-2xl p-8 text-center">
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                        <div className="bg-primary text-primary-foreground rounded-full p-3">
                            <Shield className="w-6 h-6" />
                        </div>
                    </div>
                    <h3 className="font-serif text-2xl text-foreground mt-4 mb-3">
                        30-Day Money-Back Guarantee
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                        Try Artemis risk-free. If you don't see your child thinking more independently within 30 days—or if it's just not the right fit—email us and we'll refund every penny. No hoops, no hassle.
                    </p>
                </div>
            </div>
        </div>
        </section>
    );
}


export { CreativePricing, PricingTier }
