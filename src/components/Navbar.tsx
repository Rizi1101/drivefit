
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Search, User, LogOut } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      setIsLoggedIn(true);
      // Extract username from email or use stored name if available
      const storedName = localStorage.getItem("userName");
      if (storedName) {
        setUserName(storedName);
      } else {
        setUserName(userEmail.split('@')[0]);
      }
    } else {
      setIsLoggedIn(false);
      setUserName("");
    }
  }, [location.pathname]);
  
  const isActive = (path: string) => {
    return location.pathname === path ? "text-drivefit-red font-medium" : "";
  };

  const handleSignOut = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    setUserName("");
    toast({
      title: "Signed Out",
      description: "You have been successfully signed out."
    });
    navigate("/");
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/vehicles?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white bg-opacity-80 dark:bg-black/50 dark:border-gray-800 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-drivefit-blue dark:text-drivefit-blue">Drive<span className="text-drivefit-red">Fit</span></span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className={`nav-link ${isActive("/")}`}>Home</Link>
          <Link to="/vehicles" className={`nav-link ${isActive("/vehicles")}`}>Buy</Link>
          <Link to="/sell" className={`nav-link ${isActive("/sell")}`}>Sell</Link>
          <Link to="/about" className={`nav-link ${isActive("/about")}`}>About</Link>
          <Link to="/contact" className={`nav-link ${isActive("/contact")}`}>Contact</Link>
        </nav>
        
        <div className="hidden md:flex items-center space-x-4">
          {/* Theme Toggle */}
          <ThemeToggle />
          
          {/* Search form */}
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search vehicles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="py-1 px-3 pr-8 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-drivefit-blue focus:border-transparent"
            />
            <button 
              type="submit" 
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-drivefit-blue"
            >
              <Search className="h-4 w-4" />
            </button>
          </form>

          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {userName}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/signin">
                <Button variant="outline" size="sm">Sign In</Button>
              </Link>
              <Link to="/signup">
                <Button className="btn-primary bg-drivefit-blue hover:bg-drivefit-blue/90 text-white" size="sm">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden flex items-center space-x-2">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {isOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-black bg-opacity-90 backdrop-blur-md">
            <form onSubmit={handleSearch} className="relative px-3 mb-2">
              <input
                type="text"
                placeholder="Search vehicles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-1 px-3 pr-8 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-drivefit-blue focus:border-transparent"
              />
              <button 
                type="submit" 
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-drivefit-blue"
              >
                <Search className="h-4 w-4" />
              </button>
            </form>
            
            <Link to="/" className={`nav-link block px-3 py-2 rounded-md ${isActive("/")}`}>Home</Link>
            <Link to="/vehicles" className={`nav-link block px-3 py-2 rounded-md ${isActive("/vehicles")}`}>Buy</Link>
            <Link to="/sell" className={`nav-link block px-3 py-2 rounded-md ${isActive("/sell")}`}>Sell</Link>
            <Link to="/about" className={`nav-link block px-3 py-2 rounded-md ${isActive("/about")}`}>About</Link>
            <Link to="/contact" className={`nav-link block px-3 py-2 rounded-md ${isActive("/contact")}`}>Contact</Link>
            
            <div className="flex flex-col space-y-2 mt-4 px-3">
              {isLoggedIn ? (
                <>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full flex items-center justify-center"
                    onClick={() => navigate("/dashboard")}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    className="w-full flex items-center justify-center"
                    onClick={handleSignOut}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/signin">
                    <Button variant="outline" size="sm" className="w-full">Sign In</Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="btn-primary bg-drivefit-blue hover:bg-drivefit-blue/90 text-white w-full" size="sm">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
