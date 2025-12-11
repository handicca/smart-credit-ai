import CTA from "@/components/CTA";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";

export const metadata = {
  title: "Smart Credit AI — Intelligent Credit Eligibility Screening",
  description:
    "Smart Credit AI helps users assess loan eligibility instantly using machine learning, risk scoring, and transparent factor explanations.",
  keywords: [
    "credit scoring",
    "loan eligibility",
    "AI finance",
    "risk assessment",
    "machine learning",
    "fintech tools",
  ],
  openGraph: {
    title: "Smart Credit AI — Instant Credit Eligibility",
    description:
      "Evaluate creditworthiness instantly with AI-powered scoring and clear decision explanations.",
    url: "https://smart-credit-ai.vercel.app/",
    siteName: "Smart Credit AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart Credit AI — Intelligent Credit Screening",
    description: "AI-powered credit eligibility with transparent risk scoring.",
  },
};

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
