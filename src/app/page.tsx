import { HeroSection } from "@/components/blocks/hero-section";
import { ProblemSection } from "@/components/blocks/problem-section";
import { HowItWorksSteps } from "@/components/blocks/how-it-works-steps";
import { Features } from "@/components/blocks/features-8";
import { ForParentsSection } from "@/components/blocks/feature-section-with-hover-effects";
import { ComparisonSection } from "@/components/blocks/comparison-section";
import { CTASection } from "@/components/blocks/cta-section";
import { Testimonials } from "@/components/blocks/testimonials";
import { SampleReport } from "@/components/blocks/sample-report";
import { CreativePricing } from "@/components/ui/creative-pricing";
import { FAQSection } from "@/components/blocks/faq-section";
import { Header1 } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { BackgroundPathsWrapper } from "@/components/ui/background-paths";
import { ExitIntentPopup } from "@/components/ui/exit-intent-popup";
import { MobileStickyCTA } from "@/components/ui/mobile-sticky-cta";

export default function Home() {
  return (
    <main>
      <Header1 />
      <BackgroundPathsWrapper>
      <HeroSection
        badge={{
          text: "Now in Early Access",
          action: {
            text: "Learn More",
            href: "#how-it-works",
          },
        }}
        title="Your Child's Brain Is Getting Weaker. We Can Fix That."
        description="AI dependency is eroding their ability to think. Artemis rebuilds it. For ages 6-18."
        actions={[
          {
            text: "Get Started",
            href: "/login",
            variant: "glow",
          },
          {
            text: "See How It Works",
            href: "#how-it-works",
            variant: "default",
          },
        ]}
      />
      </BackgroundPathsWrapper>
      <ProblemSection />
      <HowItWorksSteps />
      <Features />
      <ForParentsSection />
      <ComparisonSection />
      <CTASection />
      <Testimonials />
      <SampleReport />
      <CreativePricing />
      <FAQSection />
      <Footer />
      <ExitIntentPopup />
      <MobileStickyCTA />
    </main>
  );
}
