import { UtensilsCrossed, Heart, BookOpen } from "lucide-react";
import SEO from "@/components/SEO";

const About = () => {
  return (
    <>
      <SEO 
        title="About Shahana"
        description="Learn more about Shahana, a passionate 22-year-old teacher and home cook sharing her love for desi food and simple, delicious recipes."
      />
      <div>
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 bg-cover bg-center text-white" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1495195129352-aeb3c65e5885?q=80&w=2070&auto=format&fit=crop')" }}>
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="container relative mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">About Shahana</h1>
            <p className="mt-4 text-lg md:text-xl text-amber-100">
              Sharing the joy of cooking, one recipe at a time.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-red-900 mb-4">Hi, I’m Shahana 👩‍🍳✨</h2>
              <p className="text-stone-600 mb-4 leading-relaxed text-left">
                I’m 22 years old, a full-time teacher by profession and a passionate cook at heart. Cooking has always been more than just a hobby for me—it’s my way of expressing creativity, love, and culture.
              </p>
              <p className="text-stone-600 mb-4 leading-relaxed text-left">
                While I spend most of my day teaching, I dedicate my free time to experimenting in the kitchen, discovering flavors, and sharing recipes that bring people together. Among all dishes, chicken recipes hold a special place in my heart—from spicy curries to flavorful biryanis, I love exploring new ways to make them delicious.
              </p>
              <p className="text-stone-600 mb-6 leading-relaxed text-left">
                Through Zaika by Shahana, I want to share my journey, my favorite recipes, and my love for desi food with the world. Whether you’re a beginner or an experienced foodie, I hope you’ll find inspiration here to create meals that not only taste good but also make memories.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto mt-16">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                <div className="p-4 rounded-lg">
                  <UtensilsCrossed className="h-10 w-10 mx-auto mb-3 text-red-800" />
                  <h3 className="font-semibold text-lg">Our Philosophy</h3>
                  <p className="text-sm text-stone-600">Fresh ingredients and simple techniques to create extraordinary flavors.</p>
                </div>
                <div className="p-4 rounded-lg">
                  <Heart className="h-10 w-10 mx-auto mb-3 text-red-800" />
                  <h3 className="font-semibold text-lg">Made with Love</h3>
                  <p className="text-sm text-stone-600">Every recipe is tested and perfected with passion and care.</p>
                </div>
                <div className="p-4 rounded-lg">
                  <BookOpen className="h-10 w-10 mx-auto mb-3 text-red-800" />
                  <h3 className="font-semibold text-lg">For Every Cook</h3>
                  <p className="text-sm text-stone-600">Whether you're a beginner or a pro, you'll find something to inspire you.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;