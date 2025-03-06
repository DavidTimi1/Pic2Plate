
"use server";

import { randomUUID } from "crypto";
import { getCookies } from "../api/cookies";
import fs from "fs/promises";
import path from "path";
import { getRecipe } from "../api/generate-recipe/recipe";
import { cleanJSON } from "../lib/helpers";

interface RecipeActionProps {
    mealName: string,
    imageSrc: string,
    ingredients: string,
    id: string,
    details: string,
}


export default async function RecipeAction({id, ingredients, imageSrc, mealName, details}: RecipeActionProps){
    const convoID = id;
    const userID = await getCookies().then(data => data.userID);

    // create a history object based on previously generated info
    const prevGenerated = {
        mealName,
        ingredients,
    }
    const history = convoHistory(imageSrc, JSON.stringify(prevGenerated));
    
    try {
        const ai_response = await getRecipe(details, history);
        const recipe = cleanJSON(ai_response);
        // saveState(userID, convoID, {imageSrc});

        return { success: true, data: recipe, id: convoID };

    } catch(err){
        console.log(err)
        return { success: false, error: "Error prompting AI model" };
    }
}



async function convoHistory(imgSrc: string | null, prevJSON: string){
    let history = [];

    // check if file exists
    if (imgSrc){

        const localLocation = imgSrc.split("/uploads")[1]
        const filePath = path.join(process.cwd(), "public/uploads", localLocation);

        try {
            await fs.access(filePath);

        } catch (error) {
            console.log(error)

        } finally {
            const image_blob = await fs.readFile(filePath);
            
            const filePart = {
                inlineData: {
                    data: image_blob.toString("base64"),
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
                            this is in the image and give a list of the ingredients identified in the image in the format { name: meal_name, ingredients: Array<Ingredient> }.",
                    },
                ]
            });

            // model response (scan)
            history.push({
                role: "model",
                parts: [
                    {
                        text: prevJSON,
                    },
                ]
            });

        }
    }

    return history;
}
