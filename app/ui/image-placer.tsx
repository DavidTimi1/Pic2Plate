import React from "react";
import { IngredientLocation } from "@/lib/definitions";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ImagePlacerProps {
  ingredients: IngredientLocation;
  mealName: string;
}

export default function ImagePlacer({ ingredients, mealName }: ImagePlacerProps) {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      <TooltipProvider>
        {Object.entries(ingredients).map(([ingredient, coords], index) => (
          <Tooltip open key={index}>
            <TooltipTrigger asChild>
              <div
                className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                style={{
                  left: `${coords?.[0] / 10}%`,
                  top: `${coords?.[1] / 10}%`,
                }}
              >
                <span style={{ fontSize: "11px" }} className="rounded-full ring ring-offset-2 ring-white bg-white border-primary w-6 h-6">
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Likely location of: {ingredient}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
}