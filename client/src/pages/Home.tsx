import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { ValueBullets } from "@/components/ValueBullets";
import { HowItWorks } from "@/components/HowItWorks";
import { Deliverables } from "@/components/Deliverables";
import { FAQ } from "@/components/FAQ";
import { FAQSchema } from "@/components/FAQSchema";
import { HowWeWork } from "@/components/HowWeWork";
import { SLAsSection } from "@/components/SLAsSection";
import { ToolsSection } from "@/components/ToolsSection";
import { PrivacySection } from "@/components/PrivacySection";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { StickyCtaBar } from "@/components/StickyCtaBar";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <FAQSchema />
      <Navigation />
      <Hero />
      <ValueBullets />
      <HowItWorks />
      <Deliverables />
      <FAQ />
      <HowWeWork />
      <SLAsSection />
      <ToolsSection />
      <PrivacySection />
      <FinalCTA />
      <Footer />
      <BackToTop />
      <WhatsAppFloat />
      <StickyCtaBar />
    </div>
  );
}
