
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (values: ContactFormValues) => {
    // In a real app, this would send data to an API
    console.log("Contact form values:", values);
    
    toast({
      title: "Message sent successfully",
      description: "Thank you for contacting us! We will get back to you shortly.",
    });
    
    form.reset();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow py-12 bg-drivefit-gray">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Contact Us</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-6">Get in Touch</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-drivefit-blue/10 p-3 rounded-full mr-4">
                      <Phone className="h-6 w-6 text-drivefit-blue" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Phone</h3>
                      <p className="text-gray-600">+92-51-1234567</p>
                      <p className="text-gray-600">+92-300-1234567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-drivefit-red/10 p-3 rounded-full mr-4">
                      <Mail className="h-6 w-6 text-drivefit-red" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Email</h3>
                      <p className="text-gray-600">info@drivefit.pk</p>
                      <p className="text-gray-600">support@drivefit.pk</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-drivefit-blue/10 p-3 rounded-full mr-4">
                      <MapPin className="h-6 w-6 text-drivefit-blue" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Location</h3>
                      <p className="text-gray-600">Head Office:</p>
                      <p className="text-gray-600">44 Blue Area, Islamabad</p>
                      <p className="text-gray-600 mt-2">Branch Offices:</p>
                      <p className="text-gray-600">Karachi, Lahore, Peshawar</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-drivefit-red/10 p-3 rounded-full mr-4">
                      <Clock className="h-6 w-6 text-drivefit-red" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Business Hours</h3>
                      <p className="text-gray-600">Monday - Friday: 9am - 6pm</p>
                      <p className="text-gray-600">Saturday: 10am - 4pm</p>
                      <p className="text-gray-600">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-6">Send Us a Message</h2>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Email</FormLabel>
                            <FormControl>
                              <Input placeholder="email@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="+92 300 1234567" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                              <Input placeholder="How can we help you?" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <textarea 
                              className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              placeholder="Tell us how we can assist you..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-end">
                      <Button 
                        type="submit" 
                        className="bg-drivefit-blue hover:bg-drivefit-blue/90"
                      >
                        Send Message
                      </Button>
                    </div>
                  </form>
                </Form>
              </Card>
            </div>
          </div>
          
          {/* Map */}
          <div className="mt-12 max-w-6xl mx-auto">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">Find Us</h2>
              <div className="aspect-w-16 aspect-h-9 h-[400px]">
                <iframe 
                  className="w-full h-full rounded-md border-0"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d212127.37747059633!2d73.03726981478809!3d33.61624514992947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbfd07891722f%3A0x6974940177f960ac!2sIslamabad%2C%20Pakistan!5e0!3m2!1sen!2s!4v1620931677298!5m2!1sen!2s" 
                  allowFullScreen 
                  loading="lazy"
                  title="DriveFit Office Location"
                ></iframe>
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact;
