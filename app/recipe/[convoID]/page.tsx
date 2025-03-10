
"use client";

import { useEffect, useState } from "react";
import ConvoDetails from "../../actions/retrieve_recipe_action";
import { useParams, useSearchParams } from "next/navigation";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import RecipeSteps, { RecipeCover } from "@/app/ui/recipe-step";



export default function RecipeView() {
    const [recipe, setRecipe] = useState<any>();
    const recipeSteps = recipe?.recipe
    
    const currentStep = getStepIndex();

    // get the varaiable in the url path
    const { convoID } = useParams();

    useEffect(() => {
        if (typeof convoID !== "string") {
            console.log("No conversation ID found");
            return;
        }

        ConvoDetails({id: convoID})
        .then((response) => {
            if (response.success) {
                console.log(response.data);
                setRecipe(response.data);

            } else {
                console.log(response.error);
                setRecipe({});
            }
        })
        
    }, []);



    return (
        <div className="w-full min-h-full flex flex-col gap-10 items-center justify-center overflow-y-auto py-10 px-3">
            {
                recipe ?
                    recipeSteps?
                        currentStep?
                            <RecipeSteps {...recipe} />
                        :
                            <RecipeCover {...recipe} />

                    :

                    <div className="p-4 text-white bg-red-500 w-full rounded-lg text-lg flex items-center justify-center gap-3">
                        <ExclamationCircleIcon className="w-10 h-10" />
                        <span>  No conversation found for that ID </span>
                    </div>

                    :

                    <div>Loading...</div>
            }
        </div>
    )

    function getStepIndex(){
        let stepQuery = useSearchParams().get("step") ?? '';
        let stepIndex = parseInt(stepQuery);
        return stepIndex
    }
}