import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RecipeCard, { Recipe } from "@/components/RecipeCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

const recipes: Recipe[] = [
  { id: 1, title: "Spicy Chicken Curry", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop", category: "Indian", time: 45, difficulty: "Medium" },
  { id: 2, title: "Continental Salad", image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1887&auto=format&fit=crop", category: "Continental", time: 15, difficulty: "Easy" },
  { id: 3, title: "Pancakes with Berries", image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=1980&auto=format&fit=crop", category: "Desserts", time: 20, difficulty: "Easy" },
  { id: 4, title: "Vegetable Biryani", image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1887&auto=format&fit=crop", category: "Indian", time: 60, difficulty: "Medium" },
  { id: 5, title: "Grilled Salmon", image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=2070&auto=format&fit=crop", category: "Healthy Meals", time: 25, difficulty: "Easy" },
  { id: 6, title: "Chocolate Lava Cake", image: "https://images.unsplash.com/photo-1586985289628-078d75138948?q=80&w=1887&auto=format&fit=crop", category: "Desserts", time: 30, difficulty: "Hard" },
  { id: 7, title: "Quick Paneer Tikka", image: "https://images.unsplash.com/photo-1567010630899-366b8a33a3f2?q=80&w=1887&auto=format&fit=crop", category: "Quick Snacks", time: 20, difficulty: "Easy" },
  { id: 8, title: "Pasta Alfredo", image: "https://images.unsplash.com/photo-1621996346565-e326b20f5412?q=80&w=1887&auto=format&fit=crop", category: "Continental", time: 35, difficulty: "Medium" },
];

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