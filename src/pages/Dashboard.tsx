
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // In a real app, this would check authentication status
    // and redirect based on stored user role
    const userEmail = localStorage.getItem("userEmail");
    
    if (!userEmail) {
      navigate("/signin");
    } else if (userEmail === "admin@drivefit.com") {
      navigate("/admin");
    } else {
      navigate("/user-dashboard");
    }
  }, [navigate]);
  
  return null; // This component just redirects
};

export default Dashboard;
