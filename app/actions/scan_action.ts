
"use server";

import { findIngredients } from "../lib/scan";
import { cleanJSON, getCachedImage } from "../lib/helpers";
import { AIError, Scanned } from "../lib/definitions";



export async function deduceFromImage(json: { imageSrc?: string}) {
  const { imageSrc } = json;

  if (!imageSrc)
    return { success: false, error: "No image provided" };

  let image_data;
  try {
    image_data = await getCachedImage(imageSrc);
    
  } catch {
    return { success: false, error: "Error importing image" };  
  }

  try {
    const ai_response = await findIngredients(image_data);
    const scanned = cleanJSON(ai_response) as Scanned | AIError;

    if (scanned && 'error' in scanned) {
      return { success: false, error: scanned.error };
    }

    return { success: true, data: scanned };

  } catch (err) {
    console.log(err)
    return { success: false, error: "Error prompting AI model" };
  }
}
