
import { useState } from "react";
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
  
  const handleBuyClick = () => {
    const userEmail = localStorage.getItem("userEmail");
    
    if (userEmail) {
      // User is logged in, proceed to payment
      toast({
        title: "Processing Purchase",
        description: `Preparing ${title} for checkout`
      });
      
      navigate("/payment", { 
        state: { vehicleId, price, title } 
      });
    } else {
      // User is not logged in, show auth prompt
      setShowAuthPrompt(true);
    }
  };
  
  return (
    <>
      <Button 
        onClick={handleBuyClick} 
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
