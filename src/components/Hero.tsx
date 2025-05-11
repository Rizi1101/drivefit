
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [vehicleType, setVehicleType] = useState("All Types");
  const [priceRange, setPriceRange] = useState("Any Price");
  const [year, setYear] = useState("Any Year");
  const navigate = useNavigate();
  
  const handleSearch = () => {
    toast({
      title: "Search initiated",
      description: `Searching for ${vehicleType} vehicles from ${year} in price range: ${priceRange}`,
    });
    
    // Construct query parameters for the search
    const params = new URLSearchParams();
    if (vehicleType !== "All Types") params.set("type", vehicleType);
    if (priceRange !== "Any Price") params.set("price", priceRange);
    if (year !== "Any Year") params.set("year", year);
    
    // Navigate to the search page with filters applied
    navigate(`/vehicles?${params.toString()}`);
  };

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
          Find Your Perfect Drive with DriveFit Pakistan
        </h1>
        <p className="text-xl text-white max-w-2xl mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          Buy and sell vehicles with confidence. Get personalized recommendations for Pakistani vehicles and secure transactions all in one place.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <Button 
            className="btn-primary text-lg px-8 py-6" 
            onClick={() => {
              navigate("/vehicles");
              toast({ title: "Find Vehicles", description: "Redirecting to vehicle search page" });
            }}
          >
            <Search className="mr-2 h-5 w-5" /> Find Vehicles
          </Button>
          <Button 
            variant="outline" 
            className="bg-white bg-opacity-20 backdrop-blur-sm text-lg px-8 py-6"
            onClick={() => {
              navigate("/sell");
              toast({ title: "Sell Your Vehicle", description: "Redirecting to vehicle listing page" });
            }}
          >
            Sell Your Vehicle
          </Button>
        </div>
        
        <div className="mt-16 w-full max-w-3xl glass-effect rounded-xl p-6 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white bg-opacity-90 rounded-lg p-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type</label>
              <select 
                className="w-full p-2 border border-gray-300 rounded-md"
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
              >
                <option>All Types</option>
                <option>Sedan</option>
                <option>Hatchback</option>
                <option>SUV</option>
                <option>Crossover</option>
                <option>Pickup</option>
                <option>Van</option>
              </select>
            </div>
            <div className="bg-white bg-opacity-90 rounded-lg p-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
              <select 
                className="w-full p-2 border border-gray-300 rounded-md"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
              >
                <option>Any Price</option>
                <option>Under PKR 1,000,000</option>
                <option>PKR 1,000,000 - 2,000,000</option>
                <option>PKR 2,000,000 - 4,000,000</option>
                <option>PKR 4,000,000 - 6,000,000</option>
                <option>PKR 6,000,000+</option>
              </select>
            </div>
            <div className="bg-white bg-opacity-90 rounded-lg p-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
              <select 
                className="w-full p-2 border border-gray-300 rounded-md"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              >
                <option>Any Year</option>
                <option>2023</option>
                <option>2022</option>
                <option>2021</option>
                <option>2020</option>
                <option>2019</option>
                <option>2018</option>
                <option>2017</option>
                <option>2016</option>
                <option>2015</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <Button 
              className="w-full md:w-auto bg-drivefit-blue hover:bg-blue-700 text-white py-3 px-6 rounded-md"
              onClick={handleSearch}
            >
              Search Vehicles
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
