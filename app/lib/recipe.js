import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);


export async function getRecipe(description, history) {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

    const convo = model.startChat({ history });

    const prompt = `Generate a detailed step-by-step recipe for this meal. 
        Keep in mind (very important): ${description}
        type Ingredient: {name, quantity}
        type Step: {description, duration, price?} # price only when necessary like when budget was mentioned
        Make sure to search for any special ingredients that might be needed for this recipe.
        Make sure to also search for accurate price for each ingredient especially if a budget was mentioned.
        In the format { mealName: meal_name, ingredients: Ingredient[], recipe: Step[] }
        `;

    const generatedContent = await convo.sendMessage(prompt)

    return generatedContent
}

