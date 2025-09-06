export interface Recipe {
  id: number;
  title: string;
  image: string;
  category: string;
  time: number; // in minutes
  difficulty: "Easy" | "Medium" | "Hard";
  servings: number;
  description: string;
  ingredients: { quantity: string; name: string }[];
  instructions: string[];
}

export const recipes: Recipe[] = [
  {
    id: 1,
    title: "Spicy Chicken Curry",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop",
    category: "Indian",
    time: 45,
    difficulty: "Medium",
    servings: 4,
    description: "A rich and aromatic chicken curry with a perfect blend of spices, perfect for a hearty family dinner.",
    ingredients: [
      { quantity: "1 lb", name: "Chicken, cut into pieces" },
      { quantity: "2", name: "Onions, finely chopped" },
      { quantity: "2", name: "Tomatoes, pureed" },
      { quantity: "1 tbsp", name: "Ginger-garlic paste" },
      { quantity: "1 tsp", name: "Turmeric powder" },
      { quantity: "2 tsp", name: "Red chili powder" },
      { quantity: "1 tsp", name: "Garam masala" },
      { quantity: "1/2 cup", name: "Yogurt" },
      { quantity: "2 tbsp", name: "Oil" },
      { quantity: "to taste", name: "Salt" },
    ],
    instructions: [
      "Heat oil in a pan and sauté the onions until golden brown.",
      "Add ginger-garlic paste and cook for a minute.",
      "Add the tomato puree, turmeric, chili powder, and salt. Cook until the oil separates.",
      "Whisk the yogurt and add it to the pan. Cook for 5 minutes.",
      "Add the chicken pieces and coat them well with the masala.",
      "Add 1 cup of water, cover, and cook until the chicken is tender.",
      "Sprinkle with garam masala and serve hot.",
    ],
  },
  {
    id: 2,
    title: "Continental Salad",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1887&auto=format&fit=crop",
    category: "Continental",
    time: 15,
    difficulty: "Easy",
    servings: 2,
    description: "A fresh and healthy salad with a zesty vinaigrette, perfect for a light lunch or as a side dish.",
    ingredients: [
        { quantity: "1 head", name: "Lettuce, torn" },
        { quantity: "1", name: "Cucumber, sliced" },
        { quantity: "1 cup", name: "Cherry tomatoes, halved" },
        { quantity: "1/4", name: "Red onion, thinly sliced" },
        { quantity: "1/2 cup", name: "Feta cheese, crumbled" },
        { quantity: "3 tbsp", name: "Olive oil" },
        { quantity: "1 tbsp", name: "Lemon juice" },
        { quantity: "to taste", name: "Salt and pepper" },
    ],
    instructions: [
        "In a large bowl, combine the lettuce, cucumber, cherry tomatoes, and red onion.",
        "In a small bowl, whisk together the olive oil, lemon juice, salt, and pepper to make the dressing.",
        "Pour the dressing over the salad and toss to combine.",
        "Sprinkle with feta cheese before serving.",
    ],
  },
  // Add more recipes here following the same structure
];