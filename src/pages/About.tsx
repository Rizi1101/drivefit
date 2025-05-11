
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Car, Users, Shield, HelpCircle } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow py-12 bg-drivefit-gray">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-center">About DriveFit</h1>
          
          <div className="mb-12">
            <Card className="p-8">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">Pakistan's Premier Vehicle Marketplace</h2>
                <p className="text-lg mb-6">
                  Founded in 2023, DriveFit has quickly become Pakistan's leading online platform for buying and selling vehicles. 
                  Our mission is to revolutionize the automotive market in Pakistan by providing a seamless, transparent, and 
                  secure platform for vehicle transactions.
                </p>
                <p className="text-lg mb-6">
                  Based in Islamabad with offices in Karachi, Lahore, and Peshawar, our team of automotive enthusiasts and tech 
                  experts work tirelessly to ensure DriveFit offers the best experience for both buyers and sellers across Pakistan.
                </p>
              </div>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">Our Vision</h2>
              <p className="text-lg">
                We envision a Pakistan where buying or selling a vehicle is as simple, secure, and transparent as any other online 
                transaction. DriveFit aims to empower Pakistani consumers with the knowledge, tools, and platform they need to 
                make informed vehicle decisions.
              </p>
            </Card>
            
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">Our Mission</h2>
              <p className="text-lg">
                To create the most trusted automotive marketplace in Pakistan by leveraging technology to connect buyers and sellers, 
                providing reliable information, and ensuring secure transactions while contributing to the growth of Pakistan's 
                automotive sector.
              </p>
            </Card>
          </div>
          
          <h2 className="text-3xl font-bold mb-6 text-center">Why Choose DriveFit?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="p-6 flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-drivefit-blue/10 p-3">
                <Car className="h-8 w-8 text-drivefit-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2">Extensive Selection</h3>
              <p>
                Access thousands of vehicles from trusted sellers across Pakistan, from economy cars to luxury vehicles.
              </p>
            </Card>
            
            <Card className="p-6 flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-drivefit-red/10 p-3">
                <Shield className="h-8 w-8 text-drivefit-red" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Transactions</h3>
              <p>
                Our secure platform ensures safe payment processing and protects both buyers and sellers.
              </p>
            </Card>
            
            <Card className="p-6 flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-drivefit-blue/10 p-3">
                <Users className="h-8 w-8 text-drivefit-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2">Verified Sellers</h3>
              <p>
                We verify all sellers on our platform to ensure authenticity and build trust in every transaction.
              </p>
            </Card>
            
            <Card className="p-6 flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-drivefit-red/10 p-3">
                <HelpCircle className="h-8 w-8 text-drivefit-red" />
              </div>
              <h3 className="text-xl font-bold mb-2">Expert Support</h3>
              <p>
                Our knowledgeable team provides assistance at every step of your buying or selling journey.
              </p>
            </Card>
          </div>
          
          <Card className="p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">Our Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-4xl font-bold text-drivefit-blue mb-2">50,000+</p>
                <p className="text-lg">Vehicles Listed</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-drivefit-red mb-2">30,000+</p>
                <p className="text-lg">Happy Customers</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-drivefit-blue mb-2">95%</p>
                <p className="text-lg">Customer Satisfaction</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>
            <div className="max-w-lg mx-auto">
              <p className="text-center mb-4">
                Have questions or feedback? Our team is here to help you!
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                <div>
                  <p className="font-bold mb-1">Email</p>
                  <p>contact@drivefit.pk</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Phone</p>
                  <p>+92-51-1234567</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Head Office</p>
                  <p>Blue Area, Islamabad</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Hours</p>
                  <p>Mon-Sat: 9am - 6pm</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
