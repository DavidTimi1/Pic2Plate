
"use server";

import fs from "fs/promises";
import path from "path";
import { findIngredients } from "../lib/scan";
import { cleanJSON } from "../lib/helpers";


export async function deduceFromImage(json: {imageSrc: string}): Promise<{ success: Boolean, 
                                                                            data?: any, 
                                                                            error?: string 
                                                                        }> {
    const imageSrc = json.imageSrc;

    // check if file exists
    if (!imageSrc) 
        return { success: false, error: "No filepath indicated" };

    const localLocation = imageSrc.split("/uploads")[1]
    const filePath = path.join(process.cwd(), "public/uploads", localLocation);

    try {
        await fs.access(filePath);

    } catch (error) {
        return { success: false, error: "File not found" };
    }

    const image_blob = await fs.readFile(filePath);
    const image_data = image_blob.toString("base64");

    try {
        const ai_response = await findIngredients(image_data);
        const scanned = cleanJSON(ai_response);

        return { success: true, data: scanned };

    } catch(err){
        console.log(err)
        return { success: false, error: "Error prompting AI model" };
    }
}

