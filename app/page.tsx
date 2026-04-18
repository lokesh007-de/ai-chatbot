import { Features } from "@/components/landing/features";
import { Hero } from "@/components/landing/hero";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-page">
      <Navbar />
      <main>
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
