import SEO from "@/components/SEO";
import { Award, BookOpen, Heart } from "lucide-react";

const About = () => {
  return (
    <>
      <SEO 
        title="About"
        description="Learn more about Shahana, the passionate cook and full-time teacher behind ZaikabyShahana. Discover her story, mission, and love for desi food."
      />
      <div className="bg-amber-50 text-stone-800">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-cover bg-center text-white" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556909211-3a4871a0a081?q=80&w=2070&auto=format&fit=crop')" }}>
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="container relative mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">About Shahana</h1>
            <p className="mt-4 text-lg md:text-xl text-amber-100">
              The heart and soul behind the recipes.
            </p>
          </div>
        </section>

        {/* My Story Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-red-900 mb-4">My Culinary Journey</h2>
              <p className="text-stone-600 mb-4 leading-relaxed">
                Hello and welcome to my corner of the internet! I'm Shahana, a full-time teacher by profession, but my heart truly belongs in the kitchen. For me, cooking is more than just preparing a meal; it's a form of art, a way to express love, and a bridge that connects me to my roots.
              </p>
              <p className="text-stone-600 mb-4 leading-relaxed">
                Growing up, I was always fascinated by the aromas and flavors wafting from my family's kitchen. I learned the secrets of traditional desi cooking from my mother and grandmother, and over the years, I've added my own modern twists to these cherished recipes.
              </p>
              <p className="text-stone-600 leading-relaxed">
                ZaikabyShahana was born out of a desire to share this passion with you. It's a place where I document my culinary adventures, from timeless classics to new experiments.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-xl">
              <img
                src="https://i.postimg.cc/tZy1x4jT/zaikabyshahana-high-resolution-logo-transparent.png"
                alt="ZaikabyShahana Logo"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </section>

        {/* My Philosophy Section */}
        <section className="py-16 md:py-24 bg-amber-50">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold text-red-900 mb-12">My Cooking Philosophy</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6">
                <Heart className="h-12 w-12 text-red-800 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-stone-900 mb-2">Cook with Love</h3>
                <p className="text-stone-600">The best ingredient you can add to any dish is love. I believe that food made with passion always tastes better.</p>
              </div>
              <div className="p-6">
                <BookOpen className="h-12 w-12 text-red-800 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-stone-900 mb-2">Keep it Simple</h3>
                <p className="text-stone-600">Delicious food doesn't have to be complicated. My recipes are designed to be easy to follow, for cooks of all skill levels.</p>
              </div>
              <div className="p-6">
                <Award className="h-12 w-12 text-red-800 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-stone-900 mb-2">Authentic Flavors</h3>
                <p className="text-stone-600">I strive to honor the rich heritage of desi cuisine by staying true to the authentic flavors that make it so special.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;