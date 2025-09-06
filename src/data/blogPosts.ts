export interface BlogPost {
  id: number;
  title: string;
  image: string;
  author: string;
  date: string;
  excerpt: string;
  content: string[]; // Array of paragraphs
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Art of Spice Blending",
    image: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?q=80&w=2070&auto=format&fit=crop",
    author: "Shahana",
    date: "October 12, 2023",
    excerpt: "Unlock the secrets to creating your own signature spice blends. Learn how to balance flavors and elevate your dishes from simple to spectacular.",
    content: [
      "Spices are the heart and soul of cooking, transforming ordinary ingredients into extraordinary culinary experiences. The art of blending spices is a skill that has been passed down through generations, and with a little knowledge, you can master it too.",
      "The key to a great spice blend is balance. You want a harmonious mix of flavors—sweet, savory, spicy, and earthy. Start with a base of common spices like cumin, coriander, and turmeric. Then, add accent spices like cinnamon, cloves, or cardamom for warmth and complexity. For a bit of heat, a pinch of cayenne or red chili flakes can work wonders.",
      "Don't be afraid to experiment. Toasting your whole spices before grinding them can release their essential oils and intensify their aroma. Store your blends in airtight containers away from light and heat to preserve their freshness. With these tips, you'll be creating your own unique spice blends in no time, adding a personal touch to every meal you cook."
    ],
  },
  {
    id: 2,
    title: "Mastering the Perfect Dough",
    image: "https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?q=80&w=2070&auto=format&fit=crop",
    author: "Shahana",
    date: "September 28, 2023",
    excerpt: "From pizza to bread, a perfect dough is the foundation of many beloved recipes. This guide will walk you through the essential techniques for success.",
    content: [
      "Working with dough can seem intimidating, but it's a deeply rewarding process. The transformation of simple flour and water into a soft, pliable dough is nothing short of magical. The first step is choosing the right flour. All-purpose flour is versatile, but for bread, a high-protein bread flour will give you a better chew.",
      "Kneading is crucial for developing gluten, which gives the dough its structure and elasticity. You can knead by hand on a lightly floured surface or use a stand mixer with a dough hook. Knead until the dough is smooth and elastic—it should spring back when you press it.",
      "Proofing, or letting the dough rise, is where the yeast does its work. Find a warm, draft-free spot in your kitchen and let the dough double in size. This process develops flavor and creates a light, airy texture. Patience is key here, so give your dough the time it needs to shine."
    ],
  },
  {
    id: 3,
    title: "A Guide to Healthy Meal Prep",
    image: "https://images.unsplash.com/photo-1543353071-873f6b6a6a89?q=80&w=2070&auto=format&fit=crop",
    author: "Shahana",
    date: "September 15, 2023",
    excerpt: "Save time, eat healthier, and reduce stress with our ultimate guide to meal prepping. Plan your week's meals like a pro.",
    content: [
      "Meal prepping is a game-changer for anyone with a busy schedule. By dedicating a few hours on the weekend, you can set yourself up for a week of delicious, healthy, and home-cooked meals. The first step is to plan your menu. Think about what you'd like to eat for breakfast, lunch, and dinner, and make a grocery list.",
      "Focus on versatile components that can be mixed and matched. Cook a big batch of a grain like quinoa or brown rice. Roast a tray of mixed vegetables. Grill some chicken or bake some tofu. These can be assembled into salads, bowls, or wraps throughout the week.",
      "Invest in good quality food storage containers to keep your prepped food fresh. Glass containers are a great option as they are durable and don't absorb odors. Label everything with the date it was made. With a little planning, you'll find that meal prepping makes your weeks smoother and your meals more enjoyable."
    ],
  },
];