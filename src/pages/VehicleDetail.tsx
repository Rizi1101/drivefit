
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BuyButton from "@/components/BuyButton";
import CarView3D from "@/components/CarView3D";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Heart, Car, Share, Info, MessageCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const VehicleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [vehicle, setVehicle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState<"images" | "3d">("images");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // In a real app, this would fetch from API using the ID
    // For now, using mock data
    const mockVehicle = {
      id: Number(id) || 1,
      title: "2024 Toyota Camry XLE V6",
      price: "PKR 8,950,000",
      year: 2024,
      mileage: "15,000 km",
      location: "Islamabad, Pakistan",
      fuelType: "Petrol",
      transmission: "Automatic",
      color: "Pearl White",
      engineSize: "3.5L V6",
      features: [
        "Leather Interior",
        "Sunroof",
        "Navigation System",
        "Blind Spot Monitor",
        "Adaptive Cruise Control",
        "360° Camera",
        "Lane Keeping Assist",
        "Heated and Ventilated Seats"
      ],
      description: "This beautiful 2024 Toyota Camry XLE is in pristine condition with only 15,000 km on the odometer. Powered by a smooth 3.5L V6 engine, it offers excellent performance while maintaining good fuel economy. The Pearl White exterior is complemented by a luxurious beige leather interior. This vehicle comes loaded with premium features including a panoramic sunroof, JBL sound system, and Toyota's latest safety suite. Service history is complete and the vehicle is under manufacturer warranty until 2027. Perfect family sedan with ample space and comfort for long drives.",
      sellerInfo: {
        name: "Ahmed Khan",
        rating: 4.8,
        memberSince: "2022",
        phone: "+92 301 2345678",
        email: "ahmed.k@email.com"
      },
      images: [
        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        "https://images.unsplash.com/photo-1605816988069-b11dde457f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80",
        "https://images.unsplash.com/photo-1583267746897-2cf415887172?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
      ],
      model3dPath: "https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/car-muscle/model.gltf"
    };

    setTimeout(() => {
      setVehicle(mockVehicle);
      setLoading(false);
    }, 800);
  }, [id]);

  const handleFavorite = () => {
    toast({
      title: "Added to favorites",
      description: `${vehicle.title} has been added to your favorites`,
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "Vehicle listing link copied to clipboard",
    });
  };

  const handleContactSeller = () => {
    toast({
      title: "Contact request sent",
      description: "The seller will contact you soon",
    });
  };

  const handleNextImage = () => {
    if (vehicle && vehicle.images) {
      setCurrentImageIndex((prev) => (prev + 1) % vehicle.images.length);
    }
  };

  const handlePrevImage = () => {
    if (vehicle && vehicle.images) {
      setCurrentImageIndex((prev) => (prev - 1 + vehicle.images.length) % vehicle.images.length);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-royal-green border-t-transparent rounded-full animate-spin"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold">Vehicle Not Found</h2>
          <p className="text-gray-600 mt-2">The vehicle you are looking for does not exist.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-black/50 backdrop-blur-lg shadow-lg rounded-xl overflow-hidden border border-royal-green/20 animate-fade-in">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <h1 className="text-2xl md:text-3xl font-bold text-gradient">{vehicle.title}</h1>
              <p className="text-xl md:text-2xl font-semibold text-royal-green">{vehicle.price}</p>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 bg-royal-green/20 text-royal-green rounded-full text-sm">{vehicle.year}</span>
              <span className="px-3 py-1 bg-royal-green/20 text-royal-green rounded-full text-sm">{vehicle.mileage}</span>
              <span className="px-3 py-1 bg-royal-green/20 text-royal-green rounded-full text-sm">{vehicle.fuelType}</span>
              <span className="px-3 py-1 bg-royal-green/20 text-royal-green rounded-full text-sm">{vehicle.transmission}</span>
            </div>

            <div className="flex mb-4 space-x-4">
              <Button 
                variant="outline" 
                className={activeView === "images" ? "bg-royal-green text-white" : "bg-transparent"}
                onClick={() => setActiveView("images")}
              >
                Images
              </Button>
              <Button 
                variant="outline" 
                className={activeView === "3d" ? "bg-royal-green text-white" : "bg-transparent"}
                onClick={() => setActiveView("3d")}
              >
                3D View
              </Button>
            </div>

            <div className="mb-8 rounded-lg overflow-hidden">
              {activeView === "images" ? (
                <div className="relative">
                  <AspectRatio ratio={16 / 9}>
                    <img 
                      src={vehicle.images[currentImageIndex]} 
                      alt={`${vehicle.title} - image ${currentImageIndex + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </AspectRatio>

                  <button 
                    onClick={handlePrevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70"
                  >
                    &#10094;
                  </button>
                  <button 
                    onClick={handleNextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70"
                  >
                    &#10095;
                  </button>
                  
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {vehicle.images.map((_, index) => (
                      <button 
                        key={index} 
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full ${
                          index === currentImageIndex ? 'bg-royal-green' : 'bg-white/30'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <CarView3D modelPath={vehicle.model3dPath} carName={vehicle.title} />
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Tabs defaultValue="details">
                  <TabsList className="w-full mb-6">
                    <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
                    <TabsTrigger value="features" className="flex-1">Features</TabsTrigger>
                    <TabsTrigger value="description" className="flex-1">Description</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="details" className="glass-card p-4 rounded-xl">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm text-gray-300">Year</h3>
                        <p className="font-medium">{vehicle.year}</p>
                      </div>
                      <div>
                        <h3 className="text-sm text-gray-300">Mileage</h3>
                        <p className="font-medium">{vehicle.mileage}</p>
                      </div>
                      <div>
                        <h3 className="text-sm text-gray-300">Fuel Type</h3>
                        <p className="font-medium">{vehicle.fuelType}</p>
                      </div>
                      <div>
                        <h3 className="text-sm text-gray-300">Transmission</h3>
                        <p className="font-medium">{vehicle.transmission}</p>
                      </div>
                      <div>
                        <h3 className="text-sm text-gray-300">Color</h3>
                        <p className="font-medium">{vehicle.color}</p>
                      </div>
                      <div>
                        <h3 className="text-sm text-gray-300">Engine</h3>
                        <p className="font-medium">{vehicle.engineSize}</p>
                      </div>
                      <div>
                        <h3 className="text-sm text-gray-300">Location</h3>
                        <p className="font-medium">{vehicle.location}</p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="features" className="glass-card p-4 rounded-xl">
                    <ul className="grid grid-cols-2 gap-2">
                      {vehicle.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <span className="w-2 h-2 bg-royal-green rounded-full mr-2"></span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                  
                  <TabsContent value="description" className="glass-card p-4 rounded-xl">
                    <p className="whitespace-pre-line">{vehicle.description}</p>
                  </TabsContent>
                </Tabs>
              </div>
              
              <div>
                <div className="glass-card p-4 rounded-xl mb-6">
                  <h3 className="font-semibold mb-4 flex items-center">
                    <Info className="w-5 h-5 mr-2 text-royal-green" />
                    Seller Information
                  </h3>
                  <div className="space-y-2">
                    <p><span className="text-gray-300">Name:</span> {vehicle.sellerInfo.name}</p>
                    <p><span className="text-gray-300">Rating:</span> {vehicle.sellerInfo.rating} / 5</p>
                    <p><span className="text-gray-300">Member since:</span> {vehicle.sellerInfo.memberSince}</p>
                    <Separator className="my-3 bg-gray-700" />
                    <Button onClick={handleContactSeller} className="w-full mb-2 bg-royal-green hover:bg-royal-green/90">
                      <MessageCircle className="mr-2 h-4 w-4" /> Contact Seller
                    </Button>
                  </div>
                </div>
                
                <div className="glass-card p-4 rounded-xl">
                  <BuyButton vehicleId={vehicle.id} price={vehicle.price} title={vehicle.title} />
                  
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <Button variant="outline" onClick={handleFavorite} className="border-royal-green/30">
                      <Heart className="mr-2 h-4 w-4" /> Save
                    </Button>
                    <Button variant="outline" onClick={handleShare} className="border-royal-green/30">
                      <Share className="mr-2 h-4 w-4" /> Share
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VehicleDetail;
