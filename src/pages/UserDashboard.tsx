
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { User, Car, ShoppingCart, Heart } from "lucide-react";

// Mock data
const favoriteVehicles = [
  { id: 1, title: "2022 Toyota Corolla GLi", price: "PKR 4,850,000", status: "available", dateAdded: "2023-05-10" },
  { id: 2, title: "2021 Honda Civic Oriel", price: "PKR 5,350,000", status: "available", dateAdded: "2023-05-12" }
];

const userListings = [
  { id: 3, title: "2020 Suzuki Swift DLX", price: "PKR 2,890,000", status: "active", views: 45, dateAdded: "2023-05-08" }
];

const activityLog = [
  { id: 1, activity: "Vehicle viewed", details: "2022 Toyota Corolla GLi", date: "2023-05-15" },
  { id: 2, activity: "Message sent", details: "About 2021 Honda Civic", date: "2023-05-14" },
  { id: 3, activity: "Vehicle listed", details: "2020 Suzuki Swift DLX", date: "2023-05-10" }
];

const UserDashboard = () => {
  const [userInfo] = useState({
    name: "Rizwan Qamar",
    email: "rizwanqamar889@gmail.com",
    phone: "+923221755463",
    userType: "both",
    joinedDate: "May 2023"
  });

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
                  <Button onClick={() => toast({ title: "Add Listing", description: "Redirecting to sell vehicle page" })}>
                    Add New Listing
                  </Button>
                </div>
                <CardDescription>Manage your vehicle listings</CardDescription>
              </CardHeader>
              <CardContent>
                {userListings.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
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
                          <TableCell className="font-medium">{listing.title}</TableCell>
                          <TableCell>{listing.price}</TableCell>
                          <TableCell>
                            <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                              {listing.status}
                            </span>
                          </TableCell>
                          <TableCell>{listing.views}</TableCell>
                          <TableCell>{listing.dateAdded}</TableCell>
                          <TableCell>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => toast({ title: "Edit Listing", description: `Editing ${listing.title}` })}
                            >
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8">
                    <Car className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No listings yet</h3>
                    <p className="text-muted-foreground mb-4">You haven't listed any vehicles for sale</p>
                    <Button onClick={() => toast({ title: "Add Listing", description: "Redirecting to sell vehicle page" })}>
                      Add Your First Vehicle
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
                  <Table>
                    <TableHeader>
                      <TableRow>
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
                                onClick={() => toast({ title: "View Details", description: `Viewing ${vehicle.title}` })}
                              >
                                View
                              </Button>
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => toast({ title: "Removed", description: `${vehicle.title} removed from favorites` })}
                              >
                                Remove
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8">
                    <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No saved vehicles</h3>
                    <p className="text-muted-foreground mb-4">You haven't saved any vehicles yet</p>
                    <Button onClick={() => toast({ title: "Browse", description: "Redirecting to vehicle search" })}>
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
