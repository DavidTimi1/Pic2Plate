import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import cloudinary from "@/app/lib/cloudinary";


export async function POST(req: NextRequest) {

  try {
    const formData = await req.formData(); // Parse FormData
    const file = formData.get("image") as Blob | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Convert Blob to Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), "tmp/uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    // Move file to the desired location
    const ext = ".jpg";
    const newFileName = `${randomUUID()}${ext}`;
    const filePath = path.join(uploadDir, newFileName);

    await fs.writeFile(filePath, buffer);
    
    const uploadResponse = await cloudinary.uploader.upload(filePath, {
      folder: 'uploads',
    });

    const cmpdPath = uploadResponse.secure_url + "#" + newFileName

    return NextResponse.json({ message: "Upload successful", url: cmpdPath }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
