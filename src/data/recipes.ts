export interface Recipe {
  id: string;
  title: string;
  image: string;
  category?: string;
  area?: string; // e.g., Italian, Canadian
  tags?: string[];
  description?: string;
  ingredients?: { quantity: string; name: string }[];
  instructions?: string[];
  youtubeUrl?: string;
}