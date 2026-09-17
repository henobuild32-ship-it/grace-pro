import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ServiceWorkerRegister } from "@/components/grace/sw-register";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

// PWA-ready viewport with safe area support for iOS notch / home indicator
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f8f8" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0d0d" },
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Grace Production",
  },
};

const SITE_URL = "https://graceproduction.cd";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Grace Production — Réalisez vos rêves | Production & Événementiel à Kinshasa",
    template: "%s | Grace Production",
  },
  description:
    "Grace Production, structure de production et d'événementiel basée à Kinshasa (RDC). Production événementielle, artistique, communication, partenariats et logistique. Réalisez vos rêves.",
  applicationName: "Grace Production",
  keywords: [
    "Grace Production",
    "production événementielle Kinshasa",
    "événementiel RDC",
    "festival Père des Orphelins",
    "Surnaturel Na Bala Bala",
    "production artistique Congo",
    "communication Kinshasa",
    "partenariat sponsoring RDC",
  ],
  authors: [{ name: "Grace Production" }],
  creator: "Grace Production",
  publisher: "Grace Production",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/icons/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: ["/icons/favicon-32.png"],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Grace Production",
  },
  formatDetection: {
    telephone: true,
    address: false,
    email: true,
  },
  openGraph: {
    title: "Grace Production — Réalisez vos rêves",
    description:
      "Production • Événementiel • Arts • Communication • Partenariats. Basée à Kinshasa, RDC.",
    url: SITE_URL,
    siteName: "Grace Production",
    type: "website",
    locale: "fr_FR",
    images: [
      {
        url: "/icons/og-image.png",
        width: 1200,
        height: 630,
        alt: "Grace Production — Réalisez vos rêves",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Grace Production — Réalisez vos rêves",
    description:
      "Production • Événementiel • Arts • Communication • Partenariats — Kinshasa, RDC.",
    images: ["/icons/og-image.png"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  category: "business",
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Grace Production",
    "application-name": "Grace Production",
    "msapplication-TileColor": "#0d0d0d",
    "msapplication-tileimage": "/icons/icon-256.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning className="dark">
      <head>
        {/* Explicit apple-touch-icon link (older iOS Safari compatibility) */}
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/apple-touch-icon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
        {/* Favicon */}
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16.png" />
        <link rel="shortcut icon" href="/icons/favicon-32.png" />
      </head>
      <body
        className={`${playfair.variable} ${inter.variable} antialiased bg-background text-foreground font-sans`}
      >
        {children}
        <Toaster />
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
