import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import { ChevronDown } from "lucide-react";

type Vehicle = {
  id: number;
  title: string;
  price: string;
  priceNumber: number;
  location: string;
  status: "active" | "pending" | "sold";
  seller: string;
  dateAdded: string;
};

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  userType: "buyer" | "seller" | "both";
  joined: string;
};

const AdminDashboard = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: 1,
      title: "2022 Toyota Corolla GLi",
      price: "PKR 4,850,000",
      priceNumber: 4850000,
      location: "Karachi, Sindh",
      status: "active",
      seller: "Ahmed Khan",
      dateAdded: "2023-05-10"
    },
    {
      id: 2,
      title: "2021 Honda Civic Oriel",
      price: "PKR 5,350,000",
      priceNumber: 5350000,
      location: "Lahore, Punjab",
      status: "pending",
      seller: "Fatima Ali",
      dateAdded: "2023-05-12"
    },
    {
      id: 3,
      title: "2020 Suzuki Swift DLX",
      price: "PKR 2,890,000",
      priceNumber: 2890000,
      location: "Islamabad, Federal",
      status: "sold",
      seller: "Bilal Ahmed",
      dateAdded: "2023-05-08"
    },
  ]);

  const [payments, setPayments] = useState([
    {
      id: "PAY-001",
      amount: "PKR 5,000",
      status: "completed",
      date: "2023-05-15",
      customer: "Ahmed Khan",
      method: "Bank Transfer"
    },
    {
      id: "PAY-002",
      amount: "PKR 3,500",
      status: "pending",
      date: "2023-05-16",
      customer: "Sara Malik",
      method: "EasyPaisa"
    },
    {
      id: "PAY-003",
      amount: "PKR 8,000",
      status: "completed",
      date: "2023-05-14",
      customer: "Umar Farooq",
      method: "JazzCash"
    },
  ]);

  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "Ahmed Khan", email: "ahmed@example.com", role: "user", userType: "buyer", joined: "2023-04-10" },
    { id: 2, name: "Fatima Ali", email: "fatima@example.com", role: "user", userType: "seller", joined: "2023-04-15" },
    { id: 3, name: "Bilal Ahmed", email: "bilal@example.com", role: "admin", userType: "both", joined: "2023-03-20" },
    { id: 4, name: "Sara Malik", email: "sara@example.com", role: "user", userType: "both", joined: "2023-05-01" },
    { id: 5, name: "Rizwan Qamar", email: "rizwanqamar889@gmail.com", role: "user", userType: "both", joined: "2023-05-12" },
  ]);

  const approveVehicle = (id: number) => {
    setVehicles(vehicles.map(vehicle => 
      vehicle.id === id ? { ...vehicle, status: "active" as const } : vehicle
    ));
    toast({
      title: "Vehicle Approved",
      description: `Vehicle #${id} has been approved and is now active.`
    });
  };

  const rejectVehicle = (id: number) => {
    setVehicles(vehicles.filter(vehicle => vehicle.id !== id));
    toast({
      title: "Vehicle Rejected",
      description: `Vehicle #${id} has been rejected and removed from the listings.`
    });
  };

  const processPayment = (id: string) => {
    setPayments(payments.map(payment => 
      payment.id === id ? { ...payment, status: "completed" } : payment
    ));
    toast({
      title: "Payment Processed",
      description: `Payment ${id} has been marked as completed.`
    });
  };

  const changeUserRole = (id: number, newRole: string) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, role: newRole } : user
    ));
    toast({
      title: "Role Updated",
      description: `User ID ${id}'s role has been updated to ${newRole}.`
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button onClick={() => toast({ title: "Settings", description: "Admin settings opened" })}>
            Settings
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Total Vehicles</CardTitle>
              <CardDescription>Active vehicle listings</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{3}</p>
              <p className="text-sm text-muted-foreground">+2 from last week</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Total Users</CardTitle>
              <CardDescription>Registered users</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{users.length}</p>
              <p className="text-sm text-muted-foreground">+1 new today</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Revenue</CardTitle>
              <CardDescription>Monthly earnings</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">PKR 45,000</p>
              <p className="text-sm text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="vehicles" className="w-full">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="vehicles" className="flex-1">Vehicle Listings</TabsTrigger>
            <TabsTrigger value="payments" className="flex-1">Payments</TabsTrigger>
            <TabsTrigger value="users" className="flex-1">User Management</TabsTrigger>
          </TabsList>
          
          <TabsContent value="vehicles">
            <Card>
              <CardHeader>
                <CardTitle>Vehicle Listings</CardTitle>
                <CardDescription>Manage all vehicle listings on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">ID</th>
                        <th className="text-left py-3 px-4">Vehicle</th>
                        <th className="text-left py-3 px-4">Price</th>
                        <th className="text-left py-3 px-4">Location</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Seller</th>
                        <th className="text-left py-3 px-4">Date Added</th>
                        <th className="text-left py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vehicles.map((vehicle) => (
                        <tr key={vehicle.id} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4">{vehicle.id}</td>
                          <td className="py-3 px-4">{vehicle.title}</td>
                          <td className="py-3 px-4">{vehicle.price}</td>
                          <td className="py-3 px-4">{vehicle.location}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              vehicle.status === "active" 
                                ? "bg-green-100 text-green-800" 
                                : vehicle.status === "pending" 
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-blue-100 text-blue-800"
                            }`}>
                              {vehicle.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">{vehicle.seller}</td>
                          <td className="py-3 px-4">{vehicle.dateAdded}</td>
                          <td className="py-3 px-4">
                            {vehicle.status === "pending" ? (
                              <div className="flex gap-2">
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  onClick={() => approveVehicle(vehicle.id)}
                                >
                                  Approve
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="destructive" 
                                  onClick={() => rejectVehicle(vehicle.id)}
                                >
                                  Reject
                                </Button>
                              </div>
                            ) : (
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    Actions <ChevronDown className="ml-2 h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => toast({ title: "View", description: `Viewing ${vehicle.title}` })}>
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => toast({ title: "Edit", description: `Editing ${vehicle.title}` })}>
                                    Edit Listing
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => rejectVehicle(vehicle.id)} className="text-red-600">
                                    Remove Listing
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>Payment Management</CardTitle>
                <CardDescription>Process and track payments on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">ID</th>
                        <th className="text-left py-3 px-4">Amount</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Date</th>
                        <th className="text-left py-3 px-4">Customer</th>
                        <th className="text-left py-3 px-4">Method</th>
                        <th className="text-left py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map((payment) => (
                        <tr key={payment.id} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4">{payment.id}</td>
                          <td className="py-3 px-4">{payment.amount}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              payment.status === "completed" 
                                ? "bg-green-100 text-green-800" 
                                : "bg-yellow-100 text-yellow-800"
                            }`}>
                              {payment.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">{payment.date}</td>
                          <td className="py-3 px-4">{payment.customer}</td>
                          <td className="py-3 px-4">{payment.method}</td>
                          <td className="py-3 px-4">
                            {payment.status === "pending" ? (
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => processPayment(payment.id)}
                              >
                                Process
                              </Button>
                            ) : (
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => toast({ title: "Details", description: `Viewing details for ${payment.id}` })}
                              >
                                View Details
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage users on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">ID</th>
                        <th className="text-left py-3 px-4">Name</th>
                        <th className="text-left py-3 px-4">Email</th>
                        <th className="text-left py-3 px-4">Role</th>
                        <th className="text-left py-3 px-4">Type</th>
                        <th className="text-left py-3 px-4">Joined</th>
                        <th className="text-left py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4">{user.id}</td>
                          <td className="py-3 px-4">{user.name}</td>
                          <td className="py-3 px-4">{user.email}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              user.role === "admin" 
                                ? "bg-purple-100 text-purple-800" 
                                : "bg-gray-100 text-gray-800"
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              user.userType === "both" 
                                ? "bg-blue-100 text-blue-800" 
                                : user.userType === "seller"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}>
                              {user.userType}
                            </span>
                          </td>
                          <td className="py-3 px-4">{user.joined}</td>
                          <td className="py-3 px-4">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm">
                                  Actions <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => toast({ title: "User Profile", description: `Viewing ${user.name}'s profile` })}>
                                  View Profile
                                </DropdownMenuItem>
                                {user.role === "user" ? (
                                  <DropdownMenuItem onClick={() => changeUserRole(user.id, "admin")}>
                                    Make Admin
                                  </DropdownMenuItem>
                                ) : (
                                  <DropdownMenuItem onClick={() => changeUserRole(user.id, "user")}>
                                    Remove Admin
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem onClick={() => toast({ title: "User Suspended", description: `${user.name} has been suspended` })} className="text-red-600">
                                  Suspend User
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
