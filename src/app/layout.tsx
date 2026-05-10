import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { getSiteUrl } from "@/lib/site";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "WOODMART Style Ecommerce",
    template: "%s | WOODMART Style Ecommerce",
  },
  description:
    "Premium ecommerce storefront inspired by WOODMART with a bold fashion-first layout for product discovery and conversion.",
  keywords: [
    "ecommerce",
    "fashion store",
    "online shop",
    "Next.js storefront",
    "WOODMART style",
    "shopping website",
  ],
  authors: [{ name: "WOODMART Style Ecommerce" }],
  creator: "WOODMART Style Ecommerce",
  publisher: "WOODMART Style Ecommerce",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "WOODMART Style Ecommerce",
    title: "WOODMART Style Ecommerce",
    description:
      "Premium ecommerce storefront inspired by WOODMART with a bold fashion-first layout for product discovery and conversion.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "WOODMART Style Ecommerce",
    description:
      "Premium ecommerce storefront inspired by WOODMART with a bold fashion-first layout for product discovery and conversion.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
