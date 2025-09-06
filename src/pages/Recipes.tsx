import { useState } from "react";
import RecipeCard from "@/components/RecipeCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Recipe } from "@/data/recipes";
import { Skeleton } from "@/components/ui/skeleton";
import { mapSpoonacularToRecipe } from "@/lib/utils";
import { useDebounce } from "@/hooks/use-debounce";

const fetchRecipes = async (searchTerm: string, category: string) => {
  const params: any = {
    query: searchTerm,
    number: 20,
    addRecipeInformation: true,
  };
  if (category !== "all") {
    params.cuisine = category;
  }

  const { data, error } = await supabase.functions.invoke("spoonacular-proxy", {
    body: { path: 'recipes/complexSearch', params },
  });

  if (error) throw new Error(error.message);
  return data.results.map(mapSpoonacularToRecipe);
};

const Recipes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const categories = ["all", "African", "Asian", "American", "British", "Cajun", "Caribbean", "Chinese", "European", "French", "German", "Greek", "Indian", "Italian", "Japanese", "Korean", "Mexican", "Middle Eastern", "Spanish", "Thai", "Vietnamese"];

  const { data: recipes, isLoading } = useQuery({ 
    queryKey: ["recipes", debouncedSearchTerm, selectedCategory], 
    queryFn: () => fetchRecipes(debouncedSearchTerm, selectedCategory),
    enabled: !!debouncedSearchTerm || selectedCategory !== "all",
  });

  return (
    <div className="bg-amber-50 text-stone-800">
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-center text-red-900 mb-4">Explore Our Recipes</h1>
        <p className="text-center text-stone-600 mb-12">Find the perfect dish for any occasion.</p>

        {/* Search and Filters */}
        <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-4 items-center bg-white p-6 rounded-lg shadow-sm">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400" />
            <Input 
              placeholder="Search for recipes..." 
              className="pl-10" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select onValueChange={setSelectedCategory} defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Filter by Cuisine" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "All Cuisines" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Recipes Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        ) : recipes && recipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-red-900">No Recipes Found</h2>
            <p className="text-stone-600 mt-2">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recipes;