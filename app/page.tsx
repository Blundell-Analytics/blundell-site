import About from "@/components/sections/about/default";
import ContactSection from "@/components/sections/contact/default";
import Coverage from "@/components/sections/coverage/default";
import Faq from "@/components/sections/faq/default";
import Footer from "@/components/sections/footer/default";
import Hero from "@/components/sections/hero/default";
import Navbar from "@/components/sections/navbar/default";
import DashboardShowcase from "@/components/sections/showcase/default";
import Team from "@/components/sections/team/default";
import FloatingActions from "@/components/ui/floating-actions";

export default function Home() {
  return (
    <main className="text-foreground w-full">
      <Navbar />
      <Hero />
      <About />
      <DashboardShowcase />
      <Coverage />
      <Team />
      <Faq />
      <ContactSection />
      <Footer />
      <FloatingActions />
    </main>
  );
}
