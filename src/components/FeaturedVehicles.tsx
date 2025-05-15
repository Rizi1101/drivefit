
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useUserData } from "@/hooks/use-user-data";

const FEATURED_VEHICLES = [
  {
    id: 1,
    title: "2022 Toyota Corolla GLi",
    price: "PKR 4,850,000",
    location: "Karachi, Sindh",
    mileage: "15,300",
    status: "available",
    dateAdded: "2024-05-10",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 2,
    title: "2021 Honda Civic Oriel",
    price: "PKR 5,350,000",
    location: "Lahore, Punjab",
    mileage: "22,500",
    status: "available",
    dateAdded: "2024-05-12",
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f37?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 3,
    title: "2020 Suzuki Swift DLX",
    price: "PKR 2,890,000",
    location: "Islamabad, Federal",
    mileage: "34,600",
    status: "available",
    dateAdded: "2024-05-08",
    image: "https://images.unsplash.com/photo-1549399542-7e38e2ee9233?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 4,
    title: "2023 KIA Sportage Alpha",
    price: "PKR 7,250,000",
    location: "Peshawar, KPK",
    mileage: "8,200",
    status: "available",
    dateAdded: "2024-05-05",
    image: "https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  }
];

const FeaturedVehicles = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<number[]>([]);
  const { userData, toggleFavorite, addActivity } = useUserData();

  // Initialize favorites based on user data
  useEffect(() => {
    const userFavoriteIds = userData.favorites.map(fav => fav.id);
    setFavorites(userFavoriteIds);
  }, [userData.favorites]);

  const handleToggleFavorite = (id: number) => {
    const vehicle = FEATURED_VEHICLES.find(v => v.id === id);
    if (!vehicle) return;
    
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
      status: vehicle.status,
      dateAdded: vehicle.dateAdded,
      image: vehicle.image
    });
    
    if (wasAdded) {
      setFavorites(prev => [...prev, id]);
      toast({
        title: "Added to Favorites",
        description: `${vehicle.title} has been added to your favorites`,
      });
    } else {
      setFavorites(prev => prev.filter(favId => favId !== id));
      toast({
        title: "Removed from Favorites",
        description: `${vehicle.title} has been removed from your saved list`,
      });
    }
  };

  const handleViewDetails = (id: number, title: string) => {
    // Add activity and navigate to vehicle detail
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      addActivity("Vehicle viewed", title);
    }
    
    navigate(`/vehicles/${id}`);
  };

  const handleViewAll = () => {
    navigate("/vehicles");
  };

  return (
    <section className="py-16 bg-drivefit-gray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Vehicles</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our handpicked selection of premium Pakistani vehicles that match your preferences
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_VEHICLES.map((vehicle) => (
            <div key={vehicle.id} className="vehicle-card group">
              <div className="relative h-48 md:h-56">
                <img 
                  src={vehicle.image} 
                  alt={vehicle.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <button 
                  className="absolute top-2 right-2 p-2 rounded-full bg-white bg-opacity-50 hover:bg-opacity-70 transition-all"
                  onClick={() => handleToggleFavorite(vehicle.id)}
                  aria-label={favorites.includes(vehicle.id) ? "Remove from favorites" : "Add to favorites"}
                >
                  <Heart 
                    className={`h-5 w-5 ${favorites.includes(vehicle.id) ? "text-drivefit-red fill-current" : "text-drivefit-red"}`} 
                  />
                </button>
              </div>
              <div className="p-4 bg-white">
                <h3 className="text-lg font-medium mb-1">{vehicle.title}</h3>
                <p className="text-drivefit-red font-bold mb-2">{vehicle.price}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{vehicle.location}</span>
                  <span>{vehicle.mileage} km</span>
                </div>
                <Button 
                  className="w-full mt-4 bg-drivefit-blue hover:bg-drivefit-blue/90 text-white"
                  onClick={() => handleViewDetails(vehicle.id, vehicle.title)}
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
            className="px-8"
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
