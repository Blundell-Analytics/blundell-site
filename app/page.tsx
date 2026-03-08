import Footer from "../components/sections/footer/default";
import Hero from "../components/sections/hero/default";
import Navbar from "../components/sections/navbar/default";
import DashboardShowcase from "../components/sections/showcase/default";
import ContactSection from "../components/sections/contact/default";
import ScrollToTop from "../components/ui/scroll-to-top";

export default function Home() {
  return (
    <main className="bg-black text-foreground w-full">
      <Navbar />
      <Hero />
      <DashboardShowcase />
      <ContactSection />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
