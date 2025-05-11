
import { Search, Car, CheckCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  
  const steps = [
    {
      icon: <Search className="h-12 w-12 text-drivefit-red" />,
      title: "Search",
      description: "Browse through our extensive collection of Pakistani vehicles or use our advanced filters to find your perfect match.",
      action: "Learn more about our search tools"
    },
    {
      icon: <Car className="h-12 w-12 text-drivefit-red" />,
      title: "Connect",
      description: "Contact sellers directly, schedule test drives, and get all your questions answered before making a decision.",
      action: "Connect with sellers"
    },
    {
      icon: <CheckCircle className="h-12 w-12 text-drivefit-red" />,
      title: "Purchase",
      description: "Complete your purchase with our secure payment system and enjoy your new vehicle with confidence.",
      action: "Learn about secure payments"
    }
  ];

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    toast({
      title: steps[index].title,
      description: `Selected: ${steps[index].action}`,
    });
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How DriveFit Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We've simplified the car buying and selling process in Pakistan to make it seamless and enjoyable
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`glass-effect rounded-lg p-6 text-center transition-transform cursor-pointer hover:-translate-y-2 ${activeStep === index ? 'border-2 border-drivefit-red' : ''}`}
              onClick={() => handleStepClick(index)}
            >
              <div className="flex justify-center mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              <button className="mt-4 text-drivefit-red font-medium hover:underline">
                {step.action}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
