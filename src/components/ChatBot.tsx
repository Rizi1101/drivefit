
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Send, X, Bot, User, Car, MapPin, Calculator, Phone } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Welcome to DriveFit! 🚗 I'm your personal car assistant. I can help you find vehicles, get price estimates, check locations, and answer any questions about buying or selling cars in Pakistan. How can I assist you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Vehicle search responses
    if (message.includes('toyota') || message.includes('corolla')) {
      return "🚗 Great choice! Toyota Corolla is Pakistan's most popular sedan. We have multiple variants:\n\n• 2024 Corolla GLi - PKR 4,850,000\n• 2023 Corolla XLi - PKR 4,200,000\n• 2022 Corolla Altis - PKR 5,350,000\n\nAll with verified sellers and detailed inspections. Would you like to see specific models or filter by city?";
    }
    if (message.includes('honda') || message.includes('civic')) {
      return "🏎️ Honda Civic - The perfect blend of style and performance! Available options:\n\n• 2024 Civic Oriel - PKR 5,890,000\n• 2023 Civic VTi - PKR 5,200,000\n• 2022 Civic Turbo - PKR 6,150,000\n\nAll models come with warranty and financing options. Which variant interests you most?";
    }
    if (message.includes('suzuki') || message.includes('swift') || message.includes('alto')) {
      return "🚙 Suzuki vehicles are perfect for city driving! Popular models:\n\n• Alto VXR Plus - PKR 2,450,000\n• Swift DLX - PKR 2,890,000\n• Cultus VXL - PKR 2,650,000\n\nExcellent fuel economy and easy maintenance. Need help comparing models?";
    }
    if (message.includes('price') || message.includes('cost') || message.includes('budget')) {
      return "💰 Vehicle Price Ranges in Pakistan:\n\n🏷️ Budget Cars (PKR 2-3.5M):\n• Suzuki Alto, Cultus, Swift\n• KIA Picanto\n\n🏷️ Mid-Range (PKR 3.5-6M):\n• Toyota Corolla, Yaris\n• Honda City, Civic\n\n🏷️ Premium (PKR 6M+):\n• Honda CR-V, BR-V\n• Toyota Fortuner\n• Hyundai Tucson\n\nWhat's your budget range? I can show you the best options!";
    }
    if (message.includes('location') || message.includes('karachi') || message.includes('lahore') || message.includes('islamabad')) {
      return "📍 We have vehicles available across all major Pakistani cities:\n\n🌟 Top Locations:\n• Karachi - 850+ vehicles\n• Lahore - 720+ vehicles\n• Islamabad/Rawalpindi - 450+ vehicles\n• Faisalabad - 280+ vehicles\n• Multan - 190+ vehicles\n\nWhich city are you looking in? I can show you local dealers and arrange viewings!";
    }
    if (message.includes('sell') || message.includes('selling')) {
      return "💼 Want to sell your vehicle? Here's how DriveFit helps:\n\n✅ Free Vehicle Valuation\n✅ Professional Photography\n✅ Verified Buyer Network\n✅ Secure Payment Processing\n✅ Documentation Support\n\n📈 Average selling time: 15-20 days\n💵 Commission: Only 2.5% on successful sale\n\nReady to list your vehicle? Click 'Sell Your Car' or tell me about your vehicle!";
    }
    if (message.includes('finance') || message.includes('loan') || message.includes('bank')) {
      return "🏦 Vehicle Financing Made Easy:\n\n💳 Partner Banks:\n• HBL - 12-15% annual rate\n• MCB - 13-16% annual rate\n• UBL - 14-17% annual rate\n• Meezan Bank - Shariah compliant\n\n📋 Requirements:\n• Salary certificate\n• Bank statements (6 months)\n• CNIC copy\n• Down payment (20-30%)\n\nPre-approval available in 24 hours! Need help with financing?";
    }
    if (message.includes('mileage') || message.includes('km') || message.includes('condition')) {
      return "🔍 Vehicle Condition Guide:\n\n⭐ Excellent (0-30k km):\n• Like new condition\n• Full warranty coverage\n• Premium pricing\n\n⭐ Good (30-60k km):\n• Well maintained\n• Minor wear signs\n• Best value for money\n\n⭐ Fair (60k+ km):\n• Regular maintenance needed\n• Budget-friendly options\n\nAll our vehicles undergo 150-point inspection. What mileage range works for you?";
    }
    if (message.includes('inspection') || message.includes('check') || message.includes('quality')) {
      return "🔧 DriveFit Quality Assurance:\n\n✅ 150-Point Digital Inspection\n✅ Engine & Transmission Check\n✅ Body & Paint Analysis\n✅ Interior Condition Report\n✅ Accident History Verification\n✅ Legal Documentation Review\n\n📱 Digital inspection report with photos\n🛡️ 7-day return guarantee\n🔄 Free re-inspection after purchase\n\nEvery vehicle comes with a detailed quality certificate!";
    }
    
    // General responses
    if (message.includes('hello') || message.includes('hi') || message.includes('assalam')) {
      return "Hello! Welcome to DriveFit Pakistan 🇵🇰\n\nI'm here to help you with:\n🚗 Finding your perfect vehicle\n💰 Price comparisons\n📍 Location-based search\n🔧 Vehicle inspections\n💳 Financing options\n📞 Seller connections\n\nWhat would you like to explore today?";
    }
    if (message.includes('help') || message.includes('what can you')) {
      return "🤖 I can assist you with:\n\n🔍 Vehicle Search:\n• Find cars by brand, model, price\n• Filter by location and features\n• Compare different options\n\n💼 Selling Support:\n• Free vehicle valuation\n• Listing optimization\n• Buyer matching\n\n💡 Expert Advice:\n• Market trends\n• Financing options\n• Legal documentation\n\nJust ask me anything about cars in Pakistan!";
    }
    if (message.includes('thank')) {
      return "You're most welcome! 😊 I'm always here to help you find the perfect vehicle or assist with selling your car.\n\n🎯 Quick actions:\n• Type a car brand to see options\n• Say 'sell my car' for selling help\n• Ask about 'financing' for loan info\n• Mention your city for local deals\n\nAnything else I can help you with?";
    }
    if (message.includes('contact') || message.includes('call') || message.includes('phone')) {
      return "📞 Get in Touch with DriveFit:\n\n🏢 Head Office: Karachi\n📱 WhatsApp: +92-300-DRIVEFIT\n📧 Email: support@drivefit.pk\n🌐 Website: drivefit.pk\n\n⏰ Support Hours:\n• Monday-Saturday: 9 AM - 9 PM\n• Sunday: 10 AM - 6 PM\n\n💬 Live Chat: Available 24/7 (that's me!)\n\nNeed immediate assistance? I'm here to help right now!";
    }
    
    // Default responses based on context
    const contextResponses = [
      "That's interesting! Let me help you find the right vehicle. What specific car features are you looking for? 🚗",
      "I'd love to help you with that! Are you looking to buy or sell a vehicle? 🤔",
      "Great question! Let me provide you with the best vehicle options in Pakistan. What's your preferred brand or budget range? 💰",
      "I can definitely assist you with that! Tell me more about your vehicle preferences - automatic or manual, sedan or SUV? 🔧"
    ];
    
    return contextResponses[Math.floor(Math.random() * contextResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: getBotResponse(inputMessage),
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const quickActions = [
    { text: "Show me Toyota cars", icon: Car },
    { text: "Cars in Karachi", icon: MapPin },
    { text: "Calculate EMI", icon: Calculator },
    { text: "Contact support", icon: Phone }
  ];

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full bg-drivefit-orange hover:bg-drivefit-orange/90 shadow-2xl z-50 animate-bounce"
          size="icon"
        >
          <MessageCircle className="h-7 w-7" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[600px] shadow-2xl z-50 border-2 border-drivefit-orange/20">
          <CardHeader className="flex flex-row items-center justify-between p-4 bg-gradient-to-r from-drivefit-orange to-drivefit-orange/90 text-white rounded-t-lg">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-sm font-semibold">DriveFit Assistant</CardTitle>
                <p className="text-xs text-white/80">Online now</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 text-white hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          
          <CardContent className="p-0 flex flex-col h-[520px]">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-lg text-sm ${
                      message.isBot
                        ? 'bg-white text-gray-800 border border-gray-200 shadow-sm'
                        : 'bg-drivefit-orange text-white shadow-sm'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {message.isBot && <Bot className="h-4 w-4 mt-0.5 flex-shrink-0 text-drivefit-orange" />}
                      <span className="whitespace-pre-line">{message.text}</span>
                      {!message.isBot && <User className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 p-3 rounded-lg text-sm flex items-center gap-2 shadow-sm">
                    <Bot className="h-4 w-4 text-drivefit-orange" />
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-drivefit-orange rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-drivefit-orange rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-drivefit-orange rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length <= 1 && (
              <div className="p-3 border-t bg-white">
                <p className="text-xs text-gray-500 mb-2">Quick actions:</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs h-8 justify-start"
                      onClick={() => setInputMessage(action.text)}
                    >
                      <action.icon className="h-3 w-3 mr-1" />
                      {action.text}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t bg-white">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about cars, prices, locations..."
                  className="flex-1 text-sm"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  size="icon"
                  className="bg-drivefit-orange hover:bg-drivefit-orange/90 h-10 w-10"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ChatBot;
