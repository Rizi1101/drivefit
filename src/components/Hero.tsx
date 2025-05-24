
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Search, Shield, TrendingUp } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();
  
  const handleExplore = () => {
    navigate("/vehicles");
  };
  
  return (
    <section className="relative min-h-[85vh] bg-gradient-to-br from-drivefit-blue via-drivefit-black to-drivefit-orange flex items-center overflow-hidden">
      {/* Enhanced overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/60 z-10"></div>
      
      <div className="container mx-auto px-6 relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Enhanced heading with better contrast */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 drop-shadow-2xl leading-tight">
            Find Your Perfect
            <span className="block text-drivefit-orange drop-shadow-xl bg-gradient-to-r from-drivefit-orange to-yellow-400 bg-clip-text text-transparent font-extrabold">
              Dream Car
            </span>
          </h1>
          
          {/* Enhanced subtitle with better readability */}
          <p className="text-xl md:text-2xl lg:text-3xl text-white mb-8 drop-shadow-lg max-w-3xl mx-auto font-medium leading-relaxed bg-black/30 backdrop-blur-sm rounded-lg p-4">
            Browse thousands of verified vehicles with transparent pricing and trusted sellers across Pakistan
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-drivefit-orange text-white hover:bg-drivefit-orange/90 px-8 py-4 text-lg font-semibold shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-drivefit-orange hover:border-yellow-400"
              onClick={handleExplore}
            >
              <Search className="mr-2 h-5 w-5" />
              Explore Vehicles
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/20 backdrop-blur-md text-white border-white/40 hover:bg-white/30 px-8 py-4 text-lg font-semibold shadow-2xl transform hover:scale-105 transition-all duration-300"
              onClick={() => navigate("/sell")}
            >
              <TrendingUp className="mr-2 h-5 w-5" />
              Sell Your Car
            </Button>
          </div>

          {/* Enhanced trust indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="bg-white/15 backdrop-blur-lg rounded-xl p-6 border border-white/30 shadow-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <Shield className="h-10 w-10 text-drivefit-orange mx-auto mb-4 drop-shadow-lg" />
              <h3 className="text-white font-bold text-lg mb-2 drop-shadow-md">Verified Sellers</h3>
              <p className="text-white/90 text-sm drop-shadow-sm">All sellers are verified for your safety and trust</p>
            </div>
            <div className="bg-white/15 backdrop-blur-lg rounded-xl p-6 border border-white/30 shadow-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <Search className="h-10 w-10 text-drivefit-orange mx-auto mb-4 drop-shadow-lg" />
              <h3 className="text-white font-bold text-lg mb-2 drop-shadow-md">Quality Inspected</h3>
              <p className="text-white/90 text-sm drop-shadow-sm">Every vehicle undergoes thorough quality inspection</p>
            </div>
            <div className="bg-white/15 backdrop-blur-lg rounded-xl p-6 border border-white/30 shadow-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <TrendingUp className="h-10 w-10 text-drivefit-orange mx-auto mb-4 drop-shadow-lg" />
              <h3 className="text-white font-bold text-lg mb-2 drop-shadow-md">Best Prices</h3>
              <p className="text-white/90 text-sm drop-shadow-sm">Competitive and transparent pricing guaranteed</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background image with enhanced overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Luxury cars showroom" 
          className="object-cover h-full w-full"
        />
      </div>
    </section>
  );
};

export default Hero;
