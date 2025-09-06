import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-amber-50 text-stone-800">
      <Header />
      <main className="flex-grow">
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
              <Button size="lg" variant="outline" className="border-white bg-transparent hover:bg-white hover:text-red-800">
                Ask the Cooking Bot
              </Button>
            </div>
          </div>
        </section>

        {/* About Shahana Section */}
        <section className="py-16 md:py-24 bg-white">
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
        <section className="py-16 md:py-24 bg-amber-50">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center text-red-900 mb-12">Featured Recipes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Placeholder Recipe Cards */}
              <Card className="overflow-hidden">
                <CardHeader className="p-0">
                  <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop" alt="Recipe 1" className="w-full h-48 object-cover" />
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="mb-2">Spicy Chicken Curry</CardTitle>
                  <p className="text-stone-600">A rich and aromatic curry that's perfect for a family dinner.</p>
                </CardContent>
              </Card>
              <Card className="overflow-hidden">
                <CardHeader className="p-0">
                  <img src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1887&auto=format&fit=crop" alt="Recipe 2" className="w-full h-48 object-cover" />
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="mb-2">Continental Salad</CardTitle>
                  <p className="text-stone-600">A fresh and healthy salad with a zesty vinaigrette.</p>
                </CardContent>
              </Card>
              <Card className="overflow-hidden">
                <CardHeader className="p-0">
                  <img src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=1980&auto=format&fit=crop" alt="Recipe 3" className="w-full h-48 object-cover" />
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="mb-2">Pancakes with Berries</CardTitle>
                  <p className="text-stone-600">Fluffy pancakes topped with fresh berries and maple syrup.</p>
                </CardContent>
              </Card>
            </div>
            <div className="text-center mt-12">
              <Link to="/recipes">
                <Button size="lg" className="bg-red-800 hover:bg-red-900 text-white">
                  View All Recipes
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;