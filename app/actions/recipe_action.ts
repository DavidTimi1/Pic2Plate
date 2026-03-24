
"use server";

import { getRecipe } from "../lib/recipe";
import { cleanJSON, getCachedImage, getUserID } from "../lib/helpers";
import { randomUUID } from "crypto";
import { addSeshHistory } from "../lib/session";

interface RecipeActionProps {
    mealName: string | null,
    imgSrc: string | null,
    ingredients: string[],
    details: string,
}


export default async function RecipeAction({ ingredients, imgSrc, mealName, details }: RecipeActionProps) {
    // Retrieve user ID
    const userID = await getUserID();
    const convoID = randomUUID();

    // create a history object based on previously generated info
    const prevGenerated = {
        mealName,
        ingredients,
    }
    const chatHistory = await convoHistory(imgSrc, JSON.stringify(prevGenerated));

    let recipe;

    try {
        const ai_response = await getRecipe(details, chatHistory);
        recipe = cleanJSON(ai_response);

    } catch {
        return { success: false, error: "Error prompting AI model" };

    }

    try {
        await addSeshHistory(userID, convoID, recipe, imgSrc);

        return { success: true, id: convoID };

    } catch (err) {
        console.error(err)
        return { success: false, error: "Error connecting with DB" };
    }
}



async function convoHistory(imgSrc: string | null, prevJSON: string) {
    const history = [];

    // check if file exists
    if (!imgSrc)
        return [];

    const image_data = await getCachedImage(imgSrc);

    const filePart = {
        inlineData: {
            data: image_data,
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

    return history;
}
