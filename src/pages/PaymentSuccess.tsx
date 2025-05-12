
import React, { useEffect } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const transactionId = "TXN" + Math.floor(Math.random() * 1000000);
  const date = new Date().toLocaleDateString("en-PK");
  
  // Get payment data from state or use default values
  const vehicleData = location.state?.vehicleData || {
    title: "Vehicle Purchase",
    price: "PKR 3,000"
  };
  
  useEffect(() => {
    // In a real app, we would update the database with the transaction
    // This would include updating the vehicle status as sold and recording the transaction
    
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      // Record transaction in user's account
      console.log("Recording transaction for user:", userEmail);
    }
    
    // Show success notification
    toast({
      title: "Transaction Completed",
      description: "Your vehicle purchase was successful",
    });
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow py-12 flex items-center justify-center px-4">
        <Card className="max-w-md w-full">
          <CardHeader className="flex flex-col items-center pb-6">
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-center">Payment Successful!</h1>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-100 text-center">
              <p className="text-green-800">Thank you for your payment</p>
              <p className="text-sm text-green-600 mt-1">Your transaction has been completed successfully</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Transaction ID:</span>
                <span className="font-medium">{transactionId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Date:</span>
                <span className="font-medium">{date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Vehicle:</span>
                <span className="font-medium">{vehicleData.title || "Vehicle Purchase"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Amount:</span>
                <span className="font-medium">{vehicleData.price || "PKR 3,000"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Payment Method:</span>
                <span className="font-medium">Bank Transfer</span>
              </div>
            </div>
            
            <div className="text-center space-y-3 pt-4">
              <Button 
                className="w-full" 
                onClick={() => navigate("/vehicles")}
              >
                Continue Browsing
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate("/user-dashboard")}
              >
                View My Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default PaymentSuccess;
