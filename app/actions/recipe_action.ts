import { toast } from "@/hooks/use-toast";
import axios from "axios";

interface RecipeActionProps {
    mealName: string | null;
    imgID: string | undefined;
    ingredients: string[];
    details: string;
}

interface RecipeResponse {
    success: boolean;
    id?: string;
    error?: string;
}

export default async function RecipeAction(props: RecipeActionProps): Promise<RecipeResponse> {
    try {
        const { data } = await axios.post<RecipeResponse>(
            "/api/recipe", 
            props
        );

        ensureRecipeSaved(data.id!);

        return data;

    } catch (err) {
        if (axios.isAxiosError(err)) {
            const errorMessage = err.response?.data?.error || "An unexpected error occurred";
            return { 
                success: false, 
                error: errorMessage 
            };
        }

        return { 
            success: false, 
            error: "Failed to connect to the server" 
        };
    }
}


async function ensureRecipeSaved(convoID: string) {
    const maxRetries = 5;
    const retryDelay = 2000; // 2 seconds
    
    let attempts = 0;

    async function run() {
        try {
            const response = await axios.put("/api/recipe", { convoID });
            
            if (response.data.success) {
                console.log(`✅ Recipe with convoID ${convoID} successfully saved to DB.`);
                return;
            } else {
                console.warn(`⚠️ Attempt ${attempts + 1}: Server responded with an error: ${response.data.error}`);
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.warn(`⚠️ Attempt ${attempts + 1}: Failed to save recipe with convoID ${convoID}. Error: ${err.message}`);
            } else {
                console.warn(`⚠️ Attempt ${attempts + 1}: An unexpected error occurred while saving recipe with convoID ${convoID}.`);
            }
        }

        attempts++;
        if (attempts < maxRetries) {
            setTimeout(run, retryDelay);
        } else {
            console.error(`❌ Failed to save recipe with convoID ${convoID} after ${maxRetries} attempts.`);
        }
    }
    run();
}
