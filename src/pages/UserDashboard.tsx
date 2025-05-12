
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
import { User, Car, ShoppingCart, Heart, Plus, Trash, Edit } from "lucide-react";

// Updated mock data with current years
const favoriteVehicles = [
  { 
    id: 1, 
    title: "2024 Toyota Corolla GLi", 
    price: "PKR 4,850,000", 
    status: "available", 
    dateAdded: "2024-05-10",
    image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3"
  },
  { 
    id: 2, 
    title: "2025 Honda Civic Oriel", 
    price: "PKR 5,350,000", 
    status: "available", 
    dateAdded: "2025-02-12",
    image: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f"
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
    image: "https://images.unsplash.com/photo-1441057206919-63d19fac2369"
  },
  { 
    id: 4, 
    title: "2025 KIA Sportage Alpha", 
    price: "PKR 7,250,000", 
    status: "pending", 
    views: 12, 
    dateAdded: "2025-01-15",
    image: "https://images.unsplash.com/photo-1452960962994-acf4fd70b632"
  }
];

const activityLog = [
  { id: 1, activity: "Vehicle viewed", details: "2024 Toyota Corolla GLi", date: "2024-05-15" },
  { id: 2, activity: "Message sent", details: "About 2025 Honda Civic", date: "2024-05-14" },
  { id: 3, activity: "Vehicle listed", details: "2024 Suzuki Swift DLX", date: "2024-05-10" }
];

const UserDashboard = () => {
  const navigate = useNavigate();
  const [userListings, setUserListings] = useState(defaultUserListings);
  const [userInfo, setUserInfo] = useState({
    name: "Rizwan Qamar",
    email: "rizwanqamar889@gmail.com",
    phone: "+923221755463",
    userType: "both",
    joinedDate: "May 2023"
  });

  useEffect(() => {
    // Check if user is logged in
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      navigate("/signin");
    }
    
    // In a real app, we would fetch user info and listings from an API
    // This is a mock implementation
  }, [navigate]);

  const handleAddNewListing = () => {
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
    toast({
      title: "Edit Listing",
      description: `Editing vehicle with ID: ${id}`,
    });
  };

  const handleRemoveFavorite = (id: number) => {
    toast({
      title: "Removed from Favorites",
      description: "Vehicle has been removed from your saved list",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Dashboard</h1>
            <p className="text-gray-600">Welcome back, {userInfo.name}</p>
          </div>
          <Button onClick={() => toast({ title: "Profile", description: "User profile settings opened" })}>
            Edit Profile
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
        </div>
        
        <Tabs defaultValue="listings" className="w-full">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="listings" className="flex-1">My Listings</TabsTrigger>
            <TabsTrigger value="favorites" className="flex-1">Saved Vehicles</TabsTrigger>
            <TabsTrigger value="activity" className="flex-1">Recent Activity</TabsTrigger>
          </TabsList>
          
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
      </div>
      
      <Footer />
    </div>
  );
};

export default UserDashboard;
