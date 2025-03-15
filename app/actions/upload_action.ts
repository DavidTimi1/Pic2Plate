
"use server";

import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";


export async function uploadImageAction(formData: FormData): Promise<{ success: boolean; url?: string; error?: string}> {
    const file = formData.get("image") as File;
    if (!file) return { error: "No file provided", success: false };

    const ext = path.extname(file.name);
    const newFileName = `${randomUUID()}${ext}`;
    const filePath = path.join("/var/", `uploads_${newFileName}`);

    try {
        //
        await fs.writeFile(filePath, Buffer.from(await file.arrayBuffer()));
        return { success: true, url: `/uploads/${newFileName}` };

    } catch (error) {
        console.log(error);
        return { success: false, error: "File save failed" };
    }
}
