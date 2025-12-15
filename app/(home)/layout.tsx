import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import {ThemeProvider} from "@/components/theme-provider";
import { getServerSession } from "@/lib/get-session";
import Footer from "@/components/sections/Footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BrandFlare Woodworks | Interior Design, Roofing & Modern House Finishing",
  description: "BrandFlare Woodworks specializes in premium interior design, roofing solutions, custom woodwork, and modern finishing for homes and commercial spaces.",
  keywords: [
    "BrandFlare Woodworks",
    "interior design",
    "modern house finishing",
    "roofing services",
    "woodwork",
    "cabinetry",
    "ceilings",
    "home renovation",
    "home finishing",
    "construction finishing",
    "Kenyan interior design",
    "modern roofing",
  ],
  authors: [{ name: "BrandFlare Woodworks" }],
  openGraph: {
    type: "website",
    url: "https://brandflarewoodworks.com",
    title: "BrandFlare Woodworks | Interior Design & Modern Finishing",
    description: "Expert interior design, roofing, custom woodwork, and modern finishing solutions for stylish, durable homes.",
    images: [
      {
        url: "https://brandflarewoodworks.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BrandFlare Woodworks - Interior Design & Finishing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BrandFlare Woodworks | Premium Woodwork & Interior Finishing",
    description: "Transform your space with expert interior design, roofing, cabinetry, ceilings, and modern finishing services.",
    images: ["https://brandflarewoodworks.com/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) 

{
const session = await getServerSession();
const user = session?.user;

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "BrandFlare Woodworks",
              url: "https://brandflarewoodworks.com",
              logo: "https://brandflarewoodworks.com/logo.png",
              image: "https://brandflarewoodworks.com/og-image.jpg",
              description:
                "Premium interior design, roofing, custom woodwork, and modern finishing for homes and commercial spaces.",
              telephone: "+254700000000",
              address: {
                "@type": "PostalAddress",
                streetAddress: "123 Modern Street",
                addressLocality: "Nairobi",
                addressRegion: "Nairobi County",
                postalCode: "00100",
                addressCountry: "KE",
              },
              sameAs: [
                "https://www.facebook.com/BrandFlareWoodworks",
                "https://www.instagram.com/BrandFlareWoodworks",
                "https://www.linkedin.com/company/brandflarewoodworks",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}

      > <ThemeProvider attribute="class" defaultTheme="system" enableSystem  disableTransitionOnChange> 
            <Navbar user={user}/>
            {children}
            <Footer />
        </ThemeProvider>        
      </body>
    </html>
  );
}
