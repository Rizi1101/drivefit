
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center" 
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
            filter: "brightness(0.7)"
          }}
        ></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-24 md:py-32 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
          Find Your Perfect Drive with DriveFit
        </h1>
        <p className="text-xl text-white max-w-2xl mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          Buy and sell vehicles with confidence. Get personalized recommendations and secure transactions all in one place.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <Button className="btn-primary text-lg px-8 py-6">
            <Search className="mr-2 h-5 w-5" /> Find Vehicles
          </Button>
          <Button variant="outline" className="bg-white bg-opacity-20 backdrop-blur-sm text-lg px-8 py-6">
            Sell Your Vehicle
          </Button>
        </div>
        
        <div className="mt-16 w-full max-w-3xl glass-effect rounded-xl p-6 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white bg-opacity-90 rounded-lg p-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type</label>
              <select className="w-full p-2 border border-gray-300 rounded-md">
                <option>All Types</option>
                <option>Car</option>
                <option>SUV</option>
                <option>Truck</option>
                <option>Van</option>
              </select>
            </div>
            <div className="bg-white bg-opacity-90 rounded-lg p-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
              <select className="w-full p-2 border border-gray-300 rounded-md">
                <option>Any Price</option>
                <option>Under $10,000</option>
                <option>$10,000 - $20,000</option>
                <option>$20,000 - $30,000</option>
                <option>$30,000+</option>
              </select>
            </div>
            <div className="md:col-span-1 flex">
              <Button className="btn-secondary w-full">Search</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
