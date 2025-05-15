
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus } from "lucide-react";

interface AuthPromptProps {
  isOpen: boolean;
  onClose: () => void;
  action: "buy" | "sell";
}

const AuthPrompt = ({ isOpen, onClose, action }: AuthPromptProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleSignIn = () => {
    // No need to pass state, as we're already storing pending purchase in localStorage
    navigate("/signin");
    onClose();
  };
  
  const handleSignUp = () => {
    // Create account with appropriate permissions based on action
    navigate("/signup", { 
      state: { 
        suggestedUserType: action === "buy" ? "both" : "seller",
        redirectAfterSignup: true
      } 
    });
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Account Required</DialogTitle>
          <DialogDescription>
            {action === "buy" 
              ? "You need to be signed in to purchase vehicles on DriveFit." 
              : "You need to be signed in as a seller to list vehicles on DriveFit."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <Button
            variant="outline"
            onClick={handleSignIn}
            className="flex items-center justify-center"
          >
            <LogIn className="mr-2 h-4 w-4" />
            Sign In
          </Button>
          <Button
            onClick={handleSignUp}
            className="bg-drivefit-red hover:bg-drivefit-red/90 flex items-center justify-center"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Create Account
          </Button>
        </div>
        <div className="text-sm text-center text-gray-500 mt-2">
          {action === "buy" 
            ? "Sign in or create an account to continue with your purchase." 
            : "Sign in or create a seller account to list your vehicles for sale."}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthPrompt;
