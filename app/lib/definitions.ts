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

export interface HistoryItemData extends RecipeResult {
    imgSrc?: string
}


export interface IngredientLocation {
    [key: string]: number[][], // bounding box coordinates}
}

export interface Scanned {
    name: string,
    ingredients: IngredientLocation
}


export interface ConvoItem {
    id: UUID,
    data: HistoryItemData
}


export interface userSession {
    history: ConvoItem[],
}

