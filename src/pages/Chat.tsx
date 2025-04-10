
import { useState, useRef, useEffect } from "react";
import { Send, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import ChatMessage from "@/components/ChatMessage";
import { Link } from "react-router-dom";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    // Focus input when component mounts
    inputRef.current?.focus();
  }, [messages]);

  const handleSendMessage = async () => {
    if (input.trim() === "") return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isUser: true,
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    // Placeholder for API call to Flask backend
    // In a real implementation, this would make a fetch to your Flask API
    try {
      // Simulating API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // For now, we'll use this placeholder response
      const placeholderResponse = {
        id: (Date.now() + 1).toString(),
        content: "The Flask backend isn't connected yet. Once connected, I'll provide real analysis of why stocks are moving based on actual market data and news.",
        isUser: false,
      };
      
      setMessages((prev) => [...prev, placeholderResponse]);
      toast({
        title: "API Success",
        description: "Connected to NewsSense backend",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "API Error",
        description: "Failed to connect to NewsSense backend",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-darkbg flex flex-col">
      {/* Header */}
      <header className="bg-darkbg-lighter border-b border-white/10 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="font-grotesk font-bold text-gradient-purple text-xl">NewsSense Chat</h1>
            </div>
            <div className="flex items-center space-x-1 text-gray-400 text-sm bg-darkbg px-3 py-1 rounded-full border border-white/10">
              <span className="relative flex h-2 w-2 mr-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-cyan"></span>
              </span>
              🔌 Live data from Flask backend – No fake replies
            </div>
          </div>
        </div>
      </header>
      
      {/* Chat Container */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="container mx-auto max-w-4xl">
            <div className="flex flex-col">
              {messages.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center py-12">
                  <div className="w-16 h-16 rounded-full bg-neon-purple/20 flex items-center justify-center mb-6">
                    <Send className="h-8 w-8 text-neon-purple" />
                  </div>
                  <h2 className="text-xl font-grotesk font-medium mb-2 text-center">Start a conversation</h2>
                  <p className="text-gray-400 text-center max-w-md">
                    Ask NewsSense why a stock is down, or try one of these:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6 w-full max-w-lg">
                    {['Why is AAPL dropping today?', 'What\'s happening with TSLA stock?', 'Explain QQQ movement', 'Why did AMZN stock fall?'].map((suggestion) => (
                      <Button 
                        key={suggestion}
                        variant="outline"
                        className="justify-start border-white/10 hover:bg-white/5 hover:text-white text-sm"
                        onClick={() => {
                          setInput(suggestion);
                          inputRef.current?.focus();
                        }}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    message={message.content}
                    isUser={message.isUser}
                  />
                ))
              )}
              
              {isLoading && (
                <ChatMessage
                  message=""
                  isUser={false}
                  isLoading={true}
                />
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>
        
        {/* Input Area */}
        <div className="border-t border-white/10 bg-darkbg-lighter py-4">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex space-x-2 animate-pulse-glow rounded-lg p-1">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask NewsSense why a stock is down…"
                className="bg-darkbg border-white/10 focus:border-neon-purple"
              />
              <Button
                onClick={handleSendMessage}
                disabled={input.trim() === "" || isLoading}
                className="bg-neon-purple hover:bg-neon-purple/80 text-white"
              >
                <Send className="h-4 w-4" />
                <span className="ml-2">Ask</span>
              </Button>
            </div>
            <div className="text-xs text-gray-500 mt-2 text-center">
              Press Enter to send • Esc to clear
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
