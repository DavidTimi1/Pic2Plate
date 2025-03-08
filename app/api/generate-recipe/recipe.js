import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const fileManager = new GoogleAIFileManager(GEMINI_API_KEY);
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);


export async function getRecipe(description, history) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
    console.log(A)

    const convo = model.startChat({ history: Array.isArray(history) ? history : [] });

    const prompt = `Generate a detailed step-by-step recipe for this meal. 
        Keep in mind (very important): ${description}
        Ingredient: {name, quantity}
        Step: {description, duration?, price?} # duration and price only when necessary
        {Ingredients: Array<Ingredient>, Recipe: Array<Steps>}
        
        `;

    const generatedContent = await convo.sendMessage(prompt)

    return generatedContent
}

