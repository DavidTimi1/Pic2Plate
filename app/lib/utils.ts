import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function idFromImageURL(url: string) {
  const parts = url.split("image/upload/");
  return parts[1].replace('/', '_');
}

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export function imageURLFromID(id: string) {
  const baseURL = `https://res.cloudinary.com/${cloudName}/image/upload/`;
  const imagePath = id.replace('_', '/');
  return baseURL + imagePath;
}