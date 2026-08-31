import ClosingCta from "@/components/sections/cta/default";
import ContactSection from "@/components/sections/contact/default";
import Faq from "@/components/sections/faq/default";
import Footer from "@/components/sections/footer/default";
import Hero from "@/components/sections/hero/default";
import Method from "@/components/sections/method/default";
import Navbar from "@/components/sections/navbar/default";
import Objectives from "@/components/sections/objectives/default";
import DashboardShowcase from "@/components/sections/showcase/default";
import FloatingActions from "@/components/ui/floating-actions";

export default function Home() {
  return (
    <main className="text-foreground w-full">
      <Navbar />
      <Hero />
      <Method />
      <DashboardShowcase />
      <Objectives />
      <Faq />
      <ClosingCta />
      <ContactSection />
      <Footer />
      <FloatingActions />
    </main>
  );
}
