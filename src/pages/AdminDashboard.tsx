import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { ChevronDown, Settings, Car, User, Users, BarChart, RefreshCw } from "lucide-react";
import { vehicleService } from "@/services/supabaseService";

type Vehicle = {
  id: number;
  title: string;
  price: string;
  priceNumber: number;
  location: string;
  status: "active" | "pending" | "sold";
  seller: string;
  dateAdded: string;
  image?: string;
  created_at?: string;
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
  const navigate = useNavigate();
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [isRealTimeConnected, setIsRealTimeConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  
  useEffect(() => {
    // Check if admin is logged in
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail || userEmail !== "admin@drivefit.com") {
      navigate("/signin");
    }
  }, [navigate]);

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoadingVehicles, setIsLoadingVehicles] = useState(true);

  // Load vehicles and set up real-time subscription
  useEffect(() => {
    loadVehicles();
    
    // Set up real-time subscription
    const subscription = vehicleService.subscribeToChanges((payload) => {
      console.log('Real-time vehicle change:', payload);
      setLastUpdate(new Date());
      
      if (payload.eventType === 'INSERT') {
        setVehicles(prev => [payload.new, ...prev]);
        toast({
          title: "New Vehicle Added",
          description: `${payload.new.title} has been added to the platform`,
        });
      } else if (payload.eventType === 'UPDATE') {
        setVehicles(prev => prev.map(vehicle => 
          vehicle.id === payload.new.id ? payload.new : vehicle
        ));
        toast({
          title: "Vehicle Updated",
          description: `${payload.new.title} has been updated`,
        });
      } else if (payload.eventType === 'DELETE') {
        setVehicles(prev => prev.filter(vehicle => vehicle.id !== payload.old.id));
        toast({
          title: "Vehicle Removed",
          description: `Vehicle has been removed from the platform`,
        });
      }
    });

    setIsRealTimeConnected(true);
    console.log('Real-time connection established');

    return () => {
      subscription.unsubscribe();
      setIsRealTimeConnected(false);
      console.log('Real-time connection closed');
    };
  }, []);

  const loadVehicles = async () => {
    setIsLoadingVehicles(true);
    try {
      const { data } = await vehicleService.getAllVehicles();
      if (data) {
        setVehicles(data);
        console.log('Vehicles loaded:', data);
      }
    } catch (error) {
      console.error('Failed to load vehicles:', error);
      toast({
        title: "Error",
        description: "Failed to load vehicles",
        variant: "destructive",
      });
    } finally {
      setIsLoadingVehicles(false);
    }
  };

  const [payments, setPayments] = useState([
    {
      id: "PAY-001",
      amount: "PKR 5,000",
      status: "completed",
      date: "2024-05-15",
      customer: "Ahmed Khan",
      method: "Bank Transfer"
    },
    {
      id: "PAY-002",
      amount: "PKR 3,500",
      status: "pending",
      date: "2024-05-16",
      customer: "Sara Malik",
      method: "EasyPaisa"
    },
    {
      id: "PAY-003",
      amount: "PKR 8,000",
      status: "completed",
      date: "2024-05-14",
      customer: "Umar Farooq",
      method: "JazzCash"
    },
  ]);

  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "Ahmed Khan", email: "ahmed@example.com", role: "user", userType: "buyer", joined: "2024-04-10" },
    { id: 2, name: "Fatima Ali", email: "fatima@example.com", role: "user", userType: "seller", joined: "2024-04-15" },
    { id: 3, name: "Bilal Ahmed", email: "bilal@example.com", role: "admin", userType: "both", joined: "2024-03-20" },
    { id: 4, name: "Sara Malik", email: "sara@example.com", role: "user", userType: "both", joined: "2024-05-01" },
    { id: 5, name: "Rizwan Qamar", email: "rizwanqamar889@gmail.com", role: "user", userType: "both", joined: "2024-05-12" },
  ]);

  const [settings, setSettings] = useState({
    siteName: "DriveFit",
    allowNewRegistrations: true,
    requireEmailVerification: false,
    autoApproveListings: false,
    featuredListingPrice: "PKR 500",
    commissionRate: "2.5%",
  });

  const approveVehicle = async (id: number) => {
    try {
      await vehicleService.updateVehicle(id, { status: "active" });
      // Real-time will handle the UI update
      toast({
        title: "Vehicle Approved",
        description: `Vehicle #${id} has been approved and is now active.`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve vehicle",
        variant: "destructive",
      });
    }
  };

  const rejectVehicle = async (id: number) => {
    try {
      await vehicleService.deleteVehicle(id);
      // Real-time will handle the UI update
      toast({
        title: "Vehicle Rejected",
        description: `Vehicle #${id} has been rejected and removed from the listings.`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject vehicle",
        variant: "destructive",
      });
    }
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

  const handleSettingChange = (setting: string, value: any) => {
    setSettings({
      ...settings,
      [setting]: value
    });
    
    toast({
      title: "Setting Updated",
      description: `${setting} has been updated successfully.`
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-drivefit-black">Admin Dashboard</h1>
            <div className="flex items-center gap-2 mt-2">
              <div className={`w-2 h-2 rounded-full ${isRealTimeConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-sm text-gray-600">
                Real-time {isRealTimeConnected ? 'Connected' : 'Disconnected'}
              </span>
              <span className="text-xs text-gray-500">
                Last update: {lastUpdate.toLocaleTimeString()}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={loadVehicles}
              disabled={isLoadingVehicles}
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${isLoadingVehicles ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button 
              onClick={() => setShowSettingsDialog(true)}
              className="bg-drivefit-orange hover:bg-drivefit-orange/90"
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border border-drivefit-orange/20 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-drivefit-black">
                <Car className="mr-2 h-5 w-5 text-drivefit-orange" />
                Total Vehicles
              </CardTitle>
              <CardDescription>Active vehicle listings</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-drivefit-orange">{vehicles.length}</p>
              <p className="text-sm text-gray-600">Real-time updates</p>
            </CardContent>
          </Card>
          
          <Card className="border border-drivefit-blue/20 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-drivefit-black">
                <Users className="mr-2 h-5 w-5 text-drivefit-blue" />
                Total Users
              </CardTitle>
              <CardDescription>Registered users</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-drivefit-blue">{users.length}</p>
              <p className="text-sm text-gray-600">+1 new today</p>
            </CardContent>
          </Card>
          
          <Card className="border border-green-500/20 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-drivefit-black">
                <BarChart className="mr-2 h-5 w-5 text-green-600" />
                Revenue
              </CardTitle>
              <CardDescription>Monthly earnings</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-green-600">PKR 45,000</p>
              <p className="text-sm text-gray-600">+12% from last month</p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="vehicles" className="w-full">
          <TabsList className="w-full mb-6 bg-drivefit-gray">
            <TabsTrigger value="vehicles" className="flex-1 data-[state=active]:bg-drivefit-orange data-[state=active]:text-white">Vehicle Listings</TabsTrigger>
            <TabsTrigger value="payments" className="flex-1 data-[state=active]:bg-drivefit-orange data-[state=active]:text-white">Payments</TabsTrigger>
            <TabsTrigger value="users" className="flex-1 data-[state=active]:bg-drivefit-orange data-[state=active]:text-white">User Management</TabsTrigger>
          </TabsList>
          
          <TabsContent value="vehicles">
            <Card className="border border-gray-200">
              <CardHeader className="bg-drivefit-gray/50">
                <CardTitle className="text-drivefit-black">Vehicle Listings</CardTitle>
                <CardDescription>Manage all vehicle listings on the platform - Real-time updates enabled</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-drivefit-gray/30">
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold text-drivefit-black">ID</th>
                        <th className="text-left py-3 px-4 w-16 font-semibold text-drivefit-black">Image</th>
                        <th className="text-left py-3 px-4 font-semibold text-drivefit-black">Vehicle</th>
                        <th className="text-left py-3 px-4 font-semibold text-drivefit-black">Price</th>
                        <th className="text-left py-3 px-4 font-semibold text-drivefit-black">Location</th>
                        <th className="text-left py-3 px-4 font-semibold text-drivefit-black">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-drivefit-black">Seller</th>
                        <th className="text-left py-3 px-4 font-semibold text-drivefit-black">Date Added</th>
                        <th className="text-left py-3 px-4 font-semibold text-drivefit-black">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vehicles.map((vehicle) => (
                        <tr key={vehicle.id} className="border-b hover:bg-drivefit-gray/20 transition-colors">
                          <td className="py-3 px-4 text-drivefit-black">{vehicle.id}</td>
                          <td className="py-3 px-4">
                            {vehicle.image && (
                              <img 
                                src={vehicle.image} 
                                alt={vehicle.title}
                                className="w-12 h-12 object-cover rounded border border-drivefit-orange/20"
                              />
                            )}
                          </td>
                          <td className="py-3 px-4 text-drivefit-black font-medium">{vehicle.title}</td>
                          <td className="py-3 px-4 text-drivefit-orange font-bold">{vehicle.price}</td>
                          <td className="py-3 px-4 text-drivefit-black">{vehicle.location}</td>
                          <td className="py-3 px-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              vehicle.status === "active" 
                                ? "bg-green-100 text-green-800 border border-green-200" 
                                : vehicle.status === "pending" 
                                ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                                : "bg-blue-100 text-blue-800 border border-blue-200"
                            }`}>
                              {vehicle.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-drivefit-black">{vehicle.seller}</td>
                          <td className="py-3 px-4 text-drivefit-black">{vehicle.dateAdded}</td>
                          <td className="py-3 px-4">
                            {vehicle.status === "pending" ? (
                              <div className="flex gap-2">
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  onClick={() => approveVehicle(vehicle.id)}
                                  className="border-green-300 text-green-700 hover:bg-green-50"
                                >
                                  Approve
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  onClick={() => rejectVehicle(vehicle.id)}
                                  className="border-red-300 text-red-700 hover:bg-red-50"
                                >
                                  Reject
                                </Button>
                              </div>
                            ) : (
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="outline" size="sm" className="border-drivefit-orange/30 text-drivefit-orange hover:bg-drivefit-orange/10">
                                    Actions <ChevronDown className="ml-2 h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="bg-white border border-gray-200">
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
            <Card className="border border-gray-200">
              <CardHeader className="bg-drivefit-gray/50">
                <CardTitle className="text-drivefit-black">Payment Management</CardTitle>
                <CardDescription>Process and track payments on the platform</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-drivefit-gray/30">
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold text-drivefit-black">ID</th>
                        <th className="text-left py-3 px-4 font-semibold text-drivefit-black">Amount</th>
                        <th className="text-left py-3 px-4 font-semibold text-drivefit-black">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-drivefit-black">Date</th>
                        <th className="text-left py-3 px-4 font-semibold text-drivefit-black">Customer</th>
                        <th className="text-left py-3 px-4 font-semibold text-drivefit-black">Method</th>
                        <th className="text-left py-3 px-4 font-semibold text-drivefit-black">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map((payment) => (
                        <tr key={payment.id} className="border-b hover:bg-drivefit-gray/20 transition-colors">
                          <td className="py-3 px-4 text-drivefit-black">{payment.id}</td>
                          <td className="py-3 px-4 text-drivefit-orange font-bold">{payment.amount}</td>
                          <td className="py-3 px-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              payment.status === "completed" 
                                ? "bg-green-100 text-green-800 border border-green-200" 
                                : "bg-yellow-100 text-yellow-800 border border-yellow-200"
                            }`}>
                              {payment.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-drivefit-black">{payment.date}</td>
                          <td className="py-3 px-4 text-drivefit-black">{payment.customer}</td>
                          <td className="py-3 px-4 text-drivefit-black">{payment.method}</td>
                          <td className="py-3 px-4">
                            {payment.status === "pending" ? (
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => processPayment(payment.id)}
                                className="border-drivefit-orange/30 text-drivefit-orange hover:bg-drivefit-orange/10"
                              >
                                Process
                              </Button>
                            ) : (
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => toast({ title: "Details", description: `Viewing details for ${payment.id}` })}
                                className="border-drivefit-blue/30 text-drivefit-blue hover:bg-drivefit-blue/10"
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
            <Card className="border border-gray-200">
              <CardHeader className="bg-drivefit-gray/50">
                <CardTitle className="text-drivefit-black">User Management</CardTitle>
                <CardDescription>Manage users on the platform</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-drivefit-gray/30">
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold text-drivefit-black">ID</th>
                        <th className="text-left py-3 px-4 font-semibold text-drivefit-black">Name</th>
                        <th className="text-left py-3 px-4 font-semibold text-drivefit-black">Email</th>
                        <th className="text-left py-3 px-4 font-semibold text-drivefit-black">Role</th>
                        <th className="text-left py-3 px-4 font-semibold text-drivefit-black">Type</th>
                        <th className="text-left py-3 px-4 font-semibold text-drivefit-black">Joined</th>
                        <th className="text-left py-3 px-4 font-semibold text-drivefit-black">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-b hover:bg-drivefit-gray/20 transition-colors">
                          <td className="py-3 px-4 text-drivefit-black">{user.id}</td>
                          <td className="py-3 px-4 text-drivefit-black font-medium">{user.name}</td>
                          <td className="py-3 px-4 text-drivefit-black">{user.email}</td>
                          <td className="py-3 px-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              user.role === "admin" 
                                ? "bg-purple-100 text-purple-800 border border-purple-200" 
                                : "bg-gray-100 text-gray-800 border border-gray-200"
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              user.userType === "both" 
                                ? "bg-blue-100 text-blue-800 border border-blue-200" 
                                : user.userType === "seller"
                                ? "bg-green-100 text-green-800 border border-green-200"
                                : "bg-yellow-100 text-yellow-800 border border-yellow-200"
                            }`}>
                              {user.userType}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-drivefit-black">{user.joined}</td>
                          <td className="py-3 px-4">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="border-drivefit-orange/30 text-drivefit-orange hover:bg-drivefit-orange/10">
                                  Actions <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="bg-white border border-gray-200">
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
      
      {/* Settings Dialog */}
      <Dialog open={showSettingsDialog} onOpenChange={setShowSettingsDialog}>
        <DialogContent className="sm:max-w-md bg-white border border-gray-200">
          <DialogHeader>
            <DialogTitle className="text-drivefit-black">Admin Settings</DialogTitle>
            <DialogDescription className="text-gray-600">
              Configure your DriveFit platform settings
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-3 items-center gap-4">
              <label className="text-right text-sm font-medium text-drivefit-black">Site Name</label>
              <input 
                type="text"
                value={settings.siteName}
                onChange={(e) => handleSettingChange("siteName", e.target.value)}
                className="col-span-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-drivefit-black focus:border-drivefit-orange focus:outline-none focus:ring-1 focus:ring-drivefit-orange"
              />
            </div>
            
            <div className="grid grid-cols-3 items-center gap-4">
              <label className="text-right text-sm font-medium text-drivefit-black">Allow Registrations</label>
              <div className="col-span-2 flex items-center space-x-2">
                <input 
                  type="checkbox"
                  checked={settings.allowNewRegistrations}
                  onChange={(e) => handleSettingChange("allowNewRegistrations", e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-drivefit-orange focus:ring-drivefit-orange"
                />
                <span className="text-sm text-drivefit-black">Enable new user registrations</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 items-center gap-4">
              <label className="text-right text-sm font-medium text-drivefit-black">Email Verification</label>
              <div className="col-span-2 flex items-center space-x-2">
                <input 
                  type="checkbox"
                  checked={settings.requireEmailVerification}
                  onChange={(e) => handleSettingChange("requireEmailVerification", e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-drivefit-orange focus:ring-drivefit-orange"
                />
                <span className="text-sm text-drivefit-black">Require email verification</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 items-center gap-4">
              <label className="text-right text-sm font-medium text-drivefit-black">Auto-Approve</label>
              <div className="col-span-2 flex items-center space-x-2">
                <input 
                  type="checkbox"
                  checked={settings.autoApproveListings}
                  onChange={(e) => handleSettingChange("autoApproveListings", e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-drivefit-orange focus:ring-drivefit-orange"
                />
                <span className="text-sm text-drivefit-black">Auto-approve new vehicle listings</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 items-center gap-4">
              <label className="text-right text-sm font-medium text-drivefit-black">Featured Price</label>
              <input 
                type="text"
                value={settings.featuredListingPrice}
                onChange={(e) => handleSettingChange("featuredListingPrice", e.target.value)}
                className="col-span-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-drivefit-black focus:border-drivefit-orange focus:outline-none focus:ring-1 focus:ring-drivefit-orange"
              />
            </div>
            
            <div className="grid grid-cols-3 items-center gap-4">
              <label className="text-right text-sm font-medium text-drivefit-black">Commission Rate</label>
              <input 
                type="text"
                value={settings.commissionRate}
                onChange={(e) => handleSettingChange("commissionRate", e.target.value)}
                className="col-span-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-drivefit-black focus:border-drivefit-orange focus:outline-none focus:ring-1 focus:ring-drivefit-orange"
              />
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" className="border-gray-300 text-drivefit-black hover:bg-gray-50">Cancel</Button>
            </DialogClose>
            <Button 
              type="submit" 
              onClick={() => {
                toast({
                  title: "Settings Saved",
                  description: "Your platform settings have been updated successfully."
                });
                setShowSettingsDialog(false);
              }}
              className="bg-drivefit-orange hover:bg-drivefit-orange/90 text-white"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
