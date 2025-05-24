
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Search, Shield, TrendingUp } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();
  
  const handleExplore = () => {
    navigate("/vehicles");
  };
  
  return (
    <section className="relative min-h-[80vh] bg-gradient-to-br from-drivefit-blue via-drivefit-black to-drivefit-orange flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      
      <div className="container mx-auto px-6 relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
            Find Your Perfect
            <span className="block text-drivefit-orange">Dream Car</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow-md max-w-2xl mx-auto">
            Browse thousands of verified vehicles with transparent pricing and trusted sellers across Pakistan
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-drivefit-orange text-white hover:bg-drivefit-orange/90 px-8 py-4 text-lg font-semibold shadow-xl"
              onClick={handleExplore}
            >
              <Search className="mr-2 h-5 w-5" />
              Explore Vehicles
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 px-8 py-4 text-lg font-semibold shadow-xl"
              onClick={() => navigate("/sell")}
            >
              <TrendingUp className="mr-2 h-5 w-5" />
              Sell Your Car
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <Shield className="h-8 w-8 text-drivefit-orange mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Verified Sellers</h3>
              <p className="text-white/80 text-sm">All sellers are verified for your safety</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <Search className="h-8 w-8 text-drivefit-orange mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Quality Inspected</h3>
              <p className="text-white/80 text-sm">Every vehicle undergoes quality inspection</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <TrendingUp className="h-8 w-8 text-drivefit-orange mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Best Prices</h3>
              <p className="text-white/80 text-sm">Competitive and transparent pricing</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background image */}
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
