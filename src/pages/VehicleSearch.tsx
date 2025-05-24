
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Search, Filter, List, Grid, Car, Eye, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useVehicleData } from "@/hooks/use-vehicle-data";
import ChatBot from "@/components/ChatBot";

// Type definitions
type Vehicle = {
  id: number;
  title: string;
  price: string;
  priceNumber: number; // Numeric price for filtering
  location: string;
  mileage: string;
  engineCapacity: string;
  transmission: string;
  year: number;
  vehicleType: string;
  brand: string;
  image: string;
  postedDate: Date;
  views: number;
  sellerName: string;
  sellerRating: number;
  isVerified: boolean;
};

// Pakistan vehicles data with added fields for filtering
const PAKISTAN_VEHICLES: Vehicle[] = [
  {
    id: 1,
    title: "2022 Toyota Corolla GLi",
    price: "PKR 4,850,000",
    priceNumber: 4850000,
    location: "Karachi, Sindh",
    mileage: "15,300 km",
    engineCapacity: "1800 cc",
    transmission: "Automatic",
    year: 2022,
    vehicleType: "Sedan",
    brand: "Toyota",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    views: 245,
    sellerName: "Ahmed Motors",
    sellerRating: 4.8,
    isVerified: true
  },
  {
    id: 2,
    title: "2021 Honda Civic Oriel",
    price: "PKR 5,350,000",
    priceNumber: 5350000,
    location: "Lahore, Punjab",
    mileage: "22,500 km",
    engineCapacity: "1800 cc",
    transmission: "Automatic",
    year: 2021,
    vehicleType: "Sedan",
    brand: "Honda",
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f37?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    views: 189,
    sellerName: "City Motors",
    sellerRating: 4.6,
    isVerified: true
  },
  {
    id: 3,
    title: "2020 Suzuki Swift DLX",
    price: "PKR 2,890,000",
    priceNumber: 2890000,
    location: "Islamabad, Federal",
    mileage: "34,600 km",
    engineCapacity: "1300 cc",
    transmission: "Manual",
    year: 2020,
    vehicleType: "Hatchback",
    brand: "Suzuki",
    image: "https://images.unsplash.com/photo-1549399542-7e38e2ee9233?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    views: 156,
    sellerName: "Swift Dealer",
    sellerRating: 4.2,
    isVerified: false
  },
  {
    id: 4,
    title: "2023 KIA Sportage Alpha",
    price: "PKR 7,250,000",
    priceNumber: 7250000,
    location: "Peshawar, KPK",
    mileage: "8,200 km",
    engineCapacity: "2000 cc",
    transmission: "Automatic",
    year: 2023,
    vehicleType: "SUV",
    brand: "KIA",
    image: "https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    postedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    views: 312,
    sellerName: "KIA Showroom",
    sellerRating: 4.9,
    isVerified: true
  },
  {
    id: 5,
    title: "2019 Toyota Fortuner",
    price: "PKR 9,200,000",
    priceNumber: 9200000,
    location: "Multan, Punjab",
    mileage: "45,600 km",
    engineCapacity: "2800 cc",
    transmission: "Automatic",
    year: 2019,
    vehicleType: "SUV",
    brand: "Toyota",
    image: "https://images.unsplash.com/photo-1669215420582-11464593e1e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    postedDate: new Date(Date.now() - 6 * 60 * 60 * 1000),
    views: 203,
    sellerName: "Premium Auto",
    sellerRating: 4.5,
    isVerified: true
  },
  {
    id: 6,
    title: "2021 Suzuki Alto VXL",
    price: "PKR 2,150,000",
    priceNumber: 2150000,
    location: "Faisalabad, Punjab",
    mileage: "18,900 km",
    engineCapacity: "660 cc",
    transmission: "Manual",
    year: 2021,
    vehicleType: "Hatchback",
    brand: "Suzuki",
    image: "https://images.unsplash.com/photo-1551830820-330a71b99659?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    postedDate: new Date(Date.now() - 2 * 60 * 60 * 1000),
    views: 124,
    sellerName: "Honda Dealer",
    sellerRating: 4.4,
    isVerified: true
  },
  {
    id: 7,
    title: "2018 Toyota Hilux Revo",
    price: "PKR 6,800,000",
    priceNumber: 6800000,
    location: "Quetta, Balochistan",
    mileage: "78,500 km",
    engineCapacity: "2800 cc",
    transmission: "Manual",
    year: 2018,
    vehicleType: "Pickup",
    brand: "Toyota",
    image: "https://images.unsplash.com/photo-1559416123-c31d4644a008?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    postedDate: new Date(Date.now() - 30 * 60 * 1000),
    views: 67,
    sellerName: "Auto Plaza",
    sellerRating: 4.1,
    isVerified: false
  },
  {
    id: 8,
    title: "2022 Hyundai Tucson",
    price: "PKR 6,550,000",
    priceNumber: 6550000,
    location: "Islamabad, Federal",
    mileage: "12,800 km",
    engineCapacity: "2000 cc",
    transmission: "Automatic",
    year: 2022,
    vehicleType: "Crossover",
    brand: "Hyundai",
    image: "https://images.unsplash.com/photo-1583267746897-2cf415887172?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    postedDate: new Date(Date.now() - 12 * 60 * 60 * 1000),
    views: 87,
    sellerName: "Hyundai Motors",
    sellerRating: 4.7,
    isVerified: true
  }
];

// Type definition for the filter form
type FilterFormValues = {
  searchTerm: string;
  brand: string;
  vehicleType: string;
  priceRange: [number, number];
  year: number | null;
  location: string;
};

const VehicleSearch = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const { vehicles, isLoading, incrementViews } = useVehicleData();
  const [filteredVehicles, setFilteredVehicles] = useState(vehicles);
  
  // Update filtered vehicles when vehicles data changes
  useEffect(() => {
    setFilteredVehicles(vehicles);
  }, [vehicles]);

  // Price range constants
  const MIN_PRICE = 0;
  const MAX_PRICE = 10000000; // 10 million PKR
  
  // Form for filters with useForm
  const form = useForm<FilterFormValues>({
    defaultValues: {
      searchTerm: "",
      brand: "All Brands",
      vehicleType: "All Types",
      priceRange: [MIN_PRICE, MAX_PRICE],
      year: null,
      location: "All Pakistan",
    },
  });

  // Get selected values from form for display
  const selectedBrand = form.watch("brand");
  const selectedType = form.watch("vehicleType");
  const selectedPriceRange = form.watch("priceRange");
  const selectedYear = form.watch("year");
  const selectedLocation = form.watch("location");
  const searchTerm = form.watch("searchTerm");
  
  // Format price for display
  const formatPrice = (price: number) => {
    return `PKR ${price.toLocaleString()}`;
  };
  
  // Toggle filter visibility
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  // Handle view details action
  const handleViewDetails = (vehicle: any) => {
    incrementViews(vehicle.id);
    toast({
      title: "Vehicle Selected",
      description: `Viewing details for ${vehicle.title}`,
    });
  };

  const formatTimeSince = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just posted";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };
  
  // Handle applying filters
  const applyFilters = (values: FilterFormValues) => {
    const filtered = PAKISTAN_VEHICLES.filter(vehicle => {
      // Check search term
      const matchesSearch = values.searchTerm 
        ? vehicle.title.toLowerCase().includes(values.searchTerm.toLowerCase()) 
        : true;
      
      // Check brand
      const matchesBrand = values.brand === "All Brands" || vehicle.brand === values.brand;
      
      // Check vehicle type
      const matchesType = values.vehicleType === "All Types" || vehicle.vehicleType === values.vehicleType;
      
      // Check price range
      const matchesPrice = vehicle.priceNumber >= values.priceRange[0] && 
                           vehicle.priceNumber <= values.priceRange[1];
      
      // Check year
      const matchesYear = !values.year || vehicle.year === values.year;
      
      // Check location
      const matchesLocation = values.location === "All Pakistan" || 
                              vehicle.location.includes(values.location.replace(", All Regions", ""));
      
      return matchesSearch && matchesBrand && matchesType && matchesPrice && matchesYear && matchesLocation;
    });
    
    setFilteredVehicles(filtered);
    
    toast({
      title: "Filters Applied",
      description: `Found ${filtered.length} vehicles matching your criteria`,
    });
  };
  
  // Reset filters to default
  const resetFilters = () => {
    form.reset({
      searchTerm: "",
      brand: "All Brands",
      vehicleType: "All Types",
      priceRange: [MIN_PRICE, MAX_PRICE],
      year: null,
      location: "All Pakistan",
    });
    
    setFilteredVehicles(PAKISTAN_VEHICLES);
    
    toast({
      title: "Filters Reset",
      description: "Showing all available vehicles",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow bg-drivefit-gray py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Find Your Perfect Vehicle</h1>
          
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-grow relative">
              <Input
                type="text"
                placeholder="Search by make, model, or keywords..."
                className="w-full p-3 pr-10 border rounded-lg"
                value={searchTerm}
                onChange={(e) => form.setValue("searchTerm", e.target.value)}
              />
              <span className="absolute right-3 top-3 text-gray-400">
                <Search size={20} />
              </span>
            </div>
            <Button 
              className="btn-primary" 
              onClick={form.handleSubmit(applyFilters)}
            >
              Search
            </Button>
            <Button variant="outline" onClick={toggleFilters}>
              <Filter size={20} className="mr-2" /> Filters
            </Button>
            <div className="flex border rounded-lg overflow-hidden">
              <button 
                className={`p-3 ${viewMode === 'grid' ? 'bg-drivefit-blue text-white' : 'bg-white'}`}
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
              >
                <Grid size={20} />
              </button>
              <button 
                className={`p-3 ${viewMode === 'list' ? 'bg-drivefit-blue text-white' : 'bg-white'}`}
                onClick={() => setViewMode('list')}
                aria-label="List view"
              >
                <List size={20} />
              </button>
            </div>
          </div>
          
          {/* Filters Section */}
          {showFilters && (
            <Card className="p-4 mb-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(applyFilters)}>
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <FormField
                      control={form.control}
                      name="brand"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Brand</FormLabel>
                          <FormControl>
                            <Select 
                              value={field.value} 
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Brand" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="All Brands">All Brands</SelectItem>
                                <SelectItem value="Toyota">Toyota</SelectItem>
                                <SelectItem value="Honda">Honda</SelectItem>
                                <SelectItem value="Suzuki">Suzuki</SelectItem>
                                <SelectItem value="KIA">KIA</SelectItem>
                                <SelectItem value="Hyundai">Hyundai</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="vehicleType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Vehicle Type</FormLabel>
                          <FormControl>
                            <Select 
                              value={field.value} 
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="All Types">All Types</SelectItem>
                                <SelectItem value="Sedan">Sedan</SelectItem>
                                <SelectItem value="Hatchback">Hatchback</SelectItem>
                                <SelectItem value="SUV">SUV</SelectItem>
                                <SelectItem value="Crossover">Crossover</SelectItem>
                                <SelectItem value="Pickup">Pickup</SelectItem>
                                <SelectItem value="Van">Van</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <div className="space-y-4">
                      <FormLabel>Price Range</FormLabel>
                      <div>
                        <Slider
                          defaultValue={[MIN_PRICE, MAX_PRICE]}
                          max={MAX_PRICE}
                          min={MIN_PRICE}
                          step={100000}
                          value={selectedPriceRange}
                          onValueChange={(value) => form.setValue("priceRange", value as [number, number])}
                          className="mb-6"
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>{formatPrice(selectedPriceRange[0])}</span>
                          <span>{formatPrice(selectedPriceRange[1])}</span>
                        </div>
                      </div>
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="year"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Model Year</FormLabel>
                          <FormControl>
                            <Select 
                              value={field.value?.toString() || ""} 
                              onValueChange={(val) => field.onChange(val ? parseInt(val) : null)}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Any Year" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="">Any Year</SelectItem>
                                <SelectItem value="2023">2023</SelectItem>
                                <SelectItem value="2022">2022</SelectItem>
                                <SelectItem value="2021">2021</SelectItem>
                                <SelectItem value="2020">2020</SelectItem>
                                <SelectItem value="2019">2019</SelectItem>
                                <SelectItem value="2018">2018</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Select 
                              value={field.value} 
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Location" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="All Pakistan">All Pakistan</SelectItem>
                                <SelectItem value="Karachi, Sindh">Karachi, Sindh</SelectItem>
                                <SelectItem value="Lahore, Punjab">Lahore, Punjab</SelectItem>
                                <SelectItem value="Islamabad, Federal">Islamabad, Federal</SelectItem>
                                <SelectItem value="Peshawar, KPK">Peshawar, KPK</SelectItem>
                                <SelectItem value="Quetta, Balochistan">Quetta, Balochistan</SelectItem>
                                <SelectItem value="Multan, Punjab">Multan, Punjab</SelectItem>
                                <SelectItem value="Faisalabad, Punjab">Faisalabad, Punjab</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex justify-end mt-4">
                    <Button 
                      type="button"
                      variant="outline" 
                      className="mr-2"
                      onClick={resetFilters}
                    >
                      Reset
                    </Button>
                    <Button 
                      type="submit"
                      className="btn-primary"
                    >
                      Apply Filters
                    </Button>
                  </div>
                </form>
              </Form>
            </Card>
          )}
          
          {/* Active Filters Display */}
          {(selectedBrand !== "All Brands" || 
            selectedType !== "All Types" || 
            selectedPriceRange[0] !== MIN_PRICE || 
            selectedPriceRange[1] !== MAX_PRICE || 
            selectedYear ||
            selectedLocation !== "All Pakistan" ||
            searchTerm) && (
            <div className="bg-white rounded-lg p-3 mb-4 flex flex-wrap gap-2 items-center">
              <span className="font-medium">Active Filters:</span>
              
              {searchTerm && (
                <span className="bg-gray-100 text-sm px-2 py-1 rounded-full flex items-center">
                  Search: {searchTerm}
                </span>
              )}
              
              {selectedBrand !== "All Brands" && (
                <span className="bg-gray-100 text-sm px-2 py-1 rounded-full flex items-center">
                  Brand: {selectedBrand}
                </span>
              )}
              
              {selectedType !== "All Types" && (
                <span className="bg-gray-100 text-sm px-2 py-1 rounded-full flex items-center">
                  Type: {selectedType}
                </span>
              )}
              
              {(selectedPriceRange[0] !== MIN_PRICE || selectedPriceRange[1] !== MAX_PRICE) && (
                <span className="bg-gray-100 text-sm px-2 py-1 rounded-full flex items-center">
                  Price: {formatPrice(selectedPriceRange[0])} - {formatPrice(selectedPriceRange[1])}
                </span>
              )}
              
              {selectedYear && (
                <span className="bg-gray-100 text-sm px-2 py-1 rounded-full flex items-center">
                  Year: {selectedYear}
                </span>
              )}
              
              {selectedLocation !== "All Pakistan" && (
                <span className="bg-gray-100 text-sm px-2 py-1 rounded-full flex items-center">
                  Location: {selectedLocation}
                </span>
              )}
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="ml-auto text-sm"
                onClick={resetFilters}
              >
                Clear All
              </Button>
            </div>
          )}
          
          {/* Results Count */}
          <p className="text-gray-600 mb-6">{filteredVehicles.length} vehicles found</p>
          
          {/* Vehicles Grid/List */}
          {isLoading ? (
            <div className="text-center py-16">
              <p>Loading vehicles...</p>
            </div>
          ) : filteredVehicles.length > 0 ? (
            viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVehicles.map((vehicle) => (
                  <Card key={vehicle.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-48 relative">
                      <img 
                        src={vehicle.image} 
                        alt={vehicle.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                        {formatTimeSince(vehicle.postedDate)}
                      </div>
                      <div className="absolute top-2 right-2 bg-drivefit-blue text-white px-2 py-1 rounded text-xs">
                        {vehicle.year}
                      </div>
                      {vehicle.isVerified && (
                        <div className="absolute bottom-2 right-2 bg-green-500 rounded-full p-1">
                          <CheckCircle className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-medium mb-1">{vehicle.title}</h3>
                      <p className="text-drivefit-red font-bold mb-2">{vehicle.price}</p>
                      <div className="flex justify-between text-sm text-gray-500 mb-2">
                        <span>{vehicle.location}</span>
                        <span>{vehicle.mileage}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-500 mb-2">
                        <span>{vehicle.engineCapacity}</span>
                        <span>{vehicle.transmission}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {vehicle.views} views
                        </span>
                        <span>★ {vehicle.sellerRating}</span>
                      </div>
                      <Link to={`/vehicles/${vehicle.id}`}>
                        <Button 
                          className="w-full bg-drivefit-blue hover:bg-drivefit-blue/90 text-white"
                          onClick={() => handleViewDetails(vehicle)}
                        >
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredVehicles.map((vehicle) => (
                  <Card key={vehicle.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3 h-48 relative">
                        <img 
                          src={vehicle.image} 
                          alt={vehicle.title} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                          {formatTimeSince(vehicle.postedDate)}
                        </div>
                        <div className="absolute top-2 right-2 bg-drivefit-blue text-white px-2 py-1 rounded text-xs">
                          {vehicle.year}
                        </div>
                        {vehicle.isVerified && (
                          <div className="absolute bottom-2 right-2 bg-green-500 rounded-full p-1">
                            <CheckCircle className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="p-4 md:w-2/3">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-medium">{vehicle.title}</h3>
                          <span className="text-sm text-gray-500">by {vehicle.sellerName}</span>
                        </div>
                        <p className="text-drivefit-red font-bold text-xl mb-3">{vehicle.price}</p>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
                          <div className="flex items-center text-gray-600">
                            <Car size={16} className="mr-2" /> {vehicle.mileage}
                          </div>
                          <div className="text-gray-600">{vehicle.location}</div>
                          <div className="text-gray-600">{vehicle.engineCapacity}</div>
                          <div className="text-gray-600">{vehicle.transmission}</div>
                          <div className="flex items-center text-gray-600">
                            <Eye size={16} className="mr-1" /> {vehicle.views} views
                          </div>
                          <div className="text-gray-600">★ {vehicle.sellerRating}</div>
                        </div>
                        <Link to={`/vehicles/${vehicle.id}`}>
                          <Button 
                            className="mt-2 bg-drivefit-blue hover:bg-drivefit-blue/90 text-white"
                            onClick={() => handleViewDetails(vehicle)}
                          >
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium mb-2">No vehicles found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your filters to see more results</p>
              <Button onClick={resetFilters}>Reset Filters</Button>
            </div>
          )}
          
          {/* Pagination */}
          {filteredVehicles.length > 0 && (
            <div className="mt-8 flex justify-center">
              <nav className="inline-flex rounded-md shadow">
                <button className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-3 py-2 border-t border-b border-gray-300 bg-drivefit-blue text-sm font-medium text-white">
                  1
                </button>
                <button className="px-3 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  2
                </button>
                <button className="px-3 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  3
                </button>
                <button className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Next
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
      <ChatBot />
    </div>
  );
};

export default VehicleSearch;
