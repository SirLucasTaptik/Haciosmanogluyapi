import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { getContactInfo } from "@/lib/sanity/content";

// Display face — used with restraint, headlines and key numerals only.
// Chosen for its high-contrast optical cuts: reads as precise/architectural
// at heavy weight, echoing the script flourish in the company wordmark.
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

// Body face — Apple/Porsche-grade neutral clarity for long-form reading.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600"],
  display: "swap",
});

// Utility face — for stats, dates, progress percentages: technical precision.
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://haciosmanoglu-yapi.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Hacıosmanoğlu Yapı | Bakırköy Kentsel Dönüşüm",
    template: "%s | Hacıosmanoğlu Yapı",
  },
  description:
    "Bakırköy ve İstanbul genelinde güvenilir kentsel dönüşüm ve inşaat hizmetleri sunan Hacıosmanoğlu Yapı.",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: siteUrl,
    siteName: "Hacıosmanoğlu Yapı",
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const contact = await getContactInfo();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: contact.companyName,
    image: `${siteUrl}/logo.jpeg`,
    telephone: contact.phone,
    email: contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address,
      addressLocality: "Bakırköy",
      addressRegion: "İstanbul",
      addressCountry: "TR",
    },
    url: siteUrl,
  };

  return (
    <html lang="tr" className={`${fraunces.variable} ${inter.variable} ${plexMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Header companyName={contact.companyName} phone={contact.phone} phoneHref={contact.phoneHref} />
        <main className="pb-24 md:pb-0">{children}</main>
        <WhatsAppButton />
        <MobileBottomNav />
      </body>
    </html>
  );
}
