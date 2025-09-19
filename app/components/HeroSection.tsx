"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { BackgroundCarousel } from "./BackgroundCarousel";
import { GlowInput } from "./GlowButton";
import { CameraIcon } from "lucide-react";


export default function HeroSection() {
  const router = useRouter();

  return (
    <section className="relative flex flex-col items-center justify-center h-screen text-center z-10">
      <BackgroundCarousel />

      {/* <div className="bg-radial from-transparent from-80% to-background w-full h-screen aspect-square absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"></div> */}


      <div className="flex flex-col items-center justify-center gap-12 w-full text-white">
        <div className="w-full flex flex-col items-center text-center px-6 gap-6">
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight leading-tight">
            Pic2Plate
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-md">
            Take a picture of a meal or describe it and get the recipe instantly!
          </p>

          <div className="flex flex-col items-center gap-4 w-full max-w-md">
            {/* Camera Button */}
            <Button onClick={handleUploadImageClick} className="p-1">
              <span className="p-5 text-gray-100">
                Take a Picture
              </span>
              <div className="h-full flex items-center justify-center aspect-square rounded-lg bg-gray-100 text-primary">
                <CameraIcon size={30} />
              </div>
            </Button>

            {/* ---- OR ---- */}
            <div className="flex items-center gap-4 max-w-80 text-gray-200">
              <div className="h-px bg-foreground flex-1" />
              <span className="text-sm uppercase font-bold">or</span>
              <div className="h-px bg-foreground flex-1" />
            </div>

            {/* Glowing input field */}
            <GlowInput onSubmitMealDescription={handleSubmitMealDescription} />

            {/* Plate Image + Glow */}
            {/* <div className="bottom-[-40px] md:bottom-[-60px] w-[300px] md:w-[400px] z-[-1]">
              <div className="relative">
                <img
                  src="images/plate.png"
                  alt="Plate"
                  className="w-full object-contain"
                />
                <div className="absolute bottom-0 inset-0 rounded-full blur-3xl opacity-60 bg-primary" />
              </div>
            </div> */}

          </div>
        </div>
      </div>

      <div className="bg-gradient-to-b from-transparent to-background to-70% h-[200px] w-full absolute bottom-0 left-0 z-20 pointer-events-none"></div>
    </section>
  );

  function handleUploadImageClick(){
    router.push("/browse/upload");
  }

  function handleSubmitMealDescription(description: string){
      router.push(`/browse?description=${encodeURIComponent(description)}`);
  }
}
