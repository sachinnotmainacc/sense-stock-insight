
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, MessageSquare, Calendar, LineChart, Share2, Star, Trash2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

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
          className="w-full bg-neon-purple hover:bg-neon-purple/80 text-white group transition-all"
        >
          <Plus className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform" />
          New Chat
        </Button>
      </div>
      
      {/* Chat History */}
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1 py-2">
          <div className="text-xs font-medium text-gray-400 px-3 py-2">Recent Chats</div>
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
              <div className="truncate flex-1">{chat.title}</div>
              <div className="text-xs text-gray-500">{chat.date}</div>
            </Link>
          ))}
        </div>
        
        <div className="mt-4 space-y-1 py-2">
          <div className="text-xs font-medium text-gray-400 px-3 py-2">Watchlist</div>
          <Link 
            to="/chat?stock=AAPL"
            className="flex items-center p-3 text-sm rounded-lg transition-colors hover:bg-white/5 text-gray-300"
          >
            <LineChart className="h-4 w-4 mr-2 flex-shrink-0" />
            <div className="truncate">AAPL</div>
          </Link>
          <Link 
            to="/chat?stock=TSLA"
            className="flex items-center p-3 text-sm rounded-lg transition-colors hover:bg-white/5 text-gray-300"
          >
            <LineChart className="h-4 w-4 mr-2 flex-shrink-0" />
            <div className="truncate">TSLA</div>
          </Link>
          <Link 
            to="/chat?stock=AMZN"
            className="flex items-center p-3 text-sm rounded-lg transition-colors hover:bg-white/5 text-gray-300"
          >
            <LineChart className="h-4 w-4 mr-2 flex-shrink-0" />
            <div className="truncate">AMZN</div>
          </Link>
        </div>
      </ScrollArea>
      
      {/* Footer */}
      <div className="p-3 border-t border-white/10 mt-auto">
        <div className="flex items-center justify-between mb-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-gray-400 hover:text-white hover:bg-white/10">
            <Star className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-gray-400 hover:text-white hover:bg-white/10">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-gray-400 hover:text-white hover:bg-white/10">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-xs text-gray-400 text-center">
          NewsSense AI Assistant
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
