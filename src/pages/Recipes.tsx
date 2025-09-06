import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RecipeCard from "@/components/RecipeCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { recipes } from "@/data/recipes";

const Recipes = () => {
  return (
    <div className="flex flex-col min-h-screen bg-amber-50 text-stone-800">
      <Header />
      <main className="flex-grow container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-center text-red-900 mb-4">Explore Our Recipes</h1>
        <p className="text-center text-stone-600 mb-12">Find the perfect dish for any occasion.</p>

        {/* Search and Filters */}
        <div className="mb-12 grid grid-cols-1 md:grid-cols-4 gap-4 items-center bg-white p-6 rounded-lg shadow-sm">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400" />
            <Input placeholder="Search for recipes..." className="pl-10" />
          </div>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Cuisine" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="indian">Indian</SelectItem>
              <SelectItem value="continental">Continental</SelectItem>
              <SelectItem value="desserts">Desserts</SelectItem>
              <SelectItem value="healthy">Healthy Meals</SelectItem>
              <SelectItem value="snacks">Quick Snacks</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Recipes;