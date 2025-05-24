
import { Button } from "@/components/ui/button";
import { Heart, Eye, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useUserData } from "@/hooks/use-user-data";
import { useVehicleData } from "@/hooks/use-vehicle-data";

const FeaturedVehicles = () => {
  const navigate = useNavigate();
  const { userData, toggleFavorite, addActivity } = useUserData();
  const { getLatestVehicles, incrementViews } = useVehicleData();

  // Get latest vehicles instead of static data
  const featuredVehicles = getLatestVehicles(4);

  // Initialize favorites based on user data
  const [favorites, setFavorites] = useState<number[]>([]);
  
  // Update local state whenever userData changes
  useEffect(() => {
    const userFavoriteIds = userData.favorites.map(fav => fav.id);
    setFavorites(userFavoriteIds);
  }, [userData.favorites]);

  const handleToggleFavorite = (vehicle: any) => {
    // Check if user is logged in
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to save favorites",
      });
      return;
    }
    
    const wasAdded = toggleFavorite({
      id: vehicle.id,
      title: vehicle.title,
      price: vehicle.price,
      status: "available",
      dateAdded: vehicle.postedDate.toISOString().split('T')[0],
      image: vehicle.image
    });
    
    if (wasAdded) {
      toast({
        title: "Added to Favorites",
        description: `${vehicle.title} has been added to your favorites`,
      });
    } else {
      toast({
        title: "Removed from Favorites",
        description: `${vehicle.title} has been removed from your saved list`,
      });
    }
  };

  const handleViewDetails = (vehicle: any) => {
    // Increment view count
    incrementViews(vehicle.id);
    
    // Add activity and navigate to vehicle detail
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      addActivity("Vehicle viewed", vehicle.title);
    }
    
    navigate(`/vehicles/${vehicle.id}`);
  };

  const handleViewAll = () => {
    navigate("/vehicles");
  };

  const formatTimeSince = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just posted";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <section className="py-16 bg-drivefit-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-drivefit-black">Latest Vehicles</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the newest additions to our marketplace with real-time updates
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredVehicles.map((vehicle) => (
            <div key={vehicle.id} className="vehicle-card group shadow-md hover:shadow-xl transition-shadow">
              <div className="relative h-48 md:h-56">
                <img 
                  src={vehicle.image} 
                  alt={vehicle.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Time since posted */}
                <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                  {formatTimeSince(vehicle.postedDate)}
                </div>
                
                {/* Verified badge */}
                {vehicle.isVerified && (
                  <div className="absolute top-2 right-12 bg-green-500 rounded-full p-1">
                    <CheckCircle className="h-3 w-3 text-white" />
                  </div>
                )}
                
                <button 
                  className="absolute top-2 right-2 p-2 rounded-full bg-white bg-opacity-50 hover:bg-opacity-70 transition-all"
                  onClick={() => handleToggleFavorite(vehicle)}
                  aria-label={favorites.includes(vehicle.id) ? "Remove from favorites" : "Add to favorites"}
                >
                  <Heart 
                    className={`h-5 w-5 ${favorites.includes(vehicle.id) ? "text-drivefit-red fill-current" : "text-drivefit-red"}`} 
                  />
                </button>
              </div>
              <div className="p-4 bg-white">
                <h3 className="text-lg font-medium mb-1">{vehicle.title}</h3>
                <p className="text-drivefit-orange font-bold mb-2">{vehicle.price}</p>
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>{vehicle.location}</span>
                  <span>{vehicle.mileage}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {vehicle.views} views
                  </span>
                  <span>★ {vehicle.sellerRating}</span>
                </div>
                <Button 
                  className="w-full mt-2 bg-drivefit-orange hover:bg-drivefit-orange/90 text-white"
                  onClick={() => handleViewDetails(vehicle)}
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Button 
            variant="outline" 
            className="px-8 border-drivefit-orange text-drivefit-orange hover:bg-drivefit-orange hover:text-white"
            onClick={handleViewAll}
          >
            View All Vehicles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVehicles;
