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