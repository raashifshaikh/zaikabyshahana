import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Recipe } from "@/data/recipes";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper function to map TheMealDB API response to our Recipe type
export const mapMealDBToRecipe = (meal: any): Recipe => {
  const ingredients: { quantity: string; name: string }[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({
        quantity: measure ? measure.trim() : "",
        name: ingredient.trim(),
      });
    }
  }

  return {
    id: meal.idMeal,
    title: meal.strMeal,
    image: meal.strMealThumb,
    category: meal.strCategory,
    area: meal.strArea,
    tags: meal.strTags ? meal.strTags.split(',') : [],
    description: meal.strInstructions, // The API provides the full instructions here
    ingredients,
    instructions: meal.strInstructions?.split('\r\n').filter((step: string) => step.trim() !== '') || [],
    youtubeUrl: meal.strYoutube,
  };
};

// Helper function to map Indian Food DB API response to our Recipe type
export const mapIndianFoodDBToRecipe = (item: any): Recipe => {
  return {
    // We add a prefix to avoid ID conflicts with TheMealDB
    id: `indian_${item.id}`,
    title: item.name,
    image: item.image,
    category: item.course,
    area: item.cuisine,
    tags: [],
    description: item.description,
    // The ingredients from this API are full strings, so we adapt
    ingredients: item.ingredients.map((ing: string) => ({
      quantity: "",
      name: ing,
    })),
    instructions: item.instructions,
    youtubeUrl: undefined,
  };
};