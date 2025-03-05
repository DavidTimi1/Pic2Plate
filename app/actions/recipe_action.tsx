
"use server";

interface RecipeActionProps {
    details: string,
}


export default async function RecipeAction({details}: RecipeActionProps){
    return {success: true, data: `You sent ${details}`}
}