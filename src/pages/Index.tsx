
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedVehicles from "@/components/FeaturedVehicles";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import Vehicle3D from "@/components/Vehicle3D";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      
      {/* 3D Vehicle Showcase Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-drivefit-black mb-4">
              Experience Vehicles in 3D
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Interact with our 3D vehicle models. Move your mouse to rotate and explore every angle.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-center text-drivefit-black">
                Sedan
              </h3>
              <Vehicle3D vehicleType="sedan" color="#0c4da2" />
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-center text-drivefit-black">
                SUV
              </h3>
              <Vehicle3D vehicleType="suv" color="#ff5f00" />
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-lg md:col-span-2 lg:col-span-1">
              <h3 className="text-xl font-semibold mb-4 text-center text-drivefit-black">
                Hatchback
              </h3>
              <Vehicle3D vehicleType="hatchback" color="#8b5cf6" />
            </div>
          </div>
        </div>
      </section>
      
      <FeaturedVehicles />
      <HowItWorks />
      <Testimonials />
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Index;
