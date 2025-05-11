
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? "text-drivefit-red font-medium" : "";
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white bg-opacity-80 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-drivefit-blue">Drive<span className="text-drivefit-red">Fit</span></span>
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
          <Link to="/vehicles">
            <Button variant="ghost" size="sm">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </Link>
          <Link to="/signin">
            <Button variant="outline" size="sm">Sign In</Button>
          </Link>
          <Link to="/signup">
            <Button className="btn-primary bg-drivefit-blue hover:bg-drivefit-blue/90 text-white" size="sm">Sign Up</Button>
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
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
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white bg-opacity-90 backdrop-blur-md">
            <Link to="/" className={`nav-link block px-3 py-2 rounded-md ${isActive("/")}`}>Home</Link>
            <Link to="/vehicles" className={`nav-link block px-3 py-2 rounded-md ${isActive("/vehicles")}`}>Buy</Link>
            <Link to="/sell" className={`nav-link block px-3 py-2 rounded-md ${isActive("/sell")}`}>Sell</Link>
            <Link to="/about" className={`nav-link block px-3 py-2 rounded-md ${isActive("/about")}`}>About</Link>
            <Link to="/contact" className={`nav-link block px-3 py-2 rounded-md ${isActive("/contact")}`}>Contact</Link>
            <div className="flex flex-col space-y-2 mt-4 px-3">
              <Link to="/signin">
                <Button variant="outline" size="sm" className="w-full">Sign In</Button>
              </Link>
              <Link to="/signup">
                <Button className="btn-primary bg-drivefit-blue hover:bg-drivefit-blue/90 text-white w-full" size="sm">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
