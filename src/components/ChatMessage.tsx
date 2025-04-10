
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { LineChart } from "lucide-react";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  isLoading?: boolean;
}

const ChatMessage = ({ message, isUser, isLoading = false }: ChatMessageProps) => {
  const [displayedMessage, setDisplayedMessage] = useState("");
  const [isTyping, setIsTyping] = useState(!isUser && message.length > 0);

  useEffect(() => {
    if (!isUser && message.length > 0 && !isLoading) {
      setDisplayedMessage("");
      setIsTyping(true);
      
      let index = 0;
      const timer = setInterval(() => {
        setDisplayedMessage((prev) => prev + message[index]);
        index++;
        
        if (index >= message.length) {
          clearInterval(timer);
          setIsTyping(false);
        }
      }, 15); // Speed of typing animation
      
      return () => clearInterval(timer);
    } else {
      setDisplayedMessage(message);
    }
  }, [message, isUser, isLoading]);

  return (
    <div className={cn(
      "w-full py-4 rounded-lg",
      isUser ? "bg-darkbg" : "bg-darkbg-lighter border border-white/5"
    )}>
      <div className="flex">
        <div className="w-10 h-10 rounded-full flex-shrink-0 mr-4 flex items-center justify-center">
          {isUser ? (
            <div className="bg-neon-purple/30 text-white w-full h-full rounded-full flex items-center justify-center text-sm font-semibold shadow-glow-sm">
              U
            </div>
          ) : (
            <div className="bg-neon-cyan/30 text-white w-full h-full rounded-full flex items-center justify-center text-sm font-semibold shadow-glow-sm">
              <LineChart className="h-5 w-5" />
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="text-xs text-gray-400 mb-1">
            {isUser ? "You" : "NewsSense AI"}
          </div>
          {isUser ? (
            <div className="text-white">{message}</div>
          ) : isLoading ? (
            <div className="flex space-x-2 items-center h-6">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
            </div>
          ) : (
            <div className="text-white prose prose-invert prose-sm max-w-none">
              {displayedMessage}
              {isTyping && <span className="typing-cursor"></span>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
