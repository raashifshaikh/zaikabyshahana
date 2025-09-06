import { Link } from "react-router-dom";
import { CookingPot, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/recipes", label: "Recipes" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/videos", label: "Videos" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <CookingPot className="h-6 w-6 text-red-800" />
          <span className="font-bold">Zaika by Shahana</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <Link to="/" className="mr-6 flex items-center space-x-2 mb-6">
                <CookingPot className="h-6 w-6 text-red-800" />
                <span className="font-bold">Zaika by Shahana</span>
              </Link>
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="transition-colors hover:text-foreground/80 text-foreground/60"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;