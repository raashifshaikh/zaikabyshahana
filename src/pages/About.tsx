import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { UtensilsCrossed, Heart, BookOpen } from "lucide-react";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen bg-amber-50 text-stone-800">
      <Header />
      <main className="flex-grow">
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
          <div className="container mx-auto grid md:grid-cols-5 gap-12 items-center">
            <div className="md:col-span-2">
              <img
                src="https://images.unsplash.com/photo-1583162094738-05cb6278f16f?q=80&w=1887&auto=format&fit=crop"
                alt="Chef Shahana"
                className="rounded-lg shadow-xl w-full h-auto object-cover aspect-[4/5]"
              />
            </div>
            <div className="md:col-span-3">
              <h2 className="text-3xl font-bold text-red-900 mb-4">My Culinary Journey</h2>
              <p className="text-stone-600 mb-4 leading-relaxed">
                Hello and welcome to Zaika! I'm Shahana, and my love for cooking is a story that begins in the heart of my family's home. I grew up surrounded by the rich aromas and vibrant flavors of my grandmother's kitchen. She taught me that food is more than just sustenance; it's a language of love, a way to bring people together, and a celebration of our heritage.
              </p>
              <p className="text-stone-600 mb-6 leading-relaxed">
                What started as a childhood fascination has blossomed into a lifelong passion. I've spent years honing my skills, experimenting with ingredients, and exploring cuisines from around the world. Zaika is my personal collection of recipes, a place where I share both cherished family secrets and modern culinary creations. My goal is to demystify cooking and empower you to create delicious, wholesome meals in your own kitchen.
              </p>
              
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
      </main>
      <Footer />
    </div>
  );
};

export default About;