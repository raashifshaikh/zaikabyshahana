import { useState, useMemo } from "react";
import RecipeCard from "@/components/RecipeCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { recipes } from "@/data/recipes";

const Recipes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  const categories = ["all", ...Array.from(new Set(recipes.map(r => r.category)))];
  const difficulties = ["all", "Easy", "Medium", "Hard"];

  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || recipe.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === "all" || recipe.difficulty === selectedDifficulty;
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [searchTerm, selectedCategory, selectedDifficulty]);

  return (
    <div className="bg-amber-50 text-stone-800">
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-center text-red-900 mb-4">Explore Our Recipes</h1>
        <p className="text-center text-stone-600 mb-12">Find the perfect dish for any occasion.</p>

        {/* Search and Filters */}
        <div className="mb-12 grid grid-cols-1 md:grid-cols-4 gap-4 items-center bg-white p-6 rounded-lg shadow-sm">
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
          <Select onValueChange={setSelectedDifficulty} defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Filter by Difficulty" />
            </SelectTrigger>
            <SelectContent>
              {difficulties.map(difficulty => (
                <SelectItem key={difficulty} value={difficulty}>
                  {difficulty === "all" ? "All Difficulties" : difficulty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Recipes Grid */}
        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredRecipes.map((recipe) => (
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