import Footer from "../components/sections/footer/default";
import Hero from "../components/sections/hero/default";
import Navbar from "../components/sections/navbar/default";
import DashboardShowcase from "../components/sections/showcase/default";

export default function Home() {
  return (
    <main className="bg-black text-foreground w-full">
      <Navbar />
      <Hero />
      <DashboardShowcase />
      <Footer />
    </main>
  );
}
