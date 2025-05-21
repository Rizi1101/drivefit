
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useUserData } from "@/hooks/use-user-data";
import { toast } from "@/hooks/use-toast";

interface VehicleDetailCardProps {
  vehicle: any;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const VehicleDetailCard = ({ vehicle, isFavorite, onToggleFavorite }: VehicleDetailCardProps) => {
  const { toggleFavorite } = useUserData();
  
  const handleToggle = () => {
    // Check if user is logged in
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to save favorites",
      });
      return;
    }
    
    // Toggle in the user data (localStorage)
    toggleFavorite({
      id: vehicle.id,
      title: vehicle.title,
      price: vehicle.price || "Not specified",
      status: vehicle.status || "available",
      dateAdded: vehicle.dateAdded || new Date().toISOString().split('T')[0],
      image: vehicle.image || ""
    });
    
    // Call parent component's onToggleFavorite to update UI
    onToggleFavorite();
    
    // Show toast based on the new state (reversed since state hasn't updated yet)
    if (!isFavorite) {
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
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <h1 className="text-3xl font-bold mb-2 md:mb-0">{vehicle.title}</h1>
      <div className="flex space-x-2">
        <Button 
          variant="outline" 
          className={isFavorite ? "bg-drivefit-red text-white" : "border-drivefit-orange text-drivefit-orange hover:bg-drivefit-orange hover:text-white"}
          onClick={handleToggle}
        >
          <Heart className={`mr-2 h-5 w-5 ${isFavorite ? "fill-current" : ""}`} /> 
          {isFavorite ? "Favorited" : "Add to Favorites"}
        </Button>
      </div>
    </div>
  );
};

export default VehicleDetailCard;
