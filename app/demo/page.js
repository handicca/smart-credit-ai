import DemoPage from "@/components/DemoClient";

export const metadata = {
  title: "Credit Eligibility Demo — Smart Credit AI",
  description:
    "Try the interactive demo to calculate risk scores, analyze top contributing factors, and view AI-generated credit decisions.",
  keywords: [
    "credit scoring demo",
    "loan calculator",
    "AI credit risk",
    "credit assessment tool",
    "fintech AI demo",
  ],
  openGraph: {
    title: "Smart Credit AI — Live Credit Eligibility Demo",
    description:
      "Test the AI model in real-time: submit financial information, get risk scores, see explanations.",
    url: "https://smart-credit-ai.vercel.app/demo",
    siteName: "Smart Credit AI",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart Credit AI — Credit Eligibility Demo",
    description: "Interactive risk scoring powered by machine learning.",
  },
};

export default function page() {
  return (
    <div>
      <DemoPage />
    </div>
  );
}
