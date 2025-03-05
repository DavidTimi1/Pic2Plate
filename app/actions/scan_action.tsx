
"use server";

import fs from "fs/promises";
import path from "path";
import { findIngredients } from "../api/scan-image/scan";


export async function deduceFromImage(json: {imageSrc: string}): Promise<{ success: Boolean, data?: any, error?: string }> {
    const imageSrc = json.imageSrc;

    // check if file exists
    const filePath = path.join(process.cwd(), "public/uploads", imageSrc);
    try {
        await fs.access(filePath);

    } catch (error) {
        return { success: false, error: "File not found" };
    }

    const image_data = await fs.readFile(filePath);
    const deduced_info = await findIngredients(image_data);

    const scanned = JSON.parse(deduced_info.response.text());

    return { success: true, data: scanned };
}
