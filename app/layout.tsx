import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/CartContext";
import ScrollToTop from "@/components/ScrollToTop";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.bookvendorco.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "BookVendor Co. | Commercial Book Supply & Logistics Hub",
    template: "%s | BookVendor Co.",
  },
  description: "BookVendor Co. is the central commercial supply hub for digital literature, bulk catalog licensing, and verified EPUB downloads.",
  keywords: ["BookVendor Co.", "Book Vendor Hub", "Commercial Book Supply", "Digital Book Wholesale"],
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "BookVendor Co. | Commercial Book Supply & Logistics Hub",
    description: "Central commercial book supply and digital catalog hub at BookVendor Co.",
    url: siteUrl,
    siteName: "BookVendor Co.",
    images: [{ url: "/icon.svg", width: 1200, height: 630, alt: "BookVendor Co." }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body 
        className="min-h-full flex flex-col font-inter bg-[#F8FAFC] text-[#1E293B]"
        suppressHydrationWarning
      >
        <CartProvider>
          <ScrollToTop />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
