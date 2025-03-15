
"use server";

import fs from "fs/promises";
import path from "path";
import { getRecipe } from "../lib/recipe";
import { cleanJSON, getUserID, importExternalImage } from "../lib/helpers";
import { randomUUID } from "crypto";
import { addSeshHistory } from "../session";
import { TEMPDIR } from "@/next.config";

interface RecipeActionProps {
    mealName: string | null,
    imgSrc: string | null,
    tmpFile: string,
    ingredients: string[],
    details: string,
}


export default async function RecipeAction({ingredients, imgSrc, mealName, details, tmpFile}: RecipeActionProps){    
    // Retrieve user ID
    const userID = await getUserID();
    const convoID = randomUUID();

    // create a history object based on previously generated info
    const prevGenerated = {
        mealName,
        ingredients,
    }
    const chatHistory = await convoHistory(tmpFile, imgSrc, JSON.stringify(prevGenerated));
    
    try {
        const ai_response = await getRecipe(details, chatHistory);
        const recipe = cleanJSON(ai_response);

        addSeshHistory(userID, convoID, recipe, imgSrc);

        return { success: true, id: convoID };

    } catch(err){
        console.log(err)
        return { success: false, error: "Error prompting AI model" };

    }
}



async function convoHistory(tmpFile: string, imgSrc: string | null, prevJSON: string){
    const history = [];
    let localFileName = tmpFile;

    // check if file exists
    if (!localFileName && imgSrc) {
        localFileName = await importExternalImage(imgSrc) ?? "";

        if (!localFileName)
            return [];
    }


    if (imgSrc){
        let filePath = path.join(TEMPDIR, `uploads_${localFileName}`);
        let image_blob;

        try {
            image_blob = await fs.readFile(filePath);

        } catch {
            // check if file exists
            localFileName = await importExternalImage(imgSrc) ?? "";
        
            if (!localFileName)
              return [];
        
            filePath = path.join(TEMPDIR, `uploads_${localFileName}`);
            
            image_blob = await fs.readFile(filePath);

        } finally {
            
            const filePart = {
                inlineData: {
                    data: image_blob?.toString?.("base64"),
                    mimeType: "image/jpeg",
                },
            };
        
            // user initial request
            history.push({
                role: "user",
                parts: [
                    filePart,
                    {
                        text: "As an professional cook in local dishes, Identify what meal\
                        this is in the image and give a list of the ingredients identified in the image\
                        In the format { name: meal_name, ingredients: Array<Ingredient> } no comments, pure json."
                    },
                ]
            });

            // model response (scan)
            history.push({
                role: "model",
                parts: [{
                    text: prevJSON
                }]
            });

        }
    }

    return history;
}
