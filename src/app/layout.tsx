import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dempsey's Burger Pub | Wichita, KS",
  description:
    "Gourmet smash burgers, craft beer, and hand-shaken cocktails on Douglas Ave. Dempsey's Burger Pub — welcome, enjoy yourself.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">
        {children}
        <Script
          src="https://cdn.zanderio.ai/widget/loader.js"
          data-id="wdg_VwuOlrfPdvEb71xyrVXyzIso"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
