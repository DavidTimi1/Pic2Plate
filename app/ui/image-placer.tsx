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

export default function ImagePlacer({ ingredients }: ImagePlacerProps) {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      <TooltipProvider>
        {
          Object.entries(ingredients).map(([ingredient, coords], index) => {
            const [x1, y1, x2, y2] = coords || [0, 0, 0, 0];
            const xOffset = (x1 + x2) / 20; // Normalize to [0, 100] for percentage
            const yOffset = (y1 + y2) / 20;

            return (
              <Tooltip open key={index}>
                <TooltipTrigger asChild>
                  <div
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                    style={{
                      left: `${xOffset}%`,
                      top: `${yOffset}%`,
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
            )
          })
        }
      </TooltipProvider>
    </div>
  );
}