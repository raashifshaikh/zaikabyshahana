export interface Recipe {
  id: number;
  title: string;
  image: string;
  category?: string;
  time?: number; // in minutes
  difficulty?: "Easy" | "Medium" | "Hard";
  servings?: number;
  description?: string;
  ingredients?: { quantity: string; name: string }[];
  instructions?: string[];
}