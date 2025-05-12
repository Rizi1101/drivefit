
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check authentication status
    const userEmail = localStorage.getItem("userEmail");
    
    if (!userEmail) {
      navigate("/signin");
    } else if (userEmail === "admin@drivefit.com") {
      navigate("/admin");
    } else {
      navigate("/user-dashboard");
    }

    // Add a small delay to show loading state
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [navigate]);
  
  // Show loading indicator while redirecting
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader className="h-12 w-12 animate-spin text-drivefit-blue" />
        <p className="mt-4 text-lg">Loading your dashboard...</p>
      </div>
    );
  }
  
  return null; // This component just redirects
};

export default Dashboard;
