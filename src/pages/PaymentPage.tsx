
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<string>("bank");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");
  const [nameOnCard, setNameOnCard] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [bankName, setBankName] = useState<string>("");
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  
  // Simulated product information
  const product = {
    name: "Premium Vehicle Listing",
    price: "PKR 3,000",
    description: "30-day premium visibility for your vehicle listing"
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      
      toast({
        title: "Payment Successful",
        description: `Your payment for ${product.name} has been processed.`,
      });
      
      navigate("/payment-success");
    }, 2000);
  };
  
  // Render different payment form based on selection
  const renderPaymentForm = () => {
    switch(paymentMethod) {
      case "card":
        return (
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="nameOnCard">Name on Card</Label>
              <Input 
                id="nameOnCard"
                value={nameOnCard}
                onChange={(e) => setNameOnCard(e.target.value)}
                placeholder="Enter name as shown on card"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input 
                id="cardNumber"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="XXXX XXXX XXXX XXXX"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input 
                  id="expiryDate"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  placeholder="MM/YY"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input 
                  id="cvv"
                  type="password"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="XXX"
                  maxLength={3}
                />
              </div>
            </div>
          </div>
        );
      
      case "bank":
        return (
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="bankName">Bank Name</Label>
              <Input 
                id="bankName"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                placeholder="Enter your bank name"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input 
                id="accountNumber"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="Enter your account number"
              />
            </div>
            
            <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
              <p className="text-sm text-blue-800">
                Please transfer <strong>{product.price}</strong> to our account:
              </p>
              <p className="text-sm mt-2">
                <strong>Account Title:</strong> DriveFit Pakistan<br />
                <strong>Account Number:</strong> 12345-6789012-34<br />
                <strong>Bank:</strong> HBL Bank<br />
                <strong>Branch Code:</strong> 0034
              </p>
              <p className="text-xs mt-2 text-blue-600">
                After transferring, upload proof of payment below and click "Complete Payment"
              </p>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="receipt">Upload Payment Proof</Label>
              <Input id="receipt" type="file" />
            </div>
          </div>
        );
      
      case "mobile":
        return (
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="mobileNumber">Mobile Number</Label>
              <Input 
                id="mobileNumber"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="03XX-XXXXXXX"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-lg p-4 flex flex-col items-center hover:bg-blue-50 cursor-pointer">
                <img src="https://upload.wikimedia.org/wikipedia/en/e/e8/EasyPaisa.png" alt="EasyPaisa" className="h-16 object-contain mb-2" />
                <span className="text-sm">EasyPaisa</span>
              </div>
              
              <div className="border rounded-lg p-4 flex flex-col items-center hover:bg-blue-50 cursor-pointer">
                <img src="https://upload.wikimedia.org/wikipedia/en/b/b3/Jazz_logo.png" alt="JazzCash" className="h-16 object-contain mb-2" />
                <span className="text-sm">JazzCash</span>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
              <p className="text-sm text-blue-800">
                Transfer <strong>{product.price}</strong> to:
              </p>
              <p className="text-sm mt-2">
                <strong>Mobile Number:</strong> 0300-1234567<br />
                <strong>Account Title:</strong> DriveFit Pakistan
              </p>
              <p className="text-xs mt-2 text-blue-600">
                After transferring, enter transaction ID below
              </p>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="transactionId">Transaction ID</Label>
              <Input id="transactionId" placeholder="Enter transaction ID" />
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">Complete Your Payment</h1>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>Choose your preferred payment method</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <RadioGroup
                      value={paymentMethod}
                      onValueChange={setPaymentMethod}
                      className="space-y-3 mb-6"
                    >
                      <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-muted/50">
                        <RadioGroupItem value="bank" id="bank" />
                        <Label htmlFor="bank" className="flex-grow cursor-pointer">Bank Transfer</Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-muted/50">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex-grow cursor-pointer">Credit/Debit Card</Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-muted/50">
                        <RadioGroupItem value="mobile" id="mobile" />
                        <Label htmlFor="mobile" className="flex-grow cursor-pointer">Mobile Payment</Label>
                      </div>
                    </RadioGroup>
                    
                    <Separator className="my-6" />
                    
                    {renderPaymentForm()}
                    
                    <Button 
                      type="submit" 
                      className="w-full mt-6" 
                      disabled={loading}
                    >
                      {loading ? "Processing..." : "Complete Payment"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">{product.description}</p>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>{product.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>PKR 0</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>{product.price}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/50 flex justify-center">
                  <p className="text-xs text-muted-foreground text-center">
                    Your payment information is secure and encrypted
                  </p>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PaymentPage;
