import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Design Buzzvil - Team Foundations & Resources",
  description: "A comprehensive resource hub for the Buzzvil design team, featuring our foundations, guidelines, and tools.",
  keywords: ["design", "buzzvil", "design system", "resources", "foundations"],
  authors: [{ name: "Buzzvil Design Team" }],
  openGraph: {
    title: "Design Buzzvil - Team Foundations & Resources",
    description: "A comprehensive resource hub for the Buzzvil design team",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Design Buzzvil - Team Foundations & Resources",
    description: "A comprehensive resource hub for the Buzzvil design team",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-background antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}