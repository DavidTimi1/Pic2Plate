import { UUID } from "crypto";


export interface Ingredient {
    name: string,
    quantity: string,
    price?: string
}

export interface RecipeStep {
    description: string, 
    duration: string, 
    notes?: string
}


export interface RecipeResult {
    mealName: string, 
    ingredients: Ingredient[], 
    recipe: RecipeStep[] 
}


export interface IngredientLocation {
    [key: string]: number[][], // bounding box coordinates}
}

export interface Scanned {
    name: string,
    ingredients: IngredientLocation
}


export interface ConvoIitem {
    id: UUID,
    data: RecipeResult
}


export interface userSession {
    history: ConvoIitem[],
}

