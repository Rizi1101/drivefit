
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import AuthPrompt from "./AuthPrompt";
import { toast } from "@/hooks/use-toast";

interface BuyButtonProps {
  vehicleId: number;
  price: string;
  title: string;
}

const BuyButton = ({ vehicleId, price, title = "Vehicle" }: BuyButtonProps) => {
  const navigate = useNavigate();
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Check user type on component mount and whenever it might change
    const checkUserType = () => {
      const storedUserType = localStorage.getItem("userType");
      console.log("Current user type:", storedUserType);
      setUserType(storedUserType);
      setIsLoading(false);
    };
    
    checkUserType();
    
    // Add event listener for storage changes (in case user updates profile in another tab)
    window.addEventListener('storage', checkUserType);
    
    return () => {
      window.removeEventListener('storage', checkUserType);
    };
  }, []);
  
  const handleBuyClick = () => {
    const userEmail = localStorage.getItem("userEmail");
    
    if (!userEmail) {
      // User is not logged in, show auth prompt
      setShowAuthPrompt(true);
      return;
    }
    
    // Check if user is a buyer or both
    console.log("Attempting purchase with user type:", userType);
    if (userType === "buyer" || userType === "both") {
      // User is logged in and can buy, proceed to payment
      toast({
        title: "Processing Purchase",
        description: `Preparing ${title} for checkout`
      });
      
      navigate("/payment", { 
        state: { vehicleId, price, title } 
      });
    } else {
      // User is logged in but is a seller only
      toast({
        title: "Account Type Restriction",
        description: "You need a buyer account to purchase vehicles",
        variant: "destructive"
      });
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
