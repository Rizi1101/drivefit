import React, { useEffect } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useUserData } from "@/hooks/use-user-data";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addTransaction, refreshUserData } = useUserData();
  
  // Get transaction ID from state or generate a new one
  const transactionId = location.state?.transactionId || "TXN" + Math.floor(Math.random() * 1000000);
  const date = new Date().toLocaleDateString("en-PK");
  
  // Get vehicle data from state, ensuring we have the actual price
  const vehicleData = location.state || {
    title: "Vehicle Purchase",
    price: "PKR 3,000"
  };
  
  useEffect(() => {
    // Record the transaction in the user's data
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      // Add transaction to user's account
      addTransaction({
        id: Date.now(),
        vehicleTitle: vehicleData.title,
        price: vehicleData.price,
        date: date,
        status: "completed",
        transactionId: transactionId
      });
      
      console.log("Recording transaction for user:", userEmail);
      
      // Clear any pending purchase
      localStorage.removeItem("pendingPurchase");
      sessionStorage.removeItem("pendingOperation");
      
      // Refresh user data to update stats
      refreshUserData();
    }
    
    // Show success notification
    toast({
      title: "Transaction Completed",
      description: "Your vehicle purchase was successful",
    });
  }, [addTransaction, date, transactionId, vehicleData.price, vehicleData.title, refreshUserData]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow py-12 flex items-center justify-center px-4 bg-drivefit-white">
        <Card className="max-w-md w-full border-drivefit-orange/20">
          <CardHeader className="flex flex-col items-center pb-6">
            <div className="h-16 w-16 bg-drivefit-orange/10 rounded-full flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-drivefit-orange" />
            </div>
            <h1 className="text-2xl font-bold text-center text-drivefit-black">Payment Successful!</h1>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-drivefit-orange/5 p-4 rounded-lg border border-drivefit-orange/10 text-center">
              <p className="text-drivefit-black font-medium">Thank you for your payment</p>
              <p className="text-sm text-drivefit-orange mt-1">Your transaction has been completed successfully</p>
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
                <span className="font-medium">{vehicleData.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Amount:</span>
                <span className="font-medium text-drivefit-orange">{vehicleData.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Payment Method:</span>
                <span className="font-medium">Bank Transfer</span>
              </div>
            </div>
            
            <div className="text-center space-y-3 pt-4">
              <Button 
                className="w-full bg-drivefit-orange hover:bg-drivefit-orange/90 text-white" 
                onClick={() => navigate("/vehicles")}
              >
                Continue Browsing
              </Button>
              <Button 
                variant="outline" 
                className="w-full border-drivefit-orange text-drivefit-orange hover:bg-drivefit-orange hover:text-white"
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
