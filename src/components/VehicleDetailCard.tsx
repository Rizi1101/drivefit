
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useUserData } from "@/hooks/use-user-data";

interface VehicleDetailCardProps {
  vehicle: any;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const VehicleDetailCard = ({ vehicle, isFavorite, onToggleFavorite }: VehicleDetailCardProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <h1 className="text-3xl font-bold mb-2 md:mb-0">{vehicle.title}</h1>
      <div className="flex space-x-2">
        <Button 
          variant="outline" 
          className={isFavorite ? "bg-drivefit-red text-white" : ""}
          onClick={onToggleFavorite}
        >
          <Heart className={`mr-2 h-5 w-5 ${isFavorite ? "fill-current" : ""}`} /> 
          {isFavorite ? "Favorited" : "Add to Favorites"}
        </Button>
      </div>
    </div>
  );
};

export default VehicleDetailCard;
