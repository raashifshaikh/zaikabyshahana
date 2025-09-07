import { useParams } from "react-router-dom";
import { Printer, Youtube, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import NotFound from "./NotFound";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { mapMealDBToRecipe, mapIndianFoodDBToRecipe } from "@/lib/utils";
import { Recipe } from "@/data/recipes";

const fetchMealDBRecipe = async (id: string): Promise<Recipe> => {
  const { data, error } = await supabase.functions.invoke("themealdb-proxy", {
    body: { path: `lookup.php`, params: { i: id } },
  });
  if (error) throw new Error(error.message);
  if (!data.meals || data.meals.length === 0) throw new Error("Recipe not found");
  return mapMealDBToRecipe(data.meals[0]);
};

const fetchIndianRecipe = async (id: string): Promise<Recipe> => {
  const { data, error } = await supabase.functions.invoke("indian-food-proxy");
  if (error) throw new Error(error.message);
  if (!Array.isArray(data)) throw new Error("Invalid data from Indian Food API");
  
  const recipeData = data.find(item => item.id === id);
  if (!recipeData) throw new Error("Indian recipe not found");
  
  return mapIndianFoodDBToRecipe(recipeData);
};

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();

  const isIndianRecipe = id?.startsWith("indian_");
  const recipeId = isIndianRecipe ? id?.replace("indian_", "") : id;

  const { data: recipe, isLoading, isError } = useQuery({
    queryKey: ["recipe", recipeId],
    queryFn: () => isIndianRecipe ? fetchIndianRecipe(recipeId!) : fetchMealDBRecipe(recipeId!),
    enabled: !!recipeId,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-10 w-3/4 mb-2" />
          <Skeleton className="h-6 w-1/4 mb-6" />
          <Skeleton className="w-full h-96 rounded-lg mb-8" />
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <Skeleton className="h-8 w-1/2 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
            </div>
            <div className="md:col-span-2">
              <Skeleton className="h-8 w-1/2 mb-4" />
              <Skeleton className="h-10 w-full mb-2" />
              <Skeleton className="h-10 w-full mb-2" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !recipe) {
    return <NotFound />;
  }

  return (
    <div className="bg-white text-stone-800">
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-red-900 mb-2">{recipe.title}</h1>
          <div className="flex flex-wrap gap-2 mb-6">
            {recipe.category && <Badge variant="secondary">{recipe.category}</Badge>}
            {recipe.area && <Badge variant="outline">{recipe.area}</Badge>}
          </div>

          <img src={recipe.image} alt={recipe.title} className="w-full h-96 object-cover rounded-lg shadow-lg mb-8" />

          <div className="flex flex-wrap items-center justify-center gap-4 text-center mb-8 p-4 bg-amber-50 rounded-lg">
            {recipe.youtubeUrl && (
              <a href={recipe.youtubeUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" className="text-red-800 hover:text-red-900">
                  <Youtube className="h-6 w-6 mr-2" /> Watch on YouTube
                </Button>
              </a>
            )}
            <Button variant="ghost" onClick={() => window.print()}>
              <Printer className="h-6 w-6 text-red-800" />
              <span className="ml-2">Print Recipe</span>
            </Button>
          </div>
          
          {recipe.tags && recipe.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-8">
              <Tag className="h-5 w-5 text-stone-500" />
              {recipe.tags.map(tag => <Badge key={tag} variant="outline">{tag}</Badge>)}
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <h2 className="text-2xl font-bold text-red-900 mb-4 border-b-2 border-red-800 pb-2">Ingredients</h2>
              <ul className="space-y-2">
                {recipe.ingredients?.map((ing, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-red-800 font-bold mr-2">&#8226;</span>
                    <span><strong>{ing.quantity}</strong> {ing.name}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold text-red-900 mb-4 border-b-2 border-red-800 pb-2">Instructions</h2>
              <ol className="space-y-4">
                {recipe.instructions?.map((step, index) => (
                  <li key={index} className="flex">
                    <span className="bg-red-800 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">{index + 1}</span>
                    <p className="pt-1">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;