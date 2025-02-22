// import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// const fileManager = new GoogleAIFileManager(GEMINI_API_KEY);
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });



export async function findIngredients(imgFile) {
    
    const filePart = {
        inlineData: {
            data: imgFile,
            mimeType: "image/jpeg",
        },
    };

    const prompt = `As an professional cook in local dishes, Identify what meal\
        this is in the image and give a list of the bounding boxes for the ingredients identified in the image\
        exclusively listing only those related to the meal identified. If no meal is identified return "No meal seen". \
        Ingredient = {IngredientName: [ymin, xmin, ymax, xmax] // bounding box coordinates}

        In the format { name: meal_name, ingredients: Array<Ingredient> }`;
        

    const generatedContent = await model.generateContent([filePart, prompt]);

    console.log(generatedContent)

    return generatedContent
}