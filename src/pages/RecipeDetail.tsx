import { useParams } from "react-router-dom";
import { recipes } from "@/data/recipes";
import { Clock, ChefHat, Users, Printer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import NotFound from "./NotFound";

const RecipeDetail = () => {
  const { id } = useParams();
  const recipe = recipes.find((r) => r.id === Number(id));

  if (!recipe) {
    return <NotFound />;
  }

  return (
    <div className="bg-white text-stone-800">
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Title and Category */}
          <h1 className="text-4xl font-bold text-red-900 mb-2">{recipe.title}</h1>
          <Badge variant="secondary" className="mb-6">{recipe.category}</Badge>

          {/* Image */}
          <img src={recipe.image} alt={recipe.title} className="w-full h-96 object-cover rounded-lg shadow-lg mb-8" />

          {/* Meta Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-8 p-4 bg-amber-50 rounded-lg">
            <div className="flex flex-col items-center">
              <Clock className="h-6 w-6 mb-1 text-red-800" />
              <span className="font-semibold">Time</span>
              <span>{recipe.time} min</span>
            </div>
            <div className="flex flex-col items-center">
              <ChefHat className="h-6 w-6 mb-1 text-red-800" />
              <span className="font-semibold">Difficulty</span>
              <span>{recipe.difficulty}</span>
            </div>
            <div className="flex flex-col items-center">
              <Users className="h-6 w-6 mb-1 text-red-800" />
              <span className="font-semibold">Servings</span>
              <span>{recipe.servings}</span>
            </div>
            <div className="flex flex-col items-center justify-center">
               <Button variant="ghost" onClick={() => window.print()}>
                <Printer className="h-6 w-6 text-red-800" />
                <span className="ml-2">Print</span>
              </Button>
            </div>
          </div>
          
          <p className="text-stone-600 text-lg mb-8">{recipe.description}</p>

          {/* Ingredients and Instructions */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <h2 className="text-2xl font-bold text-red-900 mb-4 border-b-2 border-red-800 pb-2">Ingredients</h2>
              <ul className="space-y-2">
                {recipe.ingredients.map((ing, index) => (
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
                {recipe.instructions.map((step, index) => (
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