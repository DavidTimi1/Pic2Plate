import { useRouter } from "next/navigation";
import Button from "./button";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

interface StepItemProps {
  index?: number;
  description: string;
  duration: string;
  notes?: string;
}

function StepItem({ description, duration, notes }: StepItemProps) {
  return (
    <li className="w-full text-lg flex flex-col list-decimal space-y-2">
      <div className="flex flex-col gap-2 p-4 rounded-md bg-primary-foreground backdrop-blur-md">
        <span className="">{description}</span>
        <div className="flex justify-end gap-2">
          <span className="rounded-xl px-3 py-1 bg-primary text-sm">
            {duration}
          </span>
          {notes && (
            <span className="rounded-xl px-3 py-1 bg-gray-600 text-sm">
              {notes}
            </span>
          )}
        </div>
      </div>
    </li>
  );
}

interface IngredientProps {
  name: string;
  quantity: string;
  price?: string;
}

function Ingredient({ name, quantity, price }: IngredientProps) {
  return (
    <li className="w-full text-lg flex flex-col space-y-1">
      <div className="flex justify-between items-center p-4 rounded-md bg-primary-foreground backdrop-blur-md">
        <span className="">{name}</span>
        <span className="rounded-xl px-3 py-1 bg-primary text-white text-sm">
          {quantity}
        </span>
      </div>
      {price && (
        <div className="pl-4">
          <span className="rounded-xl px-3 py-1 bg-gray-600 text-white text-sm">
            {price}
          </span>
        </div>
      )}
    </li>
  );
}

interface RecipeCoverProps {
  mealName: string;
  ingredients: IngredientProps[];
}

export function RecipeCover({ mealName, ingredients }: RecipeCoverProps) {
  const router = useRouter();

  function handleClick() {
    router.push("?step=1");
  }

  return (
    <>
      <h1 className="text-4xl text-center font-extrabold p-6">{mealName}</h1>

      <section className="w-full max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-4">Ingredients</h2>
        <ol className="space-y-2 px-4">{ingredients.map((ing, i) => (
          <Ingredient key={i} {...ing} />
        ))}</ol>
      </section>

      <Button onClick={handleClick} className="gap-2 pr-5">
            <span> Let's Cook </span>
            <ArrowRightIcon className="w-6 h-6" />
        </Button>
    </>
  );
}

interface RecipeStepsProps {
  mealName: string;
  recipe: StepItemProps[];
}

export default function RecipeSteps({ mealName, recipe }: RecipeStepsProps) {
  const router = useRouter();

  function handleClick() {
    router.push("?steps");
  }

  return (
    <>
      <h1 className="text-4xl text-center font-extrabold p-6">{mealName}</h1>

      <section className="w-full max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-4">Steps</h2>
        <ol className="space-y-3 px-6">{recipe.map((step, index) => (
          <StepItem key={index} {...step} />
        ))}</ol>
      </section>

      <Button onClick={handleClick} className="gap-2 pr-5">
            <ArrowLeftIcon className="w-6 h-6" />
            <span> See Ingredients </span>
        </Button>
    </>
  );
}
