import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, MessageSquare, Home, Newspaper, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-darkbg border-b border-white/10 h-16">
        <div className="container px-4 mx-auto max-w-7xl flex items-center justify-between h-full">
          <div className="flex items-center gap-2">
            <Link to="/" className="text-xl font-grotesk font-bold text-white">
              <span className="text-gradient-purple">NewsSense</span>
            </Link>
            <div className="hidden md:flex items-center space-x-1 ml-6">
              <Link to="/">
                <Button 
                  variant={isActive("/") ? "secondary" : "ghost"} 
                  size="sm" 
                  className="text-sm"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Button>
              </Link>
              <Link to="/chat">
                <Button 
                  variant={isActive("/chat") ? "secondary" : "ghost"} 
                  size="sm" 
                  className="text-sm"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Chat
                </Button>
              </Link>
              <Link to="/news">
                <Button 
                  variant={isActive("/news") ? "secondary" : "ghost"} 
                  size="sm" 
                  className="text-sm"
                >
                  <Newspaper className="h-4 w-4 mr-2" />
                  News
                </Button>
              </Link>
            </div>
          </div>

          <div>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <div className="hidden md:flex items-center space-x-2">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white text-sm flex items-center"
              >
                <Info className="h-4 w-4 mr-1" />
                About
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-darkbg pt-16">
          <div className="container px-4 py-6 mx-auto">
            <nav className="flex flex-col space-y-4">
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                <Button 
                  variant={isActive("/") ? "secondary" : "ghost"} 
                  size="lg" 
                  className="w-full justify-start"
                >
                  <Home className="h-5 w-5 mr-3" />
                  Home
                </Button>
              </Link>
              <Link to="/chat" onClick={() => setIsMenuOpen(false)}>
                <Button 
                  variant={isActive("/chat") ? "secondary" : "ghost"} 
                  size="lg" 
                  className="w-full justify-start"
                >
                  <MessageSquare className="h-5 w-5 mr-3" />
                  Chat
                </Button>
              </Link>
              <Link to="/news" onClick={() => setIsMenuOpen(false)}>
                <Button 
                  variant={isActive("/news") ? "secondary" : "ghost"} 
                  size="lg" 
                  className="w-full justify-start"
                >
                  <Newspaper className="h-5 w-5 mr-3" />
                  News
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
