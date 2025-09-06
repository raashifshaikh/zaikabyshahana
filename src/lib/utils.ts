import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Recipe } from "@/data/recipes";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper function to map Spoonacular API response to our Recipe type
export const mapSpoonacularToRecipe = (spoonacularRecipe: any): Recipe => {
  const stripHtml = (html: string) => html ? html.replace(/<[^>]*>?/gm, '') : '';

  const getDifficulty = (readyInMinutes: number): "Easy" | "Medium" | "Hard" => {
    if (!readyInMinutes) return "Easy";
    if (readyInMinutes <= 30) return "Easy";
    if (readyInMinutes <= 60) return "Medium";
    return "Hard";
  };

  return {
    id: spoonacularRecipe.id,
    title: spoonacularRecipe.title,
    image: spoonacularRecipe.image,
    category: spoonacularRecipe.cuisines?.[0] || spoonacularRecipe.dishTypes?.[0],
    time: spoonacularRecipe.readyInMinutes,
    difficulty: getDifficulty(spoonacularRecipe.readyInMinutes),
    servings: spoonacularRecipe.servings,
    description: stripHtml(spoonacularRecipe.summary),
    ingredients: spoonacularRecipe.extendedIngredients?.map((ing: any) => ({
      quantity: `${ing.amount} ${ing.unit}`,
      name: ing.name,
    })) || [],
    instructions: spoonacularRecipe.analyzedInstructions?.[0]?.steps.map((step: any) => step.step) || [],
  };
};