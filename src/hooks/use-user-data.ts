
import { useState, useEffect } from 'react';

export interface UserVehicleListing {
  id: number;
  title: string;
  price: string;
  status: string;
  views: number;
  dateAdded: string;
  image: string;
}

export interface FavoriteVehicle {
  id: number;
  title: string;
  price: string;
  status: string;
  dateAdded: string;
  image: string;
}

export interface Transaction {
  id: number;
  vehicleTitle: string;
  price: string;
  date: string;
  status: string;
  transactionId: string;
}

export interface ActivityLog {
  id: number;
  activity: string;
  details: string;
  date: string;
}

interface UserData {
  listings: UserVehicleListing[];
  favorites: FavoriteVehicle[];
  transactions: Transaction[];
  activities: ActivityLog[];
}

export const useUserData = () => {
  const [userData, setUserData] = useState<UserData>({
    listings: [],
    favorites: [],
    transactions: [],
    activities: []
  });
  
  // Load user data from localStorage on mount
  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) return;
    
    // Try to load user data from localStorage
    try {
      const savedData = localStorage.getItem(`drivefit_data_${userEmail}`);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setUserData(parsedData);
        console.log("Loaded user data from localStorage", parsedData);
      } else {
        // Set default data for new users
        const defaultUserListings = [
          { 
            id: 3, 
            title: "2024 Suzuki Swift DLX", 
            price: "PKR 2,890,000", 
            status: "active", 
            views: 45, 
            dateAdded: "2024-05-08",
            image: "https://images.unsplash.com/photo-1441057206919-63d19fac2369?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
          },
          { 
            id: 4, 
            title: "2025 KIA Sportage Alpha", 
            price: "PKR 7,250,000", 
            status: "pending", 
            views: 12, 
            dateAdded: "2025-01-15",
            image: "https://images.unsplash.com/photo-1452960962994-acf4fd70b632?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
          }
        ];
        
        const favoriteVehicles = [
          { 
            id: 1, 
            title: "2024 Toyota Corolla GLi", 
            price: "PKR 4,850,000", 
            status: "available", 
            dateAdded: "2024-05-10",
            image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
          },
          { 
            id: 2, 
            title: "2025 Honda Civic Oriel", 
            price: "PKR 5,350,000", 
            status: "available", 
            dateAdded: "2025-02-12",
            image: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
          }
        ];
        
        const transactions = [
          {
            id: 1,
            vehicleTitle: "2024 Toyota Corolla GLi",
            price: "PKR 4,850,000",
            date: "2024-05-15",
            status: "completed",
            transactionId: "TXN783921"
          },
          {
            id: 2,
            vehicleTitle: "2024 Honda City 1.5L",
            price: "PKR 3,950,000",
            date: "2024-04-22",
            status: "pending",
            transactionId: "TXN651234"
          }
        ];
        
        const activities = [
          { id: 1, activity: "Vehicle viewed", details: "2024 Toyota Corolla GLi", date: "2024-05-15" },
          { id: 2, activity: "Message sent", details: "About 2025 Honda Civic", date: "2024-05-14" },
          { id: 3, activity: "Vehicle listed", details: "2024 Suzuki Swift DLX", date: "2024-05-10" },
          { id: 4, activity: "Vehicle purchased", details: "2024 Toyota Corolla GLi", date: "2024-05-15" }
        ];
        
        const defaultData = {
          listings: defaultUserListings,
          favorites: favoriteVehicles,
          transactions: transactions,
          activities: activities
        };
        
        setUserData(defaultData);
        saveData(defaultData, userEmail);
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  }, []);
  
  // Save data to localStorage
  const saveData = (data: UserData, email: string = localStorage.getItem("userEmail") || "") => {
    if (!email) return;
    
    try {
      localStorage.setItem(`drivefit_data_${email}`, JSON.stringify(data));
      console.log("Saved user data to localStorage", data);
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };
  
  // Update listings
  const updateListings = (newListings: UserVehicleListing[]) => {
    const updatedData = { ...userData, listings: newListings };
    setUserData(updatedData);
    saveData(updatedData);
    
    // Add activity log
    addActivity("Vehicle listing updated", "Your vehicle listings were updated");
  };
  
  // Add a new listing
  const addListing = (listing: UserVehicleListing) => {
    const updatedListings = [...userData.listings, listing];
    const updatedData = { ...userData, listings: updatedListings };
    setUserData(updatedData);
    saveData(updatedData);
    
    // Add activity log
    addActivity("Vehicle listed", listing.title);
  };
  
  // Delete a listing
  const deleteListing = (id: number) => {
    const updatedListings = userData.listings.filter(listing => listing.id !== id);
    const updatedData = { ...userData, listings: updatedListings };
    setUserData(updatedData);
    saveData(updatedData);
    
    // Add activity log
    addActivity("Vehicle listing removed", `Listing #${id} was removed`);
  };
  
  // Toggle favorite status
  const toggleFavorite = (vehicle: FavoriteVehicle) => {
    const existingIndex = userData.favorites.findIndex(fav => fav.id === vehicle.id);
    
    let updatedFavorites = [];
    let actionText = "";
    
    if (existingIndex === -1) {
      updatedFavorites = [...userData.favorites, vehicle];
      actionText = "added to";
    } else {
      updatedFavorites = userData.favorites.filter(fav => fav.id !== vehicle.id);
      actionText = "removed from";
    }
    
    const updatedData = { ...userData, favorites: updatedFavorites };
    setUserData(updatedData);
    saveData(updatedData);
    
    // Add activity log
    addActivity(`Vehicle ${actionText} favorites`, vehicle.title);
    
    return existingIndex === -1; // Return true if added, false if removed
  };
  
  // Add a new transaction
  const addTransaction = (transaction: Transaction) => {
    const updatedTransactions = [...userData.transactions, transaction];
    const updatedData = { ...userData, transactions: updatedTransactions };
    setUserData(updatedData);
    saveData(updatedData);
    
    // Add activity log
    addActivity("Vehicle purchased", transaction.vehicleTitle);
    
    // Save transaction info to session storage to handle page refreshes
    sessionStorage.setItem("pendingOperation", JSON.stringify({
      type: "payment_success",
      transactionId: transaction.transactionId,
      vehicleData: {
        title: transaction.vehicleTitle,
        price: transaction.price
      }
    }));
  };
  
  // Add activity log
  const addActivity = (activity: string, details: string) => {
    const newActivity = {
      id: Date.now(),
      activity,
      details,
      date: new Date().toISOString().split('T')[0]
    };
    
    const updatedActivities = [newActivity, ...userData.activities].slice(0, 50); // Keep only last 50 activities
    const updatedData = { ...userData, activities: updatedActivities };
    setUserData(updatedData);
    saveData(updatedData);
  };
  
  return {
    userData,
    updateListings,
    addListing,
    deleteListing,
    toggleFavorite,
    addTransaction,
    addActivity
  };
};
