import ContactSection from "@/components/sections/contact/default";
import Footer from "@/components/sections/footer/default";
import Hero from "@/components/sections/hero/default";
import Navbar from "@/components/sections/navbar/default";
import DashboardShowcase from "@/components/sections/showcase/default";
import FloatingActions from "@/components/ui/floating-actions";

export default function Home() {
  return (
    <main className="text-foreground w-full">
      <Navbar />
      <Hero />
      <DashboardShowcase />
      <ContactSection />
      <Footer />
      <FloatingActions />
    </main>
  );
}
