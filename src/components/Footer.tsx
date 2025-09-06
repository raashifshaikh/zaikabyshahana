import { useState } from "react";
import { Instagram, Youtube, Facebook } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { showSuccess } from "@/utils/toast";
import logo from "@/assets/logo.png";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      showSuccess("Thank you for subscribing!");
      setEmail("");
    }
  };

  return (
    <footer className="bg-stone-100 dark:bg-stone-900 border-t">
      <div className="container py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <Link to="/" className="flex items-center space-x-2 mb-4">
            <img src={logo} alt="Zaika by Shahana Logo" className="h-16" />
          </Link>
          <p className="text-stone-600 dark:text-stone-400">
            Delicious Recipes, Made Simple.
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-stone-500 hover:text-red-800">
              <Instagram />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-stone-500 hover:text-red-800">
              <Youtube />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-stone-500 hover:text-red-800">
              <Facebook />
            </a>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/recipes" className="text-stone-600 hover:text-red-800">Recipes</Link></li>
            <li><Link to="/about" className="text-stone-600 hover:text-red-800">About</Link></li>
            <li><Link to="/blog" className="text-stone-600 hover:text-red-800">Blog</Link></li>
            <li><Link to="/contact" className="text-stone-600 hover:text-red-800">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Subscribe to our Newsletter</h3>
          <p className="text-stone-600 dark:text-stone-400 mb-4">
            Get the latest recipes and cooking tips delivered to your inbox.
          </p>
          <form className="flex space-x-2" onSubmit={handleSubscribe}>
            <Input 
              type="email" 
              placeholder="Your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" className="bg-red-800 hover:bg-red-900">Subscribe</Button>
          </form>
        </div>
      </div>
      <div className="bg-stone-200 dark:bg-stone-800 py-4">
        <div className="container text-center text-sm text-stone-500">
          © {new Date().getFullYear()} Zaika by Shahana. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;