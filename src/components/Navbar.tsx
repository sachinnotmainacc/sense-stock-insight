
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LineChart, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-darkbg/90 backdrop-blur-md py-3 shadow-lg"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center space-x-2 font-grotesk text-xl font-bold"
        >
          <span className="text-gradient-purple">NewsSense</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link 
                  to="/" 
                  className={`px-2 py-2 text-sm transition-colors hover:text-white ${
                    location.pathname === "/" 
                      ? "text-white font-medium" 
                      : "text-white/70"
                  }`}
                >
                  Home
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link 
                  to="/chat" 
                  className={`px-2 py-2 text-sm transition-colors hover:text-white flex items-center ${
                    location.pathname === "/chat" 
                      ? "text-white font-medium" 
                      : "text-white/70"
                  }`}
                >
                  <MessageSquare className="h-4 w-4 mr-1" />
                  AI Chat
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <Button asChild variant="secondary" className="bg-neon-purple text-white hover:bg-neon-purple/80">
            <Link to="/chat" className="flex items-center">
              <LineChart className="h-4 w-4 mr-2" />
              Stock Analysis
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            className="text-white"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-darkbg/95 backdrop-blur-md shadow-lg py-4 animate-fade-in">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <Link
              to="/"
              className={`px-4 py-3 hover:bg-white/5 rounded-md transition-colors ${
                location.pathname === "/" ? "bg-white/10 text-white" : "text-gray-300"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/chat"
              className={`px-4 py-3 hover:bg-white/5 rounded-md transition-colors ${
                location.pathname === "/chat" ? "bg-white/10 text-white" : "text-gray-300"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              AI Chat
            </Link>
            <Link
              to="/chat"
              className="px-4 py-3 bg-neon-purple text-white rounded-md hover:bg-neon-purple/80 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Stock Analysis
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
