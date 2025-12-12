import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: {
    default: "Smart Credit AI",
    template: "%s — Smart Credit AI"
  },
  description:
    "Smart Credit AI is an intelligent machine-learning platform for assessing credit eligibility, risk scores, and financial insights.",
  keywords: [
    "credit scoring",
    "loan eligibility",
    "AI finance",
    "risk assessment",
    "machine learning fintech"
  ],
  metadataBase: new URL("https://smart-credit-ai.vercel.app/"),
  openGraph: {
    title: "Smart Credit AI",
    description:
      "AI-powered credit eligibility and risk analysis platform.",
    url: "https://smart-credit-ai.vercel.app/",
    siteName: "Smart Credit AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart Credit AI",
    description:
      "AI-assisted credit risk scoring and eligibility prediction.",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${inter.variable} flex flex-col min-h-screen antialiased`}
      >
        <Header />
        <main className="container max-w-6xl mx-auto px-4 lg:px-8 py-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
