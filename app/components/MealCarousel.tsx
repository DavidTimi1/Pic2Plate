"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Link from "next/link";

const mealData = [
  { name: "Spaghetti Bolognese", image: "/images/spaghetti-bolognese.jpg", link: "/recipes/spaghetti-bolognese" },
  { name: "Ewa Agoyin and Plantain", image: "/images/plantain-and-ewa-agoyin.jpg", link: "/recipes/plantain-and-ewa-agoyin" },
  { name: "Jollof Rice with Chicken", image: "/images/Jollof-Rice-With-Chicken.jpg", link: "/recipes/jollof-rice-with-chicken" },
  { name: "Vegetable Stir Fry", image: "/images/vegetable-stir-fry.jpg", link: "/recipes/vegetable-stir-fry" },
  { name: "Chicken Alfredo", image: "/images/chicken-alfredo.jpg", link: "/recipes/chicken-alfredo" },
];

export default function MealCarousel() {
  return (
    <section className="py-20 px-6">
      <h2 className="text-4xl font-bold text-center mb-12">Popular Recipes</h2>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-6xl mx-auto"
      >
        <CarouselContent className="-ml-1">
          {mealData.map((meal, index) => (
            <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/4">
              <div className="p-1">
                <Link href={meal.link} className="block group relative overflow-hidden rounded-xl aspect-[4/5] shadow-lg">
                  <Image
                    src={meal.image}
                    alt={meal.name}
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-end justify-start p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <h3 className="text-white text-xl font-semibold">{meal.name}</h3>
                  </div>
                </Link>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}