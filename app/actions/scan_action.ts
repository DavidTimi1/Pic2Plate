
"use server";

import fs from "fs/promises";
import path from "path";
import { findIngredients } from "../lib/scan";
import { cleanJSON, importExternalImage } from "../lib/helpers";
import { AIError, Scanned } from "../lib/definitions";
import { TEMPDIR } from "@/next.config";



export async function deduceFromImage(json: { imageSrc: string, tmpSrc: string }) {
  const {imageSrc, tmpSrc} = json;

  let localFileName = tmpSrc, image_blob
  let filePath = path.join(TEMPDIR, `uploads_${localFileName}`);


  try {
    image_blob = await fs.readFile(filePath);

  } catch {
    // check if file exists
    localFileName = await importExternalImage(imageSrc) ?? "";

    if (!localFileName)
      return { success: false, error: "File not found" };

    filePath = path.join(TEMPDIR, `uploads_${localFileName}`);
    
    image_blob = await fs.readFile(filePath);
  }


  const image_data = image_blob.toString("base64");

  try {
    const ai_response = await findIngredients(image_data);
    const scanned = cleanJSON(ai_response) as Scanned | AIError;

    if (scanned && 'error' in scanned) {
      return { success: false, error: scanned.error };
    }

    return { success: true, data: scanned, imgUrl: localFileName };

  } catch (err) {
    console.log(err)
    return { success: false, error: "Error prompting AI model" };
  }
}
