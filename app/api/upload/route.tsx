
import formidable, { File } from "formidable";
import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { NextApiRequest, NextApiResponse } from "next";


// Disable Next.js default body parser for Formidable to work
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper function to parse form data
const parseForm = (req: NextApiRequest): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  const form = new formidable.IncomingForm({
    uploadDir: path.join(process.cwd(), "public/uploads"),
    keepExtensions: true,
    maxFileSize: 5 * 1024 * 1024, // 5MB limit
  });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { files } = await parseForm(req);

    
    if (!files.image) return res.status(400).json({ message: "No file uploaded" });

    // Extract uploaded file
    const file = files.image as File;

    // Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    // Move file to the desired location
    const ext = path.extname(file.originalFilename || "");
    const newFileName = `${randomUUID()}${ext}`;
    const filePath = path.join(process.cwd(), "public/uploads", newFileName);

    fs.renameSync(file.filepath, filePath);

    return res.status(200).json({ message: "File uploaded successfully", url: `/uploads/${newFileName}` });

  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ message: "Error processing file upload" });
  }
}