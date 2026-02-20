import type { Metadata } from "next";
import { Nunito, Noto_Sans_KR, Anonymous_Pro, Inter, Nanum_Gothic_Coding } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ContactFormProvider } from "@/contexts/ContactFormContext";
import ContactForm from "@/components/ui/ContactForm";
import { FeaturedUpdateGlobal } from "@/components/ui/FeaturedUpdateGlobal";

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

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '/design';
const siteOrigin = process.env.NEXT_PUBLIC_SITE_ORIGIN || 'https://design.buzzvil.com';
const baseUrl = `${siteOrigin}${basePath}`;
const iconUrl = `${baseUrl}/icon.png`;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Design Buzzvil - Team Foundations & Resources",
  description: "A comprehensive resource hub for the Buzzvil design team, featuring our foundations, guidelines, and tools.",
  keywords: ["design", "buzzvil", "design system", "resources", "foundations"],
  authors: [{ name: "Buzzvil Design Team" }],
  icons: {
    icon: iconUrl,
    apple: iconUrl,
  },
  openGraph: {
    url: baseUrl,
    title: "Design Buzzvil - Team Foundations & Resources",
    description: "A comprehensive resource hub for the Buzzvil design team",
    type: "website",
    locale: "en_US",
    images: [{ url: iconUrl, width: 512, height: 512, alt: "Buzzvil Design" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Design Buzzvil - Team Foundations & Resources",
    description: "A comprehensive resource hub for the Buzzvil design team",
    images: [iconUrl],
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
            <FeaturedUpdateGlobal />
          </ContactFormProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}