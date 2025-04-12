import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { LineChart } from "lucide-react";
import Plotly from 'plotly.js-dist-min';
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  isLoading?: boolean;
  chartData?: any;
  format?: string;
}

const ChatMessage = ({ message, isUser, isLoading = false, chartData, format }: ChatMessageProps) => {
  const [displayedMessage, setDisplayedMessage] = useState("");
  const [isTyping, setIsTyping] = useState(!isUser && message.length > 0);
  const chartRef = useRef<HTMLDivElement>(null);
  // Always use professional format as default
  const isProfessionalFormat = true;

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

  // Render chart if chartData is available
  useEffect(() => {
    if (chartData && chartRef.current) {
      // Clear any existing chart
      chartRef.current.innerHTML = '';
      
      try {
        Plotly.newPlot(chartRef.current, chartData);
      } catch (error) {
        console.error('Failed to render chart:', error);
        chartRef.current.innerHTML = '<div class="p-3 text-sm text-red-500">Failed to render chart</div>';
      }
    }
  }, [chartData]);

  // Render Markdown or plain text based on the message format
  const renderMessage = () => {
    if (isProfessionalFormat) {
      return (
        <div className="professional-analysis prose prose-invert prose-headings:text-neon-cyan prose-headings:font-grotesk prose-headings:font-semibold prose-h3:text-base max-w-none">
          <ReactMarkdown
            components={{
              h3: ({node, ...props}) => <h3 className="mt-4 mb-2 text-neon-cyan" {...props} />,
              ul: ({node, ...props}) => <ul className="ml-4 space-y-1 my-2" {...props} />,
              li: ({node, ...props}) => <li className="text-sm list-item list-disc ml-4" {...props} />,
              a: ({node, href, ...props}) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-neon-cyan hover:underline" {...props} />,
              hr: ({node, ...props}) => <hr className="border-white/10 my-3" {...props} />,
              p: ({node, ...props}) => <p className="my-2 text-sm" {...props} />,
              strong: ({node, ...props}) => <strong className="font-semibold text-white" {...props} />
            }}
          >
            {displayedMessage}
          </ReactMarkdown>
          {isTyping && <span className="typing-cursor"></span>}
        </div>
      );
    }

    // Default rendering for regular messages
    return (
      <div className="text-white prose prose-invert prose-sm max-w-none">
        {displayedMessage}
        {isTyping && <span className="typing-cursor"></span>}
      </div>
    );
  };

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
            <>
              {renderMessage()}
              
              {chartData && (
                <div className="mt-4 bg-darkbg border border-white/10 rounded-lg overflow-hidden">
                  <div className="px-4 py-2 border-b border-white/10 flex items-center">
                    <LineChart className="h-4 w-4 text-neon-cyan mr-2" />
                    <span className="text-xs font-medium">Market Data Visualization</span>
                  </div>
                  <div 
                    ref={chartRef} 
                    className="w-full h-[300px]"
                  ></div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
