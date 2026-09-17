import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://graceproduction.cd"),
  title: "Grace Production — Réalisez vos rêves | Production & Événementiel à Kinshasa",
  description:
    "Grace Production, structure de production et d'événementiel basée à Kinshasa (RDC). Production événementielle, artistique, communication, partenariats et logistique. Réalisez vos rêves.",
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
  icons: {
    icon: "/images/logo-mark.png",
    apple: "/images/logo-mark.png",
  },
  openGraph: {
    title: "Grace Production — Réalisez vos rêves",
    description:
      "Production • Événementiel • Arts • Communication • Partenariats. Basée à Kinshasa, RDC.",
    url: "https://graceproduction.cd",
    siteName: "Grace Production",
    type: "website",
    locale: "fr_FR",
    images: [
      {
        url: "/images/hero.png",
        width: 1344,
        height: 768,
        alt: "Grace Production — festival à Kinshasa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Grace Production — Réalisez vos rêves",
    description:
      "Production • Événementiel • Arts • Communication • Partenariats — Kinshasa, RDC.",
    images: ["/images/hero.png"],
  },
  alternates: {
    canonical: "https://graceproduction.cd",
  },
  category: "business",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning className="dark">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased bg-background text-foreground font-sans`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
