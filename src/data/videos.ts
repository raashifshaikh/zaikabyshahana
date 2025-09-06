export interface Video {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  videoId: string; // YouTube video ID for embedding
}

export const videos: Video[] = [
  {
    id: 1,
    title: "How to Make Homemade Pasta",
    description: "Learn the simple steps to create fresh, delicious pasta from scratch in your own kitchen.",
    thumbnail: "https://i.ytimg.com/vi/m_x6s-Y2_aE/maxresdefault.jpg",
    videoId: "m_x6s-Y2_aE",
  },
  {
    id: 2,
    title: "Quick & Easy Weeknight Stir-fry",
    description: "Whip up a healthy and flavorful stir-fry in under 20 minutes with this easy-to-follow recipe.",
    thumbnail: "https://i.ytimg.com/vi/kL3v-S_n5_s/maxresdefault.jpg",
    videoId: "kL3v-S_n5_s",
  },
  {
    id: 3,
    title: "Baking the Perfect Sourdough",
    description: "A beginner's guide to baking a beautiful loaf of sourdough bread with a crispy crust and soft interior.",
    thumbnail: "https://i.ytimg.com/vi/bSYdABrP_iM/maxresdefault.jpg",
    videoId: "bSYdABrP_iM",
  },
  {
    id: 4,
    title: "The Ultimate Chocolate Chip Cookies",
    description: "Discover the secrets to making chewy, gooey, and absolutely perfect chocolate chip cookies every time.",
    thumbnail: "https://i.ytimg.com/vi/uz3CzpLdZ7k/maxresdefault.jpg",
    videoId: "uz3CzpLdZ7k",
  },
];