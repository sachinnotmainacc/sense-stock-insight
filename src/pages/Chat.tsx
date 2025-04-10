
import { useState, useRef, useEffect } from "react";
import { Send, ArrowLeft, MenuIcon, X, Info, LineChart, BellRing } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import ChatMessage from "@/components/ChatMessage";
import ChatSidebar from "@/components/ChatSidebar";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
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
    try {
      // The URL will be replaced with your actual Flask backend endpoint
      const API_ENDPOINT = "/api/chat"; // This will be updated later
      
      // For now, we're simulating the API call
      // This section will be replaced with actual fetch code when you provide the endpoint
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Placeholder response until Flask backend is connected
      const placeholderResponse = {
        id: (Date.now() + 1).toString(),
        content: "This is a placeholder response. Once the Flask backend is connected to the endpoint, this will be replaced with real market analysis data.",
        isUser: false,
      };
      
      setMessages((prev) => [...prev, placeholderResponse]);
      toast({
        title: "API Connection Ready",
        description: "Your app is ready to connect to the Flask backend",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "API Error",
        description: "Failed to connect to backend. Check your configuration.",
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
    } else if (e.key === "Escape") {
      setInput("");
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setInput("");
    inputRef.current?.focus();
  };

  return (
    <div className="h-screen flex flex-col bg-darkbg">
      {/* Navbar */}
      <Navbar />
      
      <div className="flex flex-1 pt-16 overflow-hidden">
        {/* Mobile Sidebar Toggle */}
        <div className="md:hidden absolute top-16 left-0 z-40 p-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-400 hover:text-white rounded-full bg-darkbg-lighter"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </Button>
        </div>
        
        {/* Sidebar */}
        <div className={`
          md:w-64 bg-darkbg-lighter flex-shrink-0 transition-all duration-300 
          ${sidebarOpen ? "w-64" : "w-0"} 
          md:static fixed top-16 bottom-0 left-0 z-40
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}>
          {sidebarOpen && <ChatSidebar onNewChat={handleNewChat} />}
        </div>
        
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          {/* Header - Desktop */}
          <header className="bg-darkbg-lighter border-b border-white/10 p-4">
            <div className="container mx-auto flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <h1 className="font-grotesk font-bold text-gradient-purple text-xl">NewsSense Chat</h1>
                <Button variant="ghost" size="icon" className="rounded-full h-7 w-7">
                  <Info className="h-4 w-4 text-gray-400" />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center space-x-1 text-gray-400 text-sm bg-darkbg px-3 py-1.5 rounded-full border border-white/10">
                  <span className="relative flex h-2 w-2 mr-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-cyan"></span>
                  </span>
                  <span className="hidden sm:inline">Ready for Flask backend</span>
                </div>
                <Button variant="outline" size="icon" className="rounded-full border-white/10 text-gray-400 hover:text-white hover:bg-white/5">
                  <BellRing className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </header>
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto">
            <div className="container mx-auto max-w-3xl">
              {messages.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center h-full py-12">
                  <div className="w-16 h-16 rounded-full bg-neon-purple/20 flex items-center justify-center mb-6">
                    <LineChart className="h-8 w-8 text-neon-purple" />
                  </div>
                  <h2 className="text-xl font-grotesk font-medium mb-2 text-center">Financial insights at your fingertips</h2>
                  <p className="text-gray-400 text-center max-w-md">
                    Ask NewsSense why a stock is moving, or try one of these:
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
                <div className="flex flex-col space-y-4 pt-4 px-4">
                  {messages.map((message) => (
                    <ChatMessage
                      key={message.id}
                      message={message.content}
                      isUser={message.isUser}
                    />
                  ))}
                  
                  {isLoading && (
                    <ChatMessage
                      message=""
                      isUser={false}
                      isLoading={true}
                    />
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>
          </div>
          
          {/* Input Area */}
          <div className="border-t border-white/10 bg-darkbg-lighter p-4">
            <div className="container mx-auto max-w-3xl">
              <div className="flex space-x-2 rounded-lg p-1">
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
                  className="bg-neon-purple hover:bg-neon-purple/80 text-white flex-shrink-0"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-xs text-gray-500 mt-2 text-center">
                Press Enter to send • Esc to clear
              </div>
            </div>
          </div>
        </div>

        {/* Overlay for mobile when sidebar is open */}
        {sidebarOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-black/50 z-30"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Chat;
