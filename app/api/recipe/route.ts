import { NextRequest, NextResponse } from "next/server";
import { getRecipe } from "@/lib/recipe";
import { cleanJSON, getCachedImage, getUserID } from "@/lib/helpers";
import { randomUUID } from "crypto";
import { addSeshHistory } from "@/lib/session";
import { imageURLFromID } from "@/lib/utils";
import { waitUntil } from '@vercel/functions';


export async function POST(req: NextRequest) {
    const body = await req.json();
    const { mealName, imgID, ingredients, details } = body;

    const convoID = randomUUID();
    const imgSrc = imgID ? imageURLFromID(imgID) : null;

    const prevGenerated = { mealName, ingredients };

    waitUntil(
        (async () => {
            try {
                const [userID, chatHistory] = await Promise.all([
                    getUserID(),
                    convoHistory(imgSrc, JSON.stringify(prevGenerated))
                ]);

                // Call AI
                const ai_response = await getRecipe(details, chatHistory);
                const recipe = cleanJSON(ai_response);

                // Save to Database
                await addSeshHistory(userID, convoID, recipe, imgSrc);

                console.log(`✅ Successfully generated and saved recipe for ${convoID}`);

            } catch (bgError) {
                // Wont reach FE
                console.error(`❌ Background processing failed for ${convoID}:`, bgError);
            }
        })()
    );

    return NextResponse.json({ 
        success: true, 
        id: convoID
    }, { status: 200 });
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
