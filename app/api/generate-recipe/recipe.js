import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const fileManager = new GoogleAIFileManager(GEMINI_API_KEY);
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);


export async function getRecipe(description, history) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const convo = model.startChat({ history });

    const prompt = `Generate a detailed step-by-step recipe for this meal. 
        Keep in mind (very important): ${description}
        type Ingredient: {name, quantity}
        type Step: {description, duration?, price?} # duration and price only when necessary
        In the format {Ingredients: Ingredient[], Recipe: Step[]}
        `;

    const generatedContent = await convo.sendMessage(prompt)

    return generatedContent
}

