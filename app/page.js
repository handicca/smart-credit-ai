import CTA from "@/components/CTA";
import Features from "@/components/Features";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";

export default function Home() {
  return (
    <div>
      <Hero />
      <section className="mt-12 grid gap-12">
        <Features />
        <HowItWorks />
        <CTA />
      </section>
    </div>
  );
}
