
"use client";

import { useEffect, useState } from "react";
import ConvoDetails from "../actions/retrieve_recipe_action";
import { useRouter } from "next/router";


export default function RecipeSteps() {
    const [recipeSteps, setRecipeSteps] = useState<any[]>();

    // get the varaiable in the url path
    const router = useRouter();
    const { convoID } = router.query;

    useEffect(() => {
        if (typeof convoID !== "string") {
            console.log("No conversation ID found");
            return;
        }

        ConvoDetails({id: convoID})
        .then((response) => {
            if (response.success) {
                console.log(response.data);
                setRecipeSteps(response.data);

            } else {
                console.log(response.error);
            }
        })
        
    }, []);



    return (
        <div>
            <h1>Recipe Steps</h1>
            <ul>
                {
                    recipeSteps ?
                    recipeSteps.map((step: any, index: number) => (
                        <li key={index}>{step}</li>
                    ))
                    :
                    <li>Loading...</li>
                }
            </ul>
        </div>
    )
}