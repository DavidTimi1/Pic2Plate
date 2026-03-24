import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY,
    vertexai: process.env.GOOGLE_GENAI_USE_VERTEXAI ?? true, 
});

export async function findIngredients(imgFile) {
    const modelId = 'gemini-3.1-pro-preview';

    // The new SDK uses 'contents' with 'parts' structure
    const contents = [
        {
            role: 'user',
            parts: [
                {
                    inlineData: {
                        data: imgFile, // Raw Base64 string
                        mimeType: "image/jpeg",
                    },
                },
                {
                    text: `As a professional cook in local dishes, identify what meal this is in the image.
                    Provide a list of the coordinates for the ingredients identified, exclusively listing 
                    those related to the meal identified. 

                    Rules:
                    1. type IngredientMap = { [ingredient_name]: [x1, y1, x2, y2] for all ingredients identified } 
                    2. Use center coordinates in range [0, 1000] (normalized for Vertex AI).
                    3. Intro text should be short (e.g., 'Yum, this looks like...').
                    4. If no meal is identified, return { "error": "No meal identified" }.

                    Format: { "intro": "IntroText", "name": "mealName", "ingredients": IngredientMap }`
                }
            ]
        }
    ];

        const result = await ai.models.generateContent({
            model: modelId,
            contents: contents
        });
        return result.text || '';
}