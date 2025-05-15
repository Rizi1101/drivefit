import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const signInSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
});

type SignInValues = z.infer<typeof signInSchema>;

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: SignInValues) => {
    // In a real app, this would call an authentication API
    console.log("Sign in values:", values);
    
    // Store the email in localStorage to maintain session
    localStorage.setItem("userEmail", values.email);
    
    // Set default user type as "both" to allow buying and selling
    localStorage.setItem("userType", "both");
    
    // Determine if user is admin or regular user based on email
    // In a real application, this would be determined by the backend
    const isAdmin = values.email === "admin@drivefit.com";
    
    toast({
      title: "Sign in successful",
      description: "Welcome back to DriveFit!",
    });
    
    // Check if there's a pending purchase
    const pendingPurchase = localStorage.getItem("pendingPurchase");
    
    setTimeout(() => {
      if (pendingPurchase) {
        // Clear the pending purchase from localStorage
        localStorage.removeItem("pendingPurchase");
        const purchaseDetails = JSON.parse(pendingPurchase);
        
        // Navigate back to the vehicle page or directly to payment
        if (purchaseDetails.returnUrl) {
          navigate(purchaseDetails.returnUrl);
        } else {
          navigate("/payment", { 
            state: { 
              vehicleId: purchaseDetails.vehicleId,
              price: purchaseDetails.price,
              title: purchaseDetails.title 
            } 
          });
        }
      } else if (isAdmin) {
        navigate("/admin");
      } else {
        navigate("/user-dashboard");
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center bg-drivefit-gray py-12">
        <div className="w-full max-w-md px-4">
          <Card className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold">Welcome Back</h1>
              <p className="text-gray-600 mt-2">Sign in to your DriveFit account</p>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="email@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remember-me"
                      className="h-4 w-4 rounded border-gray-300 text-drivefit-blue focus:ring-drivefit-blue"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Remember me
                    </label>
                  </div>
                  
                  <div className="text-sm">
                    <Link
                      to="/forgot-password"
                      className="text-drivefit-blue hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>
                
                <Button type="submit" className="w-full bg-drivefit-blue hover:bg-drivefit-blue/90">
                  Sign In
                </Button>
                
                <div className="text-center mt-4">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-drivefit-red hover:underline">
                      Sign up
                    </Link>
                  </p>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-500 mb-2">For testing purposes:</p>
                    <p className="text-xs text-gray-500">Admin: admin@drivefit.com / password123</p>
                    <p className="text-xs text-gray-500">User: user@drivefit.com / password123</p>
                  </div>
                </div>
              </form>
            </Form>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SignIn;
