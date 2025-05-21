
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import AuthPrompt from "./AuthPrompt";
import { toast } from "@/hooks/use-toast";
import { useUserData } from "@/hooks/use-user-data";

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
  const [userType, setUserType] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
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
  
  const handleBuyClick = () => {
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
      return;
    }
    
    // Check if user is a buyer or has dual role
    if (!userType || userType === "buyer" || userType === "both") {
      toast({
        title: "Processing Purchase",
        description: `Preparing ${title} for checkout`
      });
      
      // Record activity
      addActivity("Started purchase", title);
      
      // Ensure data is refreshed before navigation
      refreshUserData();
      
      navigate("/payment", { 
        state: { vehicleId, price, title } 
      });
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
      
      // Proceed with purchase after a small delay
      setTimeout(() => {
        navigate("/payment", { 
          state: { vehicleId, price, title } 
        });
      }, 1000);
    }
  };
  
  return (
    <>
      <Button 
        onClick={handleBuyClick} 
        disabled={isLoading}
        className="w-full bg-drivefit-blue hover:bg-drivefit-blue/90 text-white py-3 px-4 rounded flex items-center justify-center"
      >
        <ShoppingCart className="mr-2 h-5 w-5" />
        Buy Now
      </Button>
      
      <AuthPrompt 
        isOpen={showAuthPrompt} 
        onClose={() => setShowAuthPrompt(false)}
        action="buy"
      />
    </>
  );
};

export default BuyButton;
