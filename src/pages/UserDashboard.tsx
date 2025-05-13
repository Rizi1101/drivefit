import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { User, Car, ShoppingCart, Heart, Plus, Trash, Edit, Settings } from "lucide-react";

// Updated mock data with current years
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

// Transaction history
const transactionHistory = [
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

// Updated user listings with images
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

const activityLog = [
  { id: 1, activity: "Vehicle viewed", details: "2024 Toyota Corolla GLi", date: "2024-05-15" },
  { id: 2, activity: "Message sent", details: "About 2025 Honda Civic", date: "2024-05-14" },
  { id: 3, activity: "Vehicle listed", details: "2024 Suzuki Swift DLX", date: "2024-05-10" },
  { id: 4, activity: "Vehicle purchased", details: "2024 Toyota Corolla GLi", date: "2024-05-15" }
];

const UserDashboard = () => {
  const navigate = useNavigate();
  const [userListings, setUserListings] = useState(defaultUserListings);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "User",
    email: "",
    phone: "+92-XXX-XXXXXXX",
    userType: "buyer", // Default to buyer, not both
    joinedDate: "May 2023"
  });

  useEffect(() => {
    // Check if user is logged in
    const userEmail = localStorage.getItem("userEmail");
    const userName = localStorage.getItem("userName") || "User";
    const userType = localStorage.getItem("userType") || "buyer"; // Default to buyer
    const userPhone = localStorage.getItem("userPhone") || "+92-XXX-XXXXXXX";
    
    if (!userEmail) {
      navigate("/signin");
      return;
    }
    
    console.log("UserDashboard loaded with user type:", userType);
    
    // Update user info
    setUserInfo({
      name: userName,
      email: userEmail,
      phone: userPhone,
      userType: userType,
      joinedDate: "May 2023" // In a real app, this would come from the database
    });
    
    // In a real app, we would fetch user info, listings, favorites and transactions from an API
  }, [navigate]);

  const handleAddNewListing = () => {
    // Check if the user can add a listing based on their type
    if (userInfo.userType === "buyer") {
      toast({
        title: "Account Type Restriction",
        description: "You need a seller account to list vehicles",
        variant: "destructive"
      });
      return;
    }
    
    navigate("/sell");
  };

  const handleDeleteListing = (id: number) => {
    setUserListings(userListings.filter(listing => listing.id !== id));
    toast({
      title: "Listing Deleted",
      description: "Your vehicle listing has been removed successfully",
    });
  };

  const handleEditListing = (id: number) => {
    // In a real app, this would navigate to an edit page with the listing id
    navigate(`/sell?edit=${id}`);
  };

  const handleRemoveFavorite = (id: number) => {
    toast({
      title: "Removed from Favorites",
      description: "Vehicle has been removed from your saved list",
    });
  };

  const updateUserSettings = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData(e.target as HTMLFormElement);
    const newUserType = formData.get("userType") as string;
    const newName = formData.get("name") as string;
    const newPhone = formData.get("phone") as string;
    
    if (!['buyer', 'seller', 'both'].includes(newUserType)) {
      toast({
        title: "Invalid user type",
        description: "Please select a valid user type",
        variant: "destructive"
      });
      return;
    }
    
    // Save to localStorage
    localStorage.setItem("userType", newUserType);
    localStorage.setItem("userName", newName);
    localStorage.setItem("userPhone", newPhone);
    
    console.log("User settings updated, new user type:", newUserType);
    
    // Update state
    setUserInfo({
      ...userInfo,
      name: newName,
      phone: newPhone,
      userType: newUserType
    });
    
    toast({
      title: "Settings Updated",
      description: "Your account settings have been updated successfully",
    });
    
    setIsSettingsOpen(false);
  };

  const canSell = userInfo.userType === "seller" || userInfo.userType === "both";
  const canBuy = userInfo.userType === "buyer" || userInfo.userType === "both";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Dashboard</h1>
            <p className="text-gray-600">Welcome back, {userInfo.name}</p>
          </div>
          <Button onClick={() => setIsSettingsOpen(true)}>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {canSell && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>My Listings</CardTitle>
                <CardDescription>Vehicles you are selling</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Car className="h-8 w-8 mr-3 text-drivefit-blue" />
                  <div>
                    <p className="text-3xl font-bold">{userListings.length}</p>
                    <p className="text-sm text-muted-foreground">Active listings</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {canBuy && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Saved Vehicles</CardTitle>
                <CardDescription>Your favorites</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Heart className="h-8 w-8 mr-3 text-red-500" />
                  <div>
                    <p className="text-3xl font-bold">{favoriteVehicles.length}</p>
                    <p className="text-sm text-muted-foreground">Saved for later</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Account Type</CardTitle>
              <CardDescription>Your DriveFit role</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <User className="h-8 w-8 mr-3 text-drivefit-red" />
                <div>
                  <p className="text-xl font-bold capitalize">{userInfo.userType}</p>
                  <p className="text-sm text-muted-foreground">Member since {userInfo.joinedDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {canBuy && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Purchases</CardTitle>
                <CardDescription>Your transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <ShoppingCart className="h-8 w-8 mr-3 text-green-500" />
                  <div>
                    <p className="text-3xl font-bold">{transactionHistory.length}</p>
                    <p className="text-sm text-muted-foreground">Completed purchases</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        <Tabs defaultValue={canSell ? "listings" : "favorites"} className="w-full">
          <TabsList className="w-full mb-6">
            {canSell && <TabsTrigger value="listings" className="flex-1">My Listings</TabsTrigger>}
            {canBuy && <TabsTrigger value="favorites" className="flex-1">Saved Vehicles</TabsTrigger>}
            {canBuy && <TabsTrigger value="purchases" className="flex-1">Purchases</TabsTrigger>}
            <TabsTrigger value="activity" className="flex-1">Recent Activity</TabsTrigger>
          </TabsList>
          
          {canSell && (
            <TabsContent value="listings">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>My Vehicle Listings</CardTitle>
                    <Button onClick={handleAddNewListing}>
                      <Plus className="mr-2 h-4 w-4" /> Add New Listing
                    </Button>
                  </div>
                  <CardDescription>Manage your vehicle listings</CardDescription>
                </CardHeader>
                <CardContent>
                  {userListings.length > 0 ? (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-12">Image</TableHead>
                            <TableHead>Vehicle</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Views</TableHead>
                            <TableHead>Date Listed</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {userListings.map((listing) => (
                            <TableRow key={listing.id}>
                              <TableCell>
                                <img 
                                  src={listing.image} 
                                  alt={listing.title} 
                                  className="w-10 h-10 object-cover rounded"
                                />
                              </TableCell>
                              <TableCell className="font-medium">{listing.title}</TableCell>
                              <TableCell>{listing.price}</TableCell>
                              <TableCell>
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  listing.status === 'active' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {listing.status}
                                </span>
                              </TableCell>
                              <TableCell>{listing.views}</TableCell>
                              <TableCell>{listing.dateAdded}</TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleEditListing(listing.id)}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    variant="destructive" 
                                    size="sm"
                                    onClick={() => handleDeleteListing(listing.id)}
                                  >
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Car className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">No listings yet</h3>
                      <p className="text-muted-foreground mb-4">You haven't listed any vehicles for sale</p>
                      <Button onClick={handleAddNewListing}>
                        <Plus className="mr-2 h-4 w-4" /> Add Your First Vehicle
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          )}
          
          {canBuy && (
            <TabsContent value="favorites">
              <Card>
                <CardHeader>
                  <CardTitle>Saved Vehicles</CardTitle>
                  <CardDescription>Vehicles you're interested in</CardDescription>
                </CardHeader>
                <CardContent>
                  {favoriteVehicles.length > 0 ? (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-12">Image</TableHead>
                            <TableHead>Vehicle</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date Saved</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {favoriteVehicles.map((vehicle) => (
                            <TableRow key={vehicle.id}>
                              <TableCell>
                                <img 
                                  src={vehicle.image} 
                                  alt={vehicle.title} 
                                  className="w-10 h-10 object-cover rounded"
                                />
                              </TableCell>
                              <TableCell className="font-medium">{vehicle.title}</TableCell>
                              <TableCell>{vehicle.price}</TableCell>
                              <TableCell>
                                <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                                  {vehicle.status}
                                </span>
                              </TableCell>
                              <TableCell>{vehicle.dateAdded}</TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => navigate(`/vehicles/${vehicle.id}`)}
                                  >
                                    View
                                  </Button>
                                  <Button 
                                    variant="destructive" 
                                    size="sm"
                                    onClick={() => handleRemoveFavorite(vehicle.id)}
                                  >
                                    Remove
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">No saved vehicles</h3>
                      <p className="text-muted-foreground mb-4">You haven't saved any vehicles yet</p>
                      <Button onClick={() => navigate("/vehicles")}>
                        Browse Vehicles
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          )}
          
          {canBuy && (
            <TabsContent value="purchases">
              <Card>
                <CardHeader>
                  <CardTitle>Purchase History</CardTitle>
                  <CardDescription>Your vehicle purchases</CardDescription>
                </CardHeader>
                <CardContent>
                  {transactionHistory.length > 0 ? (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Vehicle</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Transaction ID</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {transactionHistory.map((transaction) => (
                            <TableRow key={transaction.id}>
                              <TableCell className="font-medium">{transaction.vehicleTitle}</TableCell>
                              <TableCell>{transaction.price}</TableCell>
                              <TableCell>{transaction.date}</TableCell>
                              <TableCell>
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  transaction.status === 'completed' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {transaction.status}
                                </span>
                              </TableCell>
                              <TableCell>{transaction.transactionId}</TableCell>
                              <TableCell>
                                <Button 
                                  size="sm"
                                  onClick={() => navigate(`/payment-success`, { 
                                    state: { 
                                      transactionId: transaction.transactionId,
                                      vehicleData: {
                                        title: transaction.vehicleTitle,
                                        price: transaction.price
                                      }
                                    }
                                  })}
                                >
                                  View Receipt
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">No purchases yet</h3>
                      <p className="text-muted-foreground mb-4">You haven't purchased any vehicles yet</p>
                      <Button onClick={() => navigate("/vehicles")}>
                        Browse Vehicles
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          )}
          
          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your recent activities on DriveFit</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Activity</TableHead>
                      <TableHead>Details</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activityLog.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-medium">{log.activity}</TableCell>
                        <TableCell>{log.details}</TableCell>
                        <TableCell>{log.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* User Settings Dialog */}
        <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Account Settings</DialogTitle>
              <DialogDescription>
                Update your account information and preferences
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={updateUserSettings} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
                <input 
                  id="name"
                  name="name"
                  type="text" 
                  className="w-full p-2 border rounded" 
                  defaultValue={userInfo.name}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <input 
                  id="email"
                  name="email"
                  type="email" 
                  className="w-full p-2 border rounded" 
                  defaultValue={userInfo.email}
                  disabled
                />
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
                <input 
                  id="phone"
                  name="phone"
                  type="text" 
                  className="w-full p-2 border rounded" 
                  defaultValue={userInfo.phone}
                  required
                />
              </div>
              <div>
                <label htmlFor="userType" className="block text-sm font-medium mb-1">Account Type</label>
                <select 
                  id="userType"
                  name="userType"
                  className="w-full p-2 border rounded" 
                  defaultValue={userInfo.userType}
                  required
                >
                  <option value="buyer">Buyer</option>
                  <option value="seller">Seller</option>
                  <option value="both">Both (Buyer & Seller)</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" type="button" onClick={() => setIsSettingsOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <Footer />
    </div>
  );
};

export default UserDashboard;
