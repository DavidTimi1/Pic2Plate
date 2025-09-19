// import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// const fileManager = new GoogleAIFileManager(GEMINI_API_KEY);
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });



export async function findIngredients(imgFile) {
    let prompt;
    
    const filePart = {
        inlineData: {
            data: imgFile,
            mimeType: "image/jpeg",
        },
    };

    if (imgFile){
        prompt = `As an professional cook in local dishes, Identify what meal\
        this is in the image and give a list of the bounding boxes for the ingredients identified in the image\
        exclusively listing only those related to the meal identified. \
        If no meal is identified return the object {error: "No meal identified"}. \
        Ingredients = {ingredient_name: [x, y], ... ] // center of bounding box coordinates}\
        The intro text should be short e.g 'Yum, this looks like a delicious meal of'\

        In the format { intro: IntroText, name: mealName, ingredients: Object<Ingredients> }.`;

    }

    const convo = model.startChat();
    const generatedContent = await convo.sendMessage([filePart, prompt]);

    return generatedContent;
}