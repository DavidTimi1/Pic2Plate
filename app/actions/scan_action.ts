
"use server";

import fs from "fs/promises";
import path from "path";
import { findIngredients } from "../lib/scan";
import { cleanJSON, importExternalImage } from "../lib/helpers";
import { Scanned } from "../lib/definitions";
import { TEMPDIR } from "@/next.config";



export async function deduceFromImage(json: { imageSrc: string, tmpSrc: string }) {
  const {imageSrc, tmpSrc} = json;

  let localFileName = tmpSrc, image_blob;

  // check if file exists
  if (!localFileName) {
    localFileName = await importExternalImage(imageSrc) ?? "";

    if (!localFileName)
    return { success: false, error: "No filepath indicated" };
  }

  const filePath = path.join(TEMPDIR, `uploads_${localFileName}`);


  try {
    image_blob = await fs.readFile(filePath);

  } catch {
    return { success: false, error: "File not found" };
  }


  const image_data = image_blob.toString("base64");

  try {
    const ai_response = await findIngredients(image_data);
    const scanned = cleanJSON(ai_response) as Scanned;

    return { success: true, data: scanned, imgUrl: localFileName };

  } catch (err) {
    console.log(err)
    return { success: false, error: "Error prompting AI model" };
  }
}
