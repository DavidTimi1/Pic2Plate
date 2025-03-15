import { randomUUID } from "crypto";
import { getCookies, setCookies } from "./cookies";
import { GenerateContentResult } from "@google/generative-ai";
import axios from "axios";
import path from "path";
import fs from "fs/promises";




export function cleanJSON(generatedContent: GenerateContentResult) {
    // get the deduced info from the generated content
    const deduced_info = generatedContent.response.text();

    // parse the deduced info from first {  to last }
    const start = deduced_info.indexOf("{");
    const end = deduced_info.lastIndexOf("}") + 1;
    const cleanedJSON = JSON.parse(deduced_info.slice(start, end));

    return cleanedJSON;
}


export async function getUserID(){
    // Retrieve or set session cookie
    const cookies = await getCookies();
    let userID;

    if (cookies.userID) {
        userID = cookies.userID;
        
    } else {
        userID = randomUUID();
        setCookies({userID});
    }

    return userID;
}



export async function importExternalImage(url: string): Promise<string | null> {
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
  
      // Move file to the desired location
      const ext = ".jpg";
      const newFileName = `${randomUUID()}${ext}`;
      const filePath = path.join("/var/", `uploads_${newFileName}`);
  
      await fs.writeFile(filePath, buffer);
  
      return newFileName;
  
    } catch {
      console.error('Error fetching image from External Link:', url);
      return null; // Return null if the request fails
    }
  }