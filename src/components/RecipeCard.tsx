import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Utensils } from "lucide-react";
import { Link } from "react-router-dom";
import { Recipe } from "@/data/recipes";

interface RecipeCardProps {
  recipe: Recipe;
  index: number;
}

const RecipeCard = ({ recipe, index }: RecipeCardProps) => {
  return (
    <Link 
      to={`/recipes/${recipe.id}`} 
      className="block animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <Card className="overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group h-full">
        <CardHeader className="p-0 overflow-hidden">
          <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
        </CardHeader>
        <CardContent className="p-6">
          {recipe.category && <Badge variant="secondary" className="mb-2">{recipe.category}</Badge>}
          <CardTitle className="mb-2 text-lg">{recipe.title}</CardTitle>
          {recipe.area && (
            <div className="flex items-center text-sm text-stone-600">
              <Utensils className="h-4 w-4 mr-2" />
              <span>{recipe.area} Cuisine</span>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default RecipeCard;