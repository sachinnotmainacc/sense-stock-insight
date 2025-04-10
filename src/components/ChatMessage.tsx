
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

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
    <div
      className={cn(
        "mb-4 max-w-[90%] md:max-w-[70%] animate-fade-in",
        isUser ? "self-end" : "self-start"
      )}
    >
      <div
        className={cn(
          "rounded-xl p-4",
          isUser
            ? "bg-neon-purple text-white"
            : "glass-card border-white/10"
        )}
      >
        {isUser ? (
          <p>{message}</p>
        ) : isLoading ? (
          <div className="flex space-x-2 items-center h-6">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
          </div>
        ) : (
          <p>{displayedMessage}{isTyping && <span className="typing-cursor"></span>}</p>
        )}
      </div>
      
      {!isUser && !isLoading && (
        <div className="text-xs text-gray-500 mt-1 ml-1">NewsSense AI</div>
      )}
    </div>
  );
};

export default ChatMessage;
