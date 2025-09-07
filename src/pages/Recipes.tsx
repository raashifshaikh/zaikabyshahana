import { useState } from "react";
import RecipeCard from "@/components/RecipeCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { mapMealDBToRecipe } from "@/lib/utils";
import { useDebounce } from "@/hooks/use-debounce";

const fetchRecipes = async (searchTerm: string, category: string) => {
  // If searching by term, this takes precedence
  if (searchTerm) {
    const { data, error } = await supabase.functions.invoke("themealdb-proxy", {
      body: { path: 'search.php', params: { s: searchTerm } },
    });
    if (error) throw new Error(error.message);
    return data.meals ? data.meals.map(mapMealDBToRecipe) : [];
  }

  // If filtering by category
  if (category && category !== "all") {
    // 1. Get list of meal stubs in the category
    const { data: categoryData, error: categoryError } = await supabase.functions.invoke("themealdb-proxy", {
      body: { path: 'filter.php', params: { c: category } },
    });
    if (categoryError) throw new Error(categoryError.message);
    if (!categoryData.meals) return [];

    // 2. Fetch full details for each meal in parallel for a richer UI
    const recipePromises = categoryData.meals.map((meal: any) => 
      supabase.functions.invoke("themealdb-proxy", {
        body: { path: 'lookup.php', params: { i: meal.idMeal } },
      })
    );
    const recipeResults = await Promise.all(recipePromises);
    
    const fullRecipes = recipeResults
      .map(res => res.data?.meals?.[0])
      .filter(Boolean);

    return fullRecipes.map(mapMealDBToRecipe);
  }

  return []; // Return empty if no search term or category
};

const Recipes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const categories = ["all", "Beef", "Breakfast", "Chicken", "Dessert", "Goat", "Lamb", "Miscellaneous", "Pasta", "Pork", "Seafood", "Side", "Starter", "Vegan", "Vegetarian"];

  const { data: recipes, isLoading } = useQuery({ 
    queryKey: ["recipes", debouncedSearchTerm, selectedCategory], 
    queryFn: () => fetchRecipes(debouncedSearchTerm, selectedCategory),
    enabled: !!debouncedSearchTerm || selectedCategory !== "all",
  });

  const handleCategoryChange = (category: string) => {
    setSearchTerm(""); // Clear search term when a category is selected
    setSelectedCategory(category);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory("all"); // Clear category when user types a search term
    setSearchTerm(e.target.value);
  };

  return (
    <div className="bg-amber-50 text-stone-800 min-h-screen">
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
              onChange={handleSearchChange}
            />
          </div>
          <Select onValueChange={handleCategoryChange} value={selectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
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
            <p className="text-stone-600 mt-2">Please start a search or select a category to find delicious recipes.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recipes;