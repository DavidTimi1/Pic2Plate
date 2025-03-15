import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./ui/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pic2Plate",
  description: "Take a picture of a meal or describe it and get the recipe instantly!",
  openGraph: {
    type: "website",
    url: "https://pic2plate-tau.vercel.app",
    title: "Pic2Plate",
    description: "Take a picture of a meal or describe it and get the recipe instantly!",
    siteName: "Pic2Plate",
    images: [{
      url: "https://pic2plate-tau.vercel.app/images/hero.webp",
    }],
  },
  twitter: { 
    card: "summary_large_image",
    title: "Pic2Plate",
    site: "@Pic2Plate", 
    creator: "@DavidTimi_1", 
    images: "https://pic2plate-tau.vercel.app/images/hero.webp" 
  },
  authors: [{ name: "TimiDev", url: "https://github.com/DavidTimi" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="w-full h-full">
          <Navbar />
          <div className="w-full h-full py-8">
          {children}
        </div>
        </div>
      </body>
    </html>
  );
}
