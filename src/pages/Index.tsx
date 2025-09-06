import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useChatbot } from "@/context/ChatbotContext";
import { Recipe } from "@/data/recipes";
import RecipeCard from "@/components/RecipeCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const fetchRecipes = async () => {
  const { data, error } = await supabase.from("recipes").select("*").order('id');
  if (error) throw new Error(error.message);
  return data as Recipe[];
};

const Index = () => {
  const { setIsOpen } = useChatbot();
  const { data: recipes, isLoading } = useQuery({ queryKey: ["recipes"], queryFn: fetchRecipes });

  const featuredRecipes = useMemo(() => {
    return recipes ? recipes.slice(0, 3) : [];
  }, [recipes]);

  const recipeOfTheDay = useMemo(() => {
    if (!recipes || recipes.length === 0) return null;
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    return recipes[dayOfYear % recipes.length];
  }, [recipes]);

  return (
    <div className="bg-amber-50 text-stone-800">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-cover bg-center text-white" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container relative mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Zaika by Shahana</h1>
          <p className="mt-4 text-lg md:text-xl text-amber-100">
            Delicious Recipes, Made Simple.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/recipes">
              <Button size="lg" className="bg-red-800 hover:bg-red-900 text-white">
                Explore Recipes <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white bg-transparent hover:bg-white hover:text-red-800" onClick={() => setIsOpen(true)}>
              Ask the Cooking Bot
            </Button>
          </div>
        </div>
      </section>

      {/* Recipe of the Day Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-red-900 mb-4">Recipe of the Day</h2>
          <p className="text-center text-stone-600 mb-12">Our special pick for you today!</p>
          {isLoading || !recipeOfTheDay ? (
            <div className="max-w-4xl mx-auto md:flex">
              <Skeleton className="h-64 w-full md:h-auto md:w-1/2" />
              <div className="p-8 md:w-1/2 space-y-4">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden md:flex hover:shadow-red-100 transition-shadow duration-300">
              <div className="md:w-1/2">
                <img className="h-64 w-full object-cover md:h-full" src={recipeOfTheDay.image} alt={recipeOfTheDay.title} />
              </div>
              <div className="p-8 md:w-1/2 flex flex-col justify-center">
                <div className="uppercase tracking-wide text-sm text-red-800 font-semibold">{recipeOfTheDay.category}</div>
                <h3 className="mt-1 text-2xl font-bold text-stone-900">{recipeOfTheDay.title}</h3>
                <p className="mt-2 text-stone-600">{recipeOfTheDay.description}</p>
                <div className="mt-4 flex items-center">
                  <Star className="h-5 w-5 text-amber-500 fill-current" />
                  <span className="ml-2 text-stone-600">{recipeOfTheDay.difficulty} Difficulty</span>
                </div>
                <Link to={`/recipes/${recipeOfTheDay.id}`} className="mt-6">
                  <Button size="lg" className="w-full bg-red-800 hover:bg-red-900">
                    Get the Recipe
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* About Shahana Section */}
      <section className="py-16 md:py-24 bg-amber-50">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold text-red-900 mb-4">A Pinch of Passion in Every Dish</h2>
            <p className="text-stone-600 mb-4 leading-relaxed">
              Welcome to my culinary world! I'm Shahana, a passionate chef dedicated to making cooking an enjoyable and accessible experience for everyone. My journey began in my grandmother's kitchen, where the aroma of spices and the joy of shared meals ignited my love for food.
            </p>
            <p className="text-stone-600 leading-relaxed">
              Here at Zaika, I share my favorite recipes, from timeless Indian classics to modern continental dishes. My philosophy is simple: use fresh ingredients, honor traditional techniques, and don't be afraid to experiment. Let's cook together!
            </p>
          </div>
          <div className="order-1 md:order-2">
            <img
              src="https://images.unsplash.com/photo-1583162094738-05cb6278f16f?q=80&w=1887&auto=format&fit=crop"
              alt="Chef Shahana"
              className="rounded-lg shadow-xl w-full h-auto object-cover aspect-square"
            />
          </div>
        </div>
      </section>

      {/* Featured Recipes Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-red-900 mb-12">Featured Recipes</h2>
          {isLoading ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                        <Skeleton className="h-48 w-full" />
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                    </div>
                ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredRecipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}
          <div className="text-center mt-12">
            <Link to="/recipes">
              <Button size="lg" className="bg-red-800 hover:bg-red-900 text-white">
                View All Recipes
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;