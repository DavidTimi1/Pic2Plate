import { NextRequest, NextResponse } from "next/server";
import { getRecipe } from "@/lib/recipe";
import { cleanJSON, getCachedImage, getUserID } from "@/lib/helpers";
import { randomUUID } from "crypto";
import { addSeshHistory } from "@/lib/session";
import { imageURLFromID } from "@/lib/utils";


export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { mealName, imgID, ingredients, details } = body;

        const userID = await getUserID();
        const convoID = randomUUID();
        const imgSrc = imgID ? imageURLFromID(imgID) : null;

        const prevGenerated = { mealName, ingredients };
        const chatHistory = await convoHistory(imgSrc, JSON.stringify(prevGenerated));

        // Call AI
        const ai_response = await getRecipe(details, chatHistory);
        const recipe = cleanJSON(ai_response);

        // Database logic
        await addSeshHistory(userID, convoID, recipe, imgSrc);

        return NextResponse.json({ 
            success: true, 
            id: convoID
        }, { status: 200 });

    } catch (err: any) {
        console.error("API Error:", err);
        return NextResponse.json({ 
            success: false, 
            error: err.message || "Internal Server Error" 
        }, { status: 500 });
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
