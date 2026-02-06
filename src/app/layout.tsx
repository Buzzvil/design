import type { Metadata } from "next";
import { Nunito, Noto_Sans_KR, Anonymous_Pro, Inter, Nanum_Gothic_Coding } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ContactFormProvider } from "@/contexts/ContactFormContext";
import ContactForm from "@/components/ui/ContactForm";

const nunito = Nunito({ 
  subsets: ["latin"], 
  variable: "--font-nunito" 
});

const notoKR = Noto_Sans_KR({ 
  subsets: ["latin"], 
  weight: ["300", "400", "700"], 
  variable: "--font-noto-kr" 
});

const anonymousPro = Anonymous_Pro({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-anonymous-pro",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const nanumGothicCoding = Nanum_Gothic_Coding({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-nanum-gothic-coding",
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
    <html lang="en" className={`${nunito.variable} ${notoKR.variable} ${anonymousPro.variable} ${inter.variable} ${nanumGothicCoding.variable}`}>
      <body className="min-h-screen bg-background antialiased">
        <LanguageProvider>
          <ContactFormProvider>
            {children}
            <ContactForm />
          </ContactFormProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}