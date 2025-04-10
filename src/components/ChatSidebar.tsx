
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

interface ChatSession {
  id: string;
  title: string;
  date: string;
}

interface ChatSidebarProps {
  onNewChat: () => void;
  activeChatId?: string;
}

const ChatSidebar = ({ onNewChat, activeChatId }: ChatSidebarProps) => {
  // Mock chat history (would be replaced with real data later)
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([
    { id: "1", title: "AAPL stock analysis", date: "Today" },
    { id: "2", title: "TSLA price drop", date: "Today" },
    { id: "3", title: "QQQ performance", date: "Yesterday" },
    { id: "4", title: "AMZN earnings report", date: "2 days ago" },
  ]);
  
  return (
    <div className="h-full flex flex-col bg-darkbg-lighter border-r border-white/10 w-full">
      {/* New Chat Button */}
      <div className="p-3">
        <Button 
          onClick={onNewChat} 
          className="w-full bg-neon-purple hover:bg-neon-purple/80 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Chat
        </Button>
      </div>
      
      {/* Chat History */}
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-2 py-2">
          {chatSessions.map((chat) => (
            <Link 
              key={chat.id}
              to={`/chat?id=${chat.id}`}
              className={`flex items-center p-3 text-sm rounded-lg transition-colors ${
                chat.id === activeChatId 
                  ? "bg-white/10 text-white" 
                  : "hover:bg-white/5 text-gray-300"
              }`}
            >
              <MessageSquare className="h-4 w-4 mr-2 flex-shrink-0" />
              <div className="truncate">{chat.title}</div>
            </Link>
          ))}
        </div>
      </ScrollArea>
      
      {/* Footer */}
      <div className="p-3 border-t border-white/10 mt-auto">
        <div className="text-xs text-gray-400 text-center">
          NewsSense AI
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
