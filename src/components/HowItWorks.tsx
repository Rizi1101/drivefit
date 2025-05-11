
import { Search, Car, CheckCircle } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Search className="h-12 w-12 text-drivefit-red" />,
      title: "Search",
      description: "Browse through our extensive collection of vehicles or use our advanced filters to find your perfect match."
    },
    {
      icon: <Car className="h-12 w-12 text-drivefit-red" />,
      title: "Connect",
      description: "Contact sellers directly, schedule test drives, and get all your questions answered before making a decision."
    },
    {
      icon: <CheckCircle className="h-12 w-12 text-drivefit-red" />,
      title: "Purchase",
      description: "Complete your purchase with our secure payment system and enjoy your new vehicle with confidence."
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How DriveFit Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We've simplified the car buying and selling process to make it seamless and enjoyable
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="glass-effect rounded-lg p-6 text-center transition-transform hover:-translate-y-2"
            >
              <div className="flex justify-center mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
