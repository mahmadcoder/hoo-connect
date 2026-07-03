import Header from "@/app/components/Header";
import HeroSection from "@/app/components/HeroSection";
import FeaturesSection from "@/app/components/FeaturesSection";
import AudienceSection from "@/app/components/AudienceSection";
import ClaimSection from "@/app/components/ClaimSection";
import MovementSection from "@/app/components/MovementSection";
import WaitlistCTA from "@/app/components/WaitlistCTA";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Dark hero section */}
        <HeroSection />

        {/* Light cream background wraps the rest */}
        <div className="bg-[#f0ede6]">
          <FeaturesSection />
          <AudienceSection />
          <ClaimSection />
          <MovementSection />
          <WaitlistCTA />
        </div>
      </main>
      <Footer />
    </>
  );
}
