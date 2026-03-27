import { GoogleGenAI } from '@google/genai';

// Initialize with the new SDK class
const useVertexAI = process.env.GOOGLE_GENAI_USE_VERTEXAI !== 'false';
const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
  vertexai: useVertexAI, 
});

export async function getRecipe(description, history) {
  const model = 'gemini-3.1-pro-preview';

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
    . Respond strictly in the format: { "mealName": "name", "ingredients": Array<Ingredient>, "recipe": Array<Step> }`;

    // Using stream for better UX, or you can use chat.sendMessage for a single block
    const result = await chat.sendMessage({ message: prompt });
    
    const response = result.text || '';
    return response;
}