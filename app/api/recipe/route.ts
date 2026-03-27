import { NextRequest, NextResponse } from "next/server";
import { getRecipe } from "@/lib/recipe";
import { cleanJSON, getCachedImage, getUserID } from "@/lib/helpers";
import { randomUUID } from "crypto";
import { addSeshHistory } from "@/lib/session";
import { imageURLFromID } from "@/lib/utils";
import { deleteCookie, getCookie, saveAsCookie } from "@/app/lib/cookies";


export async function POST(req: NextRequest) {
    const body = await req.json();
    const { mealName, imgID, ingredients, details } = body;

    const convoID = randomUUID();
    const imgSrc = imgID ? imageURLFromID(imgID) : null;

    const prevGenerated = { mealName, ingredients };
    console.log(`Received request for ${convoID} with meal: ${mealName} and image: ${imgSrc}`);

    try {
        const chatHistory = await convoHistory(imgSrc, JSON.stringify(prevGenerated));
        console.log("got convo history")

        // Call AI
        const ai_response = await getRecipe(details, chatHistory);
        const recipe = cleanJSON(ai_response);
        console.log("got recipe from AI")

        // Save temporarily
        await saveAsCookie(
            convoID, {
                recipe,
                imgSrc,
            });

        console.log(`✅ Successfully generated and saved recipe for ${convoID}`);

    } catch (bgError) {
        // Wont reach FE
        console.error(`❌ Background processing failed for ${convoID}:`, bgError);
    }

    return NextResponse.json({ 
        success: true, 
        id: convoID
    }, { status: 200 });
}


// USE A PUT to save the session to DB
export async function PUT(req: NextRequest) {
    const body = await req.json();
    const { convoID } = body;

    try {
        const [userID, storedData] = await Promise.all([
            getUserID(),
            getCookie(convoID)
        ]);

        if (!storedData) { // it has already been saved / issue, return moved
            return NextResponse.json({ success: false, error: "No session data found" }, { status: 302 });
        }

        await addSeshHistory(userID, convoID, storedData.recipe, storedData.imgSrc);
        console.log(`✅ Successfully added ${convoID} to DB`);
        
        deleteCookie(convoID); // clean up the cookie after saving to DB

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (err) {
        console.error(`❌ Failed to add ${convoID} to DB:`, err);
        return NextResponse.json({ success: false, error: "Failed to save session" }, { status: 500 });
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
