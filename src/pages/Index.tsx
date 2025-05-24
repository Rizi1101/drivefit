
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedVehicles from "@/components/FeaturedVehicles";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <FeaturedVehicles />
      <HowItWorks />
      <Testimonials />
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Index;
