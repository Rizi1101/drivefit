
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Heart, Share2, Phone, Mail, Calendar, Car, MapPin } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Mock vehicle data
const vehicleData = {
  id: 1,
  title: "2022 Toyota Corolla GLi",
  description: "This Toyota Corolla GLi is in excellent condition with low mileage. It comes with all standard features and has been well maintained. The car has a powerful 1800cc engine with automatic transmission, providing a smooth driving experience. Perfect for family use or daily commute.",
  price: "PKR 4,850,000",
  location: "Karachi, Sindh",
  mileage: "15,300 km",
  year: "2022",
  engineCapacity: "1800 cc",
  transmission: "Automatic",
  color: "White",
  registeredIn: "Karachi",
  assembly: "Local",
  fuelType: "Petrol",
  features: ["Power Steering", "Power Windows", "Air Conditioning", "ABS", "Airbags", "Navigation", "Alloy Wheels", "Keyless Entry"],
  sellerName: "Ahmed Khan",
  sellerPhone: "+92-300-1234567",
  sellerEmail: "ahmed@example.com",
  sellerLocation: "DHA Phase 6, Karachi",
  images: [
    "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80",
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  ],
  relatedVehicles: [
    {
      id: 2,
      title: "2021 Honda Civic Oriel",
      price: "PKR 5,350,000",
      location: "Lahore, Punjab",
      image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f37?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 3,
      title: "2020 Toyota Corolla Altis",
      price: "PKR 4,200,000",
      location: "Islamabad, Federal",
      image: "https://images.unsplash.com/photo-1549399542-7e38e2ee9233?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 4,
      title: "2021 Honda City 1.5L",
      price: "PKR 3,950,000",
      location: "Karachi, Sindh",
      image: "https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    }
  ]
};

const VehicleDetail = () => {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  
  // In a real app, we would fetch the vehicle data based on the ID
  console.log("Vehicle ID:", id);
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: `${vehicleData.title} has been ${isFavorite ? "removed from" : "added to"} your favorites`,
    });
  };
  
  const handleShare = () => {
    toast({
      title: "Share vehicle",
      description: "Sharing options opened",
    });
  };
  
  const handleContact = (method: string) => {
    toast({
      title: "Contact seller",
      description: `Contacting seller via ${method}`,
    });
  };
  
  const handleViewRelated = (title: string) => {
    toast({
      title: "Related vehicle",
      description: `Viewing ${title}`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow bg-drivefit-gray py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm mb-6">
            <Link to="/" className="text-gray-600 hover:text-drivefit-red">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/vehicles" className="text-gray-600 hover:text-drivefit-red">Vehicles</Link>
            <span className="mx-2">/</span>
            <span className="text-drivefit-red">{vehicleData.title}</span>
          </div>
          
          {/* Vehicle title and actions */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h1 className="text-3xl font-bold mb-2 md:mb-0">{vehicleData.title}</h1>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                className={isFavorite ? "bg-drivefit-red text-white" : ""}
                onClick={toggleFavorite}
              >
                <Heart className={`mr-2 h-5 w-5 ${isFavorite ? "fill-current" : ""}`} /> 
                {isFavorite ? "Favorited" : "Add to Favorites"}
              </Button>
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="mr-2 h-5 w-5" /> Share
              </Button>
            </div>
          </div>
          
          {/* Main content */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left column - Images */}
            <div className="lg:w-2/3">
              <Card className="overflow-hidden mb-6">
                <div className="h-96 relative">
                  <img 
                    src={vehicleData.images[activeImage]} 
                    alt={vehicleData.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex justify-center space-x-2">
                  {vehicleData.images.map((image, index) => (
                    <button 
                      key={index}
                      className={`w-20 h-20 border-2 ${activeImage === index ? "border-drivefit-red" : "border-transparent"}`}
                      onClick={() => setActiveImage(index)}
                    >
                      <img 
                        src={image} 
                        alt={`${vehicleData.title} - Image ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </Card>
              
              {/* Vehicle description */}
              <Card className="mb-6">
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">Description</h2>
                  <p className="text-gray-700 mb-4">{vehicleData.description}</p>
                </div>
              </Card>
              
              {/* Vehicle features */}
              <Card className="mb-6">
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">Features</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {vehicleData.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-drivefit-red rounded-full mr-2"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
            
            {/* Right column - Details and contact */}
            <div className="lg:w-1/3">
              {/* Price */}
              <Card className="mb-6">
                <div className="p-6">
                  <h2 className="text-3xl font-bold text-drivefit-red">{vehicleData.price}</h2>
                  <p className="text-gray-600 flex items-center mt-2">
                    <MapPin size={16} className="mr-1" /> {vehicleData.location}
                  </p>
                </div>
              </Card>
              
              {/* Vehicle details */}
              <Card className="mb-6">
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">Vehicle Details</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm">Make</span>
                      <span className="font-medium">Toyota</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm">Model</span>
                      <span className="font-medium">Corolla GLi</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm">Year</span>
                      <span className="font-medium">{vehicleData.year}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm">Mileage</span>
                      <span className="font-medium">{vehicleData.mileage}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm">Engine</span>
                      <span className="font-medium">{vehicleData.engineCapacity}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm">Transmission</span>
                      <span className="font-medium">{vehicleData.transmission}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm">Color</span>
                      <span className="font-medium">{vehicleData.color}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm">Assembly</span>
                      <span className="font-medium">{vehicleData.assembly}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm">Registered In</span>
                      <span className="font-medium">{vehicleData.registeredIn}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm">Fuel Type</span>
                      <span className="font-medium">{vehicleData.fuelType}</span>
                    </div>
                  </div>
                </div>
              </Card>
              
              {/* Seller information */}
              <Card className="mb-6">
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">Seller Information</h2>
                  <p className="font-medium text-lg mb-2">{vehicleData.sellerName}</p>
                  <p className="text-gray-600 mb-4">{vehicleData.sellerLocation}</p>
                  <div className="space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full flex justify-center"
                      onClick={() => handleContact("phone")}
                    >
                      <Phone className="mr-2 h-5 w-5" /> {vehicleData.sellerPhone}
                    </Button>
                    <Button 
                      className="w-full bg-drivefit-red hover:bg-drivefit-red/90 text-white flex justify-center"
                      onClick={() => handleContact("email")}
                    >
                      <Mail className="mr-2 h-5 w-5" /> Contact Seller
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
          
          {/* Similar Vehicles */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Similar Vehicles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicleData.relatedVehicles.map((vehicle) => (
                <Card key={vehicle.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 relative">
                    <img 
                      src={vehicle.image} 
                      alt={vehicle.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-medium mb-1">{vehicle.title}</h3>
                    <p className="text-drivefit-red font-bold mb-2">{vehicle.price}</p>
                    <p className="text-sm text-gray-500 mb-4">{vehicle.location}</p>
                    <Button 
                      className="w-full bg-drivefit-blue hover:bg-drivefit-blue/90 text-white"
                      onClick={() => handleViewRelated(vehicle.title)}
                    >
                      View Details
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default VehicleDetail;
