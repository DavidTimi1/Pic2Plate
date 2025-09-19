import Head from "next/head";
import HeroSection from "./components/HeroSection";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";
import MealCarousel from "./components/MealCarousel";
import Footer from "./components/Footer";
import { structuredData } from "@/lib/structuredData";

export default function Home() {
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <main className="relative w-full overflow-hidden min-h-screen">
        <HeroSection />
        <MealCarousel />
        <HowItWorks />
        <Testimonials />
        <Footer />
      </main>
    </>
  );
}