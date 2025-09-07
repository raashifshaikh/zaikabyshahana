import { useState } from "react";
import RecipeCard from "@/components/RecipeCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { mapMealDBToRecipe, mapIndianFoodDBToRecipe } from "@/lib/utils";
import { useDebounce } from "@/hooks/use-debounce";
import SEO from "@/components/SEO";

const fetchRecipes = async (searchTerm: string, category: string) => {
  // Special case for the new Indian Food API
  if (category === "Indian") {
    const { data, error } = await supabase.functions.invoke("indian-food-proxy");
    if (error) throw new Error(error.message);
    return Array.isArray(data) ? data.map(mapIndianFoodDBToRecipe) : [];
  }

  // If searching by term, this takes precedence for TheMealDB
  if (searchTerm) {
    const { data, error } = await supabase.functions.invoke("themealdb-proxy", {
      body: { path: 'search.php', params: { s: searchTerm } },
    });
    if (error) throw new Error(error.message);
    return data.meals ? data.meals.map(mapMealDBToRecipe) : [];
  }

  // If filtering by category in TheMealDB
  if (category && category !== "all") {
    const { data: categoryData, error: categoryError } = await supabase.functions.invoke("themealdb-proxy", {
      body: { path: 'filter.php', params: { c: category } },
    });
    if (categoryError) throw new Error(categoryError.message);
    if (!categoryData.meals) return [];

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

  // Initial load: fetch 8 random recipes
  if (!searchTerm && category === "all") {
    const randomPromises = Array.from({ length: 8 }).map(() => 
      supabase.functions.invoke("themealdb-proxy", {
        body: { path: 'random.php' },
      })
    );
    const results = await Promise.all(randomPromises);
    const recipes = results
      .map(res => res.data?.meals?.[0])
      .filter(Boolean);
    return recipes.map(mapMealDBToRecipe);
  }

  return [];
};

const Recipes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const categories = ["all", "Indian", "Beef", "Breakfast", "Chicken", "Dessert", "Goat", "Lamb", "Miscellaneous", "Pasta", "Pork", "Seafood", "Side", "Starter", "Vegan", "Vegetarian"];

  const { data: recipes, isLoading } = useQuery({ 
    queryKey: ["recipes", debouncedSearchTerm, selectedCategory], 
    queryFn: () => fetchRecipes(debouncedSearchTerm, selectedCategory),
  });

  const handleCategoryChange = (category: string) => {
    setSearchTerm("");
    setSelectedCategory(category);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory("all");
    setSearchTerm(e.target.value);
  };

  const hasActiveFilter = debouncedSearchTerm || selectedCategory !== "all";

  return (
    <>
      <SEO 
        title="Explore Recipes"
        description="Find the perfect dish for any occasion. Browse our collection of delicious and easy-to-follow recipes, from Indian classics to modern favorites."
      />
      <div className="bg-amber-50 text-stone-800 min-h-screen">
        <div className="container mx-auto py-12 px-4">
          <h1 className="text-4xl font-bold text-center text-red-900 mb-4">Explore Our Recipes</h1>
          <p className="text-center text-stone-600 mb-12">Find the perfect dish for any occasion.</p>

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
              {recipes.map((recipe, index) => (
                <RecipeCard key={recipe.id} recipe={recipe} index={index} />
              ))}
            </div>
          ) : hasActiveFilter ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold text-red-900">No Recipes Found</h2>
              <p className="text-stone-600 mt-2">Try adjusting your search or selecting a different category.</p>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Recipes;