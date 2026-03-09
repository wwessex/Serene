import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Serene — Mental Wellness Companion",
  description: "A mental wellness companion that feels like a trusted friend — not a clinical tool. Warm, private, and evidence-based.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <body className="min-h-screen bg-cream pb-20">
        <main className="max-w-lg mx-auto">
          {children}
        </main>
        <Navigation />
      </body>
    </html>
  );
}
