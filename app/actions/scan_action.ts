
"use server";

import fs from "fs/promises";
import path from "path";
import { findIngredients } from "../lib/scan";
import { cleanJSON } from "../lib/helpers";
import { Scanned } from "../lib/definitions";
import axios from "axios";
import { randomUUID } from "crypto";



export async function deduceFromImage(json: { imageSrc: string, tmpSrc: string }) {
  const {imageSrc, tmpSrc} = json;

  let localFileName = tmpSrc;

  // check if file exists
  if (!localFileName) {
    localFileName = await importExternalImage(imageSrc) ?? "";

    if (!localFileName)
    return { success: false, error: "No filepath indicated" };
  }

  const filePath = path.join(process.cwd(), "tmp/uploads", localFileName);

  try {
    await fs.access(filePath);

  } catch {
    return { success: false, error: "File not found" };
  }

  const image_blob = await fs.readFile(filePath);
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




async function importExternalImage(url: string): Promise<string | null> {
  /**
   * Converts an image URL to Base64 with error handling.
   */

  try {
    const response = await axios.get(url, {
      responseType: 'arraybuffer', // Important: This ensures we get binary data
      timeout: 5000, // Set a timeout (adjust as needed)
    });

    // Convert Blob to Buffer
    const buffer = Buffer.from(response.data);

    // Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), "tmp/uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    // Move file to the desired location
    const ext = ".jpg";
    const newFileName = `${randomUUID()}${ext}`;
    const filePath = path.join(uploadDir, newFileName);

    await fs.writeFile(filePath, buffer);

    return newFileName;

  } catch (error: any) {
    console.error('Error fetching image from Cloudinary:', error.message || error);
    return null; // Return null if the request fails
  }
}