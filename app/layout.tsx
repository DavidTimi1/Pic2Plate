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
  description: "Create ",
  openGraph: {
    type: "website",
    url: "https://example.com",
    title: "My Website",
    description: "My Website Description",
    siteName: "Pic2Plate",
    images: [{
      url: "https://example.com/og.png",
    }],
  },
  twitter: { 
    card: "summary_large_image", 
    site: "@site", 
    creator: "@DavidTimi_1", 
    images: "https://example.com/og.png" 
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
          {children}
        </div>
      </body>
    </html>
  );
}
