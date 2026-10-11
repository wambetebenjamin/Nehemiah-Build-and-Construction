import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Navigation } from "@/components/site/Navigation";
import { Footer } from "@/components/site/Footer";
import { CookieConsent } from "@/components/site/CookieConsent";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { AmbientBlueprint, LoadingScreen, RouteAnnouncements } from "@/components/site/Effects";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://localhost";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Nehemiah Build & Construction | Nairobi, Kenya",
    template: "%s | Nehemiah Build",
  },
  description: "Nehemiah Build is a Nairobi-based residential, commercial construction and civil engineering partner. Built on trust. Raised on excellence.",
  applicationName: "Nehemiah Build & Construction",
  keywords: ["construction company Nairobi", "Kenya construction", "civil engineering", "residential construction", "commercial development", "project management"],
  openGraph: {
    type: "website",
    locale: "en_KE",
    siteName: "Nehemiah Build & Construction",
    title: "Nehemiah Build & Construction | Nairobi, Kenya",
    description: "Built on trust. Raised on excellence. Construction, civil engineering, renovation, and project management in Kenya.",
    images: [{ url: "/images/nairobi-construction-crew.jpg", width: 1260, height: 750, alt: "Construction workers on a Nairobi building site" }],
  },
  twitter: { card: "summary_large_image", title: "Nehemiah Build & Construction", description: "Built on trust. Raised on excellence.", images: ["/images/nairobi-construction-crew.jpg"] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#030f27",
  colorScheme: "light",
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "HomeAndConstructionBusiness", "GeneralContractor"],
  name: "Nehemiah Build & Construction",
  description: "Residential construction, commercial builds, civil engineering, renovation, and project management in Nairobi, Kenya.",
  telephone: "+254112272061",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nairobi",
    addressCountry: "KE",
  },
  areaServed: { "@type": "Country", name: "Kenya" },
  foundingDate: "2004",
  url: process.env.NEXT_PUBLIC_SITE_URL || undefined,
};

function jsonLd(value: object) {
  return { __html: JSON.stringify(value).replace(/</g, "\\u003c") };
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en-KE">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(localBusinessSchema)} />
      </head>
      <body id="top">
        <a className="skip-link" href="#main-content">Skip to content</a>
        <AmbientBlueprint />
        <Navigation />
        <RouteAnnouncements />
        <LoadingScreen />
        <main id="main-content">{children}</main>
        <Footer />
        <WhatsAppButton />
        <CookieConsent />
      </body>
    </html>
  );
}
