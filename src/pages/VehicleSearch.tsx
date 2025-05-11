
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Search, Filter, SortAsc, Grid, List, Car } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const PAKISTAN_VEHICLES = [
  {
    id: 1,
    title: "2022 Toyota Corolla GLi",
    price: "PKR 4,850,000",
    location: "Karachi, Sindh",
    mileage: "15,300 km",
    engineCapacity: "1800 cc",
    transmission: "Automatic",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 2,
    title: "2021 Honda Civic Oriel",
    price: "PKR 5,350,000",
    location: "Lahore, Punjab",
    mileage: "22,500 km",
    engineCapacity: "1800 cc",
    transmission: "Automatic",
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f37?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 3,
    title: "2020 Suzuki Swift DLX",
    price: "PKR 2,890,000",
    location: "Islamabad, Federal",
    mileage: "34,600 km",
    engineCapacity: "1300 cc",
    transmission: "Manual",
    image: "https://images.unsplash.com/photo-1549399542-7e38e2ee9233?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 4,
    title: "2023 KIA Sportage Alpha",
    price: "PKR 7,250,000",
    location: "Peshawar, KPK",
    mileage: "8,200 km",
    engineCapacity: "2000 cc",
    transmission: "Automatic",
    image: "https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 5,
    title: "2019 Toyota Fortuner",
    price: "PKR 9,200,000",
    location: "Multan, Punjab",
    mileage: "45,600 km",
    engineCapacity: "2800 cc",
    transmission: "Automatic",
    image: "https://images.unsplash.com/photo-1669215420582-11464593e1e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 6,
    title: "2021 Suzuki Alto VXL",
    price: "PKR 2,150,000",
    location: "Faisalabad, Punjab",
    mileage: "18,900 km",
    engineCapacity: "660 cc",
    transmission: "Manual",
    image: "https://images.unsplash.com/photo-1551830820-330a71b99659?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  }
];

const VehicleSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  
  const handleSearch = () => {
    toast({
      title: "Search initiated",
      description: `Searching for: ${searchTerm || "all vehicles"}`,
    });
  };
  
  const handleViewDetails = (title: string) => {
    toast({
      title: "Vehicle Selected",
      description: `Viewing details for ${title}`,
    });
  };
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  const filteredVehicles = PAKISTAN_VEHICLES.filter(vehicle => 
    searchTerm ? vehicle.title.toLowerCase().includes(searchTerm.toLowerCase()) : true
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow bg-drivefit-gray py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Find Your Perfect Vehicle</h1>
          
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-grow relative">
              <input
                type="text"
                placeholder="Search by make, model, or keywords..."
                className="w-full p-3 pr-10 border rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="absolute right-3 top-3 text-gray-400">
                <Search size={20} />
              </span>
            </div>
            <Button className="btn-primary" onClick={handleSearch}>
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
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Brand</label>
                  <select className="w-full p-2 border rounded">
                    <option>All Brands</option>
                    <option>Toyota</option>
                    <option>Honda</option>
                    <option>Suzuki</option>
                    <option>KIA</option>
                    <option>Hyundai</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Price Range</label>
                  <select className="w-full p-2 border rounded">
                    <option>Any Price</option>
                    <option>Under PKR 2,000,000</option>
                    <option>PKR 2,000,000 - 4,000,000</option>
                    <option>PKR 4,000,000 - 6,000,000</option>
                    <option>Above PKR 6,000,000</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Model Year</label>
                  <select className="w-full p-2 border rounded">
                    <option>Any Year</option>
                    <option>2023</option>
                    <option>2022</option>
                    <option>2021</option>
                    <option>2020</option>
                    <option>2019</option>
                    <option>2018</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Location</label>
                  <select className="w-full p-2 border rounded">
                    <option>All Pakistan</option>
                    <option>Karachi</option>
                    <option>Lahore</option>
                    <option>Islamabad</option>
                    <option>Peshawar</option>
                    <option>Quetta</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <Button variant="outline" className="mr-2">Reset</Button>
                <Button className="btn-primary">Apply Filters</Button>
              </div>
            </Card>
          )}
          
          {/* Results Count */}
          <p className="text-gray-600 mb-6">{filteredVehicles.length} vehicles found</p>
          
          {/* Vehicles Grid/List */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVehicles.map((vehicle) => (
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
                    <div className="flex justify-between text-sm text-gray-500 mb-2">
                      <span>{vehicle.location}</span>
                      <span>{vehicle.mileage}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 mb-4">
                      <span>{vehicle.engineCapacity}</span>
                      <span>{vehicle.transmission}</span>
                    </div>
                    <Button 
                      className="w-full bg-drivefit-blue hover:bg-drivefit-blue/90 text-white"
                      onClick={() => handleViewDetails(vehicle.title)}
                    >
                      View Details
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredVehicles.map((vehicle) => (
                <Card key={vehicle.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 h-48">
                      <img 
                        src={vehicle.image} 
                        alt={vehicle.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 md:w-2/3">
                      <h3 className="text-xl font-medium mb-2">{vehicle.title}</h3>
                      <p className="text-drivefit-red font-bold text-xl mb-3">{vehicle.price}</p>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
                        <div className="flex items-center text-gray-600">
                          <Car size={16} className="mr-2" /> {vehicle.mileage}
                        </div>
                        <div className="text-gray-600">{vehicle.location}</div>
                        <div className="text-gray-600">{vehicle.engineCapacity}</div>
                        <div className="text-gray-600">{vehicle.transmission}</div>
                      </div>
                      <Button 
                        className="mt-2 bg-drivefit-blue hover:bg-drivefit-blue/90 text-white"
                        onClick={() => handleViewDetails(vehicle.title)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
          
          {/* Pagination */}
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
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default VehicleSearch;
