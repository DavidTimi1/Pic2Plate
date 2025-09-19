"use client";

import Link from "next/link";
import { Clock, Github, MoonIcon, SunIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTheme } from "../components/theme-client";

const Navbar = () => {
  const {theme, change: changeTheme} = useTheme();
  
  return (
    <nav className="sticky top-0 z-50 w-full border-b backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-8 py-2 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          {/* You can add a logo here if you have one */}
          <span className="font-bold text-xl md:text-2xl tracking-tight">
            Pic2Plate
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleChangeTheme}
                >
                  {theme === "dark" ? (
                    <SunIcon className="h-8 w-8" />
                  ) : (
                    <MoonIcon className="h-8 w-8" />
                  )}
                  <span className="sr-only">Toggle Theme</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle Theme</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/history">
                    <Clock className="h-8 w-8" />
                    <span className="sr-only">View History</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>History</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="https://github.com/DavidTimi1/Pic2Plate" target="_blank" rel="noopener noreferrer">
                    <Github className="h-8 w-8" />
                    <span className="sr-only">GitHub Repository</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>GitHub</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </nav>
  );

  function handleChangeTheme() {
    changeTheme();
  }
};

export default Navbar;