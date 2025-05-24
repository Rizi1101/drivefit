
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Send, X, Bot, User } from 'lucide-react';
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
      text: "Hello! I'm your DriveFit assistant. How can I help you find the perfect vehicle today?",
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
      return "I found several Toyota Corolla models! We have 2022 models starting from PKR 4,850,000. Would you like me to show you the available options?";
    }
    if (message.includes('honda') || message.includes('civic')) {
      return "Great choice! Honda Civic is very popular. We have 2021 Honda Civic Oriel for PKR 5,350,000 in Lahore. It has 22,500 km mileage. Interested?";
    }
    if (message.includes('price') || message.includes('cost')) {
      return "Our vehicles range from PKR 2,150,000 to PKR 9,200,000. What's your budget range? I can help you find vehicles within your price range.";
    }
    if (message.includes('location') || message.includes('karachi') || message.includes('lahore')) {
      return "We have vehicles available across Pakistan! Karachi, Lahore, Islamabad, and other major cities. Which city are you looking in?";
    }
    if (message.includes('sell') || message.includes('selling')) {
      return "Want to sell your vehicle? Great! You can list it on our platform. Just go to the 'Sell' section and fill out the details. We'll help you get the best price!";
    }
    if (message.includes('finance') || message.includes('loan')) {
      return "We work with several banks for vehicle financing. Typical rates are 12-18% annually. Would you like me to connect you with our financing partners?";
    }
    if (message.includes('mileage') || message.includes('km')) {
      return "Vehicle mileage is important! Our listings show exact mileage. Lower mileage vehicles (under 30,000 km) are most popular. What mileage range works for you?";
    }
    
    // General responses
    if (message.includes('hello') || message.includes('hi')) {
      return "Hello! Welcome to DriveFit. I'm here to help you find or sell vehicles. What are you looking for today?";
    }
    if (message.includes('help')) {
      return "I can help you with: 🚗 Finding vehicles, 💰 Price information, 📍 Location-based search, 🔧 Vehicle details, 💳 Financing options. What interests you?";
    }
    if (message.includes('thank')) {
      return "You're welcome! I'm always here to help with your vehicle needs. Is there anything else you'd like to know?";
    }
    
    // Default responses
    const defaultResponses = [
      "That's interesting! Can you tell me more about what specific vehicle features you're looking for?",
      "I'd love to help you with that! Are you looking to buy or sell a vehicle?",
      "Great question! Let me help you find the perfect vehicle. What's your preferred brand or budget?",
      "I can assist you with vehicle search, pricing, and locations. What would you like to explore first?"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
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

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-drivefit-orange hover:bg-drivefit-orange/90 shadow-lg z-50"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-80 h-96 shadow-xl z-50">
          <CardHeader className="flex flex-row items-center justify-between p-4 bg-drivefit-orange text-white rounded-t-lg">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <CardTitle className="text-sm">DriveFit Assistant</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-6 w-6 text-white hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          
          <CardContent className="p-0 flex flex-col h-80">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm ${
                      message.isBot
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-drivefit-orange text-white'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {message.isBot && <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                      <span>{message.text}</span>
                      {!message.isBot && <User className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 p-3 rounded-lg text-sm flex items-center gap-2">
                    <Bot className="h-4 w-4" />
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  size="icon"
                  className="bg-drivefit-orange hover:bg-drivefit-orange/90"
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
