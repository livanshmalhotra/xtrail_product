import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import Industry40Section from "@/components/Industry40Section";
import DigitalTransformationSection from "@/components/DigitalTransformationSection";
import WhyXtrailSection from "@/components/WhyXtrailSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col justify-between">
      <Navbar />
      <div id="content">
        <HeroSection />
        <ServicesSection />
        <Industry40Section />
        <DigitalTransformationSection />
        <WhyXtrailSection />
        <CTASection />
      </div>
      <Footer />
    </main>
  );
}
