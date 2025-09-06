import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ChefHat } from "lucide-react";
import { Link } from "react-router-dom";
import { Recipe } from "@/data/recipes";

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  return (
    <Link to={`/recipes/${recipe.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="p-0">
          <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
        </CardHeader>
        <CardContent className="p-6">
          <Badge variant="secondary" className="mb-2">{recipe.category}</Badge>
          <CardTitle className="mb-2 text-lg">{recipe.title}</CardTitle>
          <div className="flex justify-between items-center text-sm text-stone-600">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{recipe.time} min</span>
            </div>
            <div className="flex items-center gap-2">
              <ChefHat className="h-4 w-4" />
              <span>{recipe.difficulty}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RecipeCard;