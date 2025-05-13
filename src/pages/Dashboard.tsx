
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Loader } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check authentication status
    const userEmail = localStorage.getItem("userEmail");
    
    if (!userEmail) {
      navigate("/signin");
      return;
    } 
    
    if (userEmail === "admin@drivefit.com") {
      navigate("/admin");
      return;
    }
    
    // Get current userType from localStorage
    let userType = localStorage.getItem("userType");
    
    // Update localStorage with userType from URL state if provided
    const urlParams = new URLSearchParams(window.location.search);
    const typeFromUrl = urlParams.get('type');
    
    if (typeFromUrl && ['buyer', 'seller', 'both'].includes(typeFromUrl)) {
      userType = typeFromUrl;
      localStorage.setItem("userType", typeFromUrl);
      console.log("Setting user type from URL:", typeFromUrl);
    }
    
    // If no user type is set, don't set a default
    // Let the user choose their account type in the dashboard
    if (!userType) {
      console.log("No user type found, user will need to select one");
    }
    
    navigate("/user-dashboard");

    // Add a small delay to show loading state
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [navigate]);
  
  // Show loading indicator while redirecting
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black to-drivefit-green/90">
        <div className="glass-effect p-8 rounded-2xl animate-scale-in">
          <Loader className="h-16 w-16 animate-spin text-white mx-auto" />
          <p className="mt-6 text-xl text-white font-light">Loading your dashboard...</p>
        </div>
      </div>
    );
  }
  
  return null; // This component just redirects
};

export default Dashboard;
