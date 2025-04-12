import { ArrowUpRight, ArrowDown, ArrowUp, Minus } from "lucide-react";

interface NewsArticleProps {
  title: string;
  source: string;
  date: string;
  snippet: string;
  url: string;
  sentiment: string;
}

const NewsArticle = ({ title, source, date, snippet, url, sentiment }: NewsArticleProps) => {
  const getSentimentColor = () => {
    switch (sentiment) {
      case "positive":
        return "border-green-500 bg-green-500/10";
      case "negative":
        return "border-red-500 bg-red-500/10";
      default:
        return "border-gray-500 bg-gray-500/10";
    }
  };

  const getSentimentIcon = () => {
    switch (sentiment) {
      case "positive":
        return <ArrowUp className="h-4 w-4 text-green-500" />;
      case "negative":
        return <ArrowDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className={`border-l-4 ${getSentimentColor()} rounded-r-md p-4 mb-4 bg-darkbg-lighter hover:bg-darkbg/80 transition-colors`}>
      <div className="flex justify-between items-start">
        <h3 className="font-medium text-md mb-2">{title}</h3>
        <div className="flex items-center justify-center rounded-full w-6 h-6 bg-darkbg ml-2 flex-shrink-0">
          {getSentimentIcon()}
        </div>
      </div>
      <div className="text-xs text-gray-400 mb-2 flex items-center justify-between">
        <span>{source} • {date}</span>
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-neon-cyan hover:text-neon-cyan/80 flex items-center"
        >
          Source <ArrowUpRight className="h-3 w-3 ml-1" />
        </a>
      </div>
      <p className="text-sm text-gray-300">{snippet}</p>
    </div>
  );
};

export default NewsArticle; 