import { GoogleGenAI } from '@google/genai';

// Initialize with the new SDK class
const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
vertexai: process.env.GOOGLE_GENAI_USE_VERTEXAI || true, 
});

export async function getRecipe(description, history) {
  const model = 'gemini-2.5-pro';

  // Create the chat session
  const chat = ai.chats.create({
    model: model,
    history: history
  });

  const prompt = `Generate a detailed step-by-step recipe for this meal. 
    Keep in mind (very important): ${description}
    
    Data Structures:
    type Ingredient: {name, quantity}
    type Step: {description, duration, price?} # price only when necessary (e.g., if a budget was mentioned)
    
    Requirements:
    1. Use Google Search to find special ingredients and current, accurate prices.
    2. Respond strictly in the format: { "mealName": "name", "ingredients": Ingredient[], "recipe": Step[] }`;

    // Using stream for better UX, or you can use chat.sendMessage for a single block
    const result = await chat.sendMessage([{ text: prompt }]);
    
    const response = result.response.candidates[0].content.parts[0].text;
    return response;
}