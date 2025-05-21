import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Calendar, CreditCard } from "lucide-react";
import AuthPrompt from "./AuthPrompt";
import { toast } from "@/hooks/use-toast";
import { useUserData } from "@/hooks/use-user-data";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BuyButtonProps {
  vehicleId: number;
  price: string;
  title: string;
}

const BuyButton = ({ vehicleId, price, title = "Vehicle" }: BuyButtonProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addActivity, refreshUserData } = useUserData();
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [showBookVisitDialog, setShowBookVisitDialog] = useState(false);
  const [showTokenDialog, setShowTokenDialog] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [visitDate, setVisitDate] = useState("");
  const [visitTime, setVisitTime] = useState("");
  const [receiptImage, setReceiptImage] = useState<File | null>(null);
  
  useEffect(() => {
    // Check authentication status and user type on component mount
    const checkUserAuth = () => {
      const email = localStorage.getItem("userEmail");
      const type = localStorage.getItem("userType");
      
      setUserEmail(email);
      setUserType(type);
      setIsLoading(false);
      
      console.log("Auth check - Email:", email, "Type:", type);
    };
    
    checkUserAuth();
    
    // Listen for changes in localStorage (in case user updates profile in another tab)
    window.addEventListener('storage', checkUserAuth);
    
    return () => {
      window.removeEventListener('storage', checkUserAuth);
    };
  }, []);
  
  const handleAuthCheck = (action: string) => {
    // If not logged in, show auth prompt and store current vehicle details
    if (!userEmail) {
      // Save current vehicle details to localStorage for after login
      localStorage.setItem("pendingPurchase", JSON.stringify({
        vehicleId,
        price,
        title,
        returnUrl: location.pathname
      }));
      
      setShowAuthPrompt(true);
      return false;
    }
    
    // Check if user is a buyer or has dual role
    if (!userType || userType === "buyer" || userType === "both") {
      return true;
    } else {
      // User is logged in but is a seller only
      // We'll now update the user type instead of just showing restriction
      localStorage.setItem("userType", "both");
      setUserType("both");
      
      toast({
        title: "Account Updated",
        description: "Your account has been updated to allow purchases"
      });
      
      // Record activity
      addActivity("Account type updated", "Changed to buyer and seller");
      
      // Ensure data is refreshed before navigation
      refreshUserData();
      return true;
    }
  };

  const handleFullPurchase = () => {
    if (!handleAuthCheck("buy")) return;
    
    toast({
      title: "Processing Purchase",
      description: `Preparing ${title} for checkout`
    });
    
    // Record activity
    addActivity("Started purchase", title);
    
    // Ensure data is refreshed before navigation
    refreshUserData();
    
    // Pass the complete vehicle information to the payment page
    navigate("/payment", { 
      state: { 
        vehicleId, 
        price, 
        title,
        transactionId: "TXN" + Math.floor(Math.random() * 1000000)
      } 
    });
  };
  
  const handleTokenPayment = () => {
    if (!handleAuthCheck("token")) return;
    setShowTokenDialog(true);
  };
  
  const handleBookVisit = () => {
    if (!handleAuthCheck("visit")) return;
    setShowBookVisitDialog(true);
  };
  
  const processTokenPayment = () => {
    if (!receiptImage) {
      toast({
        title: "Receipt Required",
        description: "Please upload your payment slip to continue",
        variant: "destructive"
      });
      return;
    }
    
    // Record activity
    addActivity("Token payment", `Paid token for ${title}`);
    refreshUserData();
    
    setShowTokenDialog(false);
    
    toast({
      title: "Token Payment Received",
      description: "We've received your token payment, the seller will contact you shortly"
    });
  };
  
  const processBookVisit = () => {
    if (!visitDate || !visitTime) {
      toast({
        title: "Date and Time Required",
        description: "Please select your preferred date and time",
        variant: "destructive"
      });
      return;
    }
    
    // Record activity
    addActivity("Visit booked", `Visit scheduled for ${title} on ${visitDate} at ${visitTime}`);
    refreshUserData();
    
    setShowBookVisitDialog(false);
    
    toast({
      title: "Visit Scheduled",
      description: `Your visit is scheduled for ${visitDate} at ${visitTime}. The seller will confirm shortly.`
    });
  };
  
  return (
    <>
      <div className="flex flex-col gap-2 w-full">
        <Button 
          onClick={handleFullPurchase} 
          disabled={isLoading}
          className="w-full bg-drivefit-orange hover:bg-drivefit-orange/90 text-white py-3 px-4 rounded flex items-center justify-center"
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          Buy Now
        </Button>
        
        <Button
          onClick={handleTokenPayment}
          disabled={isLoading}
          variant="outline"
          className="w-full border-drivefit-orange text-drivefit-orange hover:bg-drivefit-orange hover:text-white py-3 px-4 rounded flex items-center justify-center"
        >
          <CreditCard className="mr-2 h-5 w-5" />
          Pay Token (5,000 PKR)
        </Button>
        
        <Button
          onClick={handleBookVisit}
          disabled={isLoading}
          variant="outline"
          className="w-full border-drivefit-black text-drivefit-black hover:bg-drivefit-black hover:text-white py-3 px-4 rounded flex items-center justify-center"
        >
          <Calendar className="mr-2 h-5 w-5" />
          Book a Visit
        </Button>
      </div>
      
      <AuthPrompt 
        isOpen={showAuthPrompt} 
        onClose={() => setShowAuthPrompt(false)}
        action="buy"
      />
      
      <Dialog open={showTokenDialog} onOpenChange={setShowTokenDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Pay Token - 5,000 PKR</DialogTitle>
            <DialogDescription>
              Pay a token amount to reserve this vehicle. Upload your payment slip after making the transfer.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
              <p className="text-sm text-blue-800">
                Please transfer <strong>5,000 PKR</strong> to our account:
              </p>
              <p className="text-sm mt-2">
                <strong>Account Title:</strong> DriveFit Pakistan<br />
                <strong>Account Number:</strong> 12345-6789012-34<br />
                <strong>Bank:</strong> HBL Bank
              </p>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="receipt" className="font-medium">Upload Payment Slip <span className="text-red-500">*</span></Label>
              <Input 
                id="receipt" 
                type="file" 
                accept="image/*" 
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setReceiptImage(e.target.files[0]);
                  }
                }}
              />
              <p className="text-sm text-gray-500">Payment slip is required to confirm your token.</p>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowTokenDialog(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={processTokenPayment}
              className="bg-drivefit-orange hover:bg-drivefit-orange/90 text-white"
            >
              Submit Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={showBookVisitDialog} onOpenChange={setShowBookVisitDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Book a Visit</DialogTitle>
            <DialogDescription>
              Schedule a visit to inspect the vehicle in person.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="visit-date">Preferred Date</Label>
              <Input 
                id="visit-date" 
                type="date" 
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="visit-time">Preferred Time</Label>
              <Input 
                id="visit-time" 
                type="time" 
                value={visitTime}
                onChange={(e) => setVisitTime(e.target.value)}
              />
            </div>
            
            <p className="text-sm text-gray-500">
              The seller will confirm the appointment availability. You'll receive a notification once confirmed.
            </p>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowBookVisitDialog(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={processBookVisit}
              className="bg-drivefit-orange hover:bg-drivefit-orange/90 text-white"
            >
              Schedule Visit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BuyButton;
