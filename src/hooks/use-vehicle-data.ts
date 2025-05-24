
import { useState, useEffect } from 'react';

export interface VehicleEntry {
  id: number;
  title: string;
  price: string;
  priceNumber: number;
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
  isVerified: boolean;
  sellerName: string;
  sellerRating: number;
}

export const useVehicleData = () => {
  const [vehicles, setVehicles] = useState<VehicleEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize with sample data and simulate real-time updates
    const initialVehicles: VehicleEntry[] = [
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
        image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        views: 245,
        isVerified: true,
        sellerName: "Ahmed Motors",
        sellerRating: 4.8
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
        image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f37?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        views: 189,
        isVerified: true,
        sellerName: "City Motors",
        sellerRating: 4.6
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
        image: "https://images.unsplash.com/photo-1549399542-7e38e2ee9233?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        views: 156,
        isVerified: false,
        sellerName: "Swift Dealer",
        sellerRating: 4.2
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
        image: "https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        postedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        views: 312,
        isVerified: true,
        sellerName: "KIA Showroom",
        sellerRating: 4.9
      },
      {
        id: 5,
        title: "2024 Hyundai Tucson GLS",
        price: "PKR 8,200,000",
        priceNumber: 8200000,
        location: "Karachi, Sindh",
        mileage: "5,100 km",
        engineCapacity: "2000 cc",
        transmission: "Automatic",
        year: 2024,
        vehicleType: "SUV",
        brand: "Hyundai",
        image: "https://images.unsplash.com/photo-1583267746897-2cf415887172?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        postedDate: new Date(Date.now() - 12 * 60 * 60 * 1000),
        views: 87,
        isVerified: true,
        sellerName: "Hyundai Motors",
        sellerRating: 4.7
      },
      {
        id: 6,
        title: "2019 Toyota Fortuner 4x4",
        price: "PKR 9,850,000",
        priceNumber: 9850000,
        location: "Multan, Punjab",
        mileage: "48,900 km",
        engineCapacity: "2800 cc",
        transmission: "Automatic",
        year: 2019,
        vehicleType: "SUV",
        brand: "Toyota",
        image: "https://images.unsplash.com/photo-1669215420582-11464593e1e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        postedDate: new Date(Date.now() - 6 * 60 * 60 * 1000),
        views: 203,
        isVerified: true,
        sellerName: "Premium Auto",
        sellerRating: 4.5
      },
      {
        id: 7,
        title: "2023 Honda BR-V Aspire",
        price: "PKR 4,200,000",
        priceNumber: 4200000,
        location: "Faisalabad, Punjab",
        mileage: "12,400 km",
        engineCapacity: "1500 cc",
        transmission: "CVT",
        year: 2023,
        vehicleType: "Crossover",
        brand: "Honda",
        image: "https://images.unsplash.com/photo-1551830820-330a71b99659?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        postedDate: new Date(Date.now() - 2 * 60 * 60 * 1000),
        views: 124,
        isVerified: true,
        sellerName: "Honda Dealer",
        sellerRating: 4.4
      },
      {
        id: 8,
        title: "2021 Suzuki Alto VXL Plus",
        price: "PKR 2,450,000",
        priceNumber: 2450000,
        location: "Lahore, Punjab",
        mileage: "28,700 km",
        engineCapacity: "1000 cc",
        transmission: "Manual",
        year: 2021,
        vehicleType: "Hatchback",
        brand: "Suzuki",
        image: "https://images.unsplash.com/photo-1559416123-c31d4644a008?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        postedDate: new Date(Date.now() - 30 * 60 * 1000),
        views: 67,
        isVerified: false,
        sellerName: "Auto Plaza",
        sellerRating: 4.1
      }
    ];

    setVehicles(initialVehicles);
    setIsLoading(false);

    // Simulate real-time updates
    const interval = setInterval(() => {
      // Randomly update views
      setVehicles(prev => prev.map(vehicle => ({
        ...vehicle,
        views: vehicle.views + Math.floor(Math.random() * 3)
      })));

      // Occasionally add new vehicles
      if (Math.random() < 0.2) { // 20% chance every minute
        addNewVehicle();
      }
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const addNewVehicle = () => {
    const newVehicleTemplates = [
      {
        title: "2024 MG HS Core",
        price: "PKR 6,800,000",
        priceNumber: 6800000,
        brand: "MG",
        vehicleType: "SUV",
        engineCapacity: "1500 cc",
        transmission: "CVT",
        year: 2024,
        image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
      },
      {
        title: "2023 Changan Alsvin",
        price: "PKR 3,200,000",
        priceNumber: 3200000,
        brand: "Changan",
        vehicleType: "Sedan",
        engineCapacity: "1500 cc",
        transmission: "Manual",
        year: 2023,
        image: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
      }
    ];

    const template = newVehicleTemplates[Math.floor(Math.random() * newVehicleTemplates.length)];
    const cities = ["Karachi, Sindh", "Lahore, Punjab", "Islamabad, Federal", "Peshawar, KPK"];
    
    const newVehicle: VehicleEntry = {
      ...template,
      id: Date.now(),
      location: cities[Math.floor(Math.random() * cities.length)],
      mileage: `${Math.floor(Math.random() * 50000 + 5000)} km`,
      postedDate: new Date(),
      views: Math.floor(Math.random() * 10),
      isVerified: Math.random() > 0.3,
      sellerName: `Dealer ${Math.floor(Math.random() * 100)}`,
      sellerRating: Math.round((Math.random() * 2 + 3) * 10) / 10
    };

    setVehicles(prev => [newVehicle, ...prev]);
  };

  const incrementViews = (id: number) => {
    setVehicles(prev => prev.map(vehicle =>
      vehicle.id === id
        ? { ...vehicle, views: vehicle.views + 1 }
        : vehicle
    ));
  };

  const getLatestVehicles = (limit: number = 8) => {
    return vehicles
      .sort((a, b) => b.postedDate.getTime() - a.postedDate.getTime())
      .slice(0, limit);
  };

  const searchVehicles = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    return vehicles.filter(vehicle =>
      vehicle.title.toLowerCase().includes(lowercaseQuery) ||
      vehicle.brand.toLowerCase().includes(lowercaseQuery) ||
      vehicle.location.toLowerCase().includes(lowercaseQuery) ||
      vehicle.vehicleType.toLowerCase().includes(lowercaseQuery)
    );
  };

  return {
    vehicles,
    isLoading,
    incrementViews,
    getLatestVehicles,
    searchVehicles,
    addNewVehicle
  };
};
