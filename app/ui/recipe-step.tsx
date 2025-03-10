import { useRouter } from "next/navigation"
import Button from "./button"
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline"


interface StepItemProps {
    index: number,
    description: string,
    duration: string,
    price?: string
}

function StepItem({index, description, duration, price}: StepItemProps){


    return (
        <li className="w-full text-xl flex flex-col list list-decimal">
            <div className="flex flex-col align-center justify-center">
                <span className=" p-2 text-gray-200">
                    {description}
                </span>
                <div className="flex align-center justify-end gap-2">
                    <span className="rounded-2xl px-3 py-1 bg-pink-500 text-white">
                        {duration}
                    </span>
                    {
                        price &&
                        <span className="rounded-2xl px-3 py-1 bg-gray-500 text-white0">
                            {price}
                        </span>
                    }
                </div>
            </div>
        </li>
    )
}



interface IngredientProps {
    name: string,
    quantity: string,
    notes?: string
}

function Ingredient({name, quantity, notes}: IngredientProps){


    return (
        <li className="w-full text-xl flex flex-col">
            <div className="flex gap-2 items-center">
                <span className="p-2 text-gray-200">
                    {name}
                </span>
                <span className="flex flex-grow justify-end">
                    <span className="rounded-full px-2 py-1 bg-pink-500 text-white">
                        {quantity}
                    </span>
                </span>
            </div>
            {
                notes &&
                <span className="rounded-2xl px-3 py-1 bg-gray-500 text-white0">
                    {notes}
                </span>
            }
        </li>
    )
}



interface RecipeCoverProps{
    mealName: String,
    ingredients: IngredientProps[],
}

export function RecipeCover({mealName, ingredients}: RecipeCoverProps){
    const router = useRouter();

    return (
        <>
        <h1 className="p-4 text-3xl text-center font-bold">
            {mealName}
        </h1>

        <div className="w-full">
            <h3 className="text-2xl text-center w-full">
                Ingredients
            </h3>
            <ol className="w-full p-5">
                {
                    ingredients.map(
                        (ing, i) => <Ingredient key={i} {...ing} />
                    )
                }
            </ol>
        </div>

        <div className="sticky bottom-0 left-0 bg-gradient-to-b bg-blend-color backdrop-blur-xl p-4">
            <Button onClick={handleClick} className="pl-5 gap-2">
                <span> Let's Cook </span>
                <ArrowRightIcon className="h-6 w-6" />
            </Button>
        </div>

        </>
    )


    function handleClick(){
        router.push("?step=1")
    }
}


interface RecipeStepsProps{
    mealName: string,
    recipe: StepItemProps[]
}


export default function RecipeSteps({mealName, recipe}: RecipeStepsProps){
    const router = useRouter();

    return (
        <>
        <h1 className="p-2 text-3xl w-full text-center font-bold">
            {mealName}
        </h1>

        <div className="w-full">
            <h3 className="text-2xl text-center w-full">
                Steps
            </h3>
            <ol className="w-full p-5 space-y-10">
                {
                    recipe.map(
                        (step, index) => <StepItem key={index} {...step} />
                    )
                }
            </ol>
        </div>

        <Button onClick={handleClick} className="gap-2 pr-5">
            <ArrowLeftIcon className="w-6 h-6" />
            <span> See Ingredients </span>
        </Button>
        </>
    )


    function handleClick(){
        router.push("?steps")
    }
}