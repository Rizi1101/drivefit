
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  
  const handleExplore = () => {
    navigate("/vehicles");
  };
  
  return (
    <section className="relative h-[70vh] bg-drivefit-orange flex items-center overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Find Your Perfect Ride in Pakistan
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            Browse thousands of quality vehicles with verified sellers and transparent pricing
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg" 
              className="bg-drivefit-black text-white hover:bg-drivefit-black/90"
              onClick={handleExplore}
            >
              Explore Vehicles
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white text-drivefit-orange hover:bg-white/90"
              onClick={() => navigate("/sell")}
            >
              Sell Your Car
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute right-0 bottom-0 w-full md:w-1/2 h-full">
        <div className="relative h-full">
          <div className="absolute inset-0 bg-gradient-to-r from-drivefit-orange via-drivefit-orange/80 to-transparent z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Luxury car" 
            className="object-cover h-full w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
