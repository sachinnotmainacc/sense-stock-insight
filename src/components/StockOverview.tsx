import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getMultipleStockQuotes, StockQuote } from "@/lib/finnhub";
import { useState } from "react";

interface StockItemProps {
  symbol: string;
  quote: StockQuote;
  market: string;
}

const StockItem = ({ symbol, quote, market }: StockItemProps) => {
  const isPositive = quote.d >= 0;
  const change = Math.abs(quote.d).toFixed(2);
  const percentage = Math.abs(quote.dp).toFixed(2);

  return (
    <div className="flex flex-col space-y-1 bg-white/5 rounded-lg p-3 backdrop-blur-sm">
      <div className="flex justify-between items-center">
        <span className="font-medium">{symbol}</span>
        <span className="text-sm text-gray-400">{market}</span>
      </div>
      <div className="text-xl font-semibold">${quote.c.toFixed(2)}</div>
      <div className={`flex items-center text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
        {isPositive ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
        {change} ({percentage}%)
      </div>
    </div>
  );
};

const StockOverview = () => {
  const [activeMarket, setActiveMarket] = useState<'us' | 'india'>('us');
  
  const usStocks = ['AAPL', 'TSLA', 'MSFT', 'AMZN', 'NVDA'];
  const indianStocks = ['RELIANCE.BSE', 'TCS.BSE', 'HDFCBANK.BSE', 'INFY.BSE', 'ICICIBANK.BSE'];
  
  const { data: usQuotes, isLoading: usLoading, error: usError } = useQuery({
    queryKey: ['usStockQuotes'],
    queryFn: () => getMultipleStockQuotes(usStocks),
    refetchInterval: 60000, // Refetch every minute
  });
  
  const { data: indianQuotes, isLoading: indianLoading, error: indianError } = useQuery({
    queryKey: ['indianStockQuotes'],
    queryFn: () => getMultipleStockQuotes(indianStocks),
    refetchInterval: 60000,
  });
  
  const isLoading = activeMarket === 'us' ? usLoading : indianLoading;
  const error = activeMarket === 'us' ? usError : indianError;
  const quotes = activeMarket === 'us' ? usQuotes : indianQuotes;
  
  return (
    <div className="flex flex-col w-full space-y-4">
      <div className="flex justify-center space-x-4 mb-2">
        <button 
          onClick={() => setActiveMarket('us')}
          className={`px-4 py-2 rounded-lg ${activeMarket === 'us' ? 'bg-neon-purple text-white' : 'bg-white/5 text-gray-300'}`}
        >
          US Market
        </button>
        <button 
          onClick={() => setActiveMarket('india')}
          className={`px-4 py-2 rounded-lg ${activeMarket === 'india' ? 'bg-neon-purple text-white' : 'bg-white/5 text-gray-300'}`}
        >
          Indian Market
        </button>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 w-full">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex flex-col space-y-1 bg-white/5 rounded-lg p-3 backdrop-blur-sm animate-pulse">
              <div className="h-4 bg-white/10 rounded w-3/4"></div>
              <div className="h-6 bg-white/10 rounded w-1/2"></div>
              <div className="h-4 bg-white/10 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center text-red-400">
          Error loading stock data. Please try again later.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 w-full">
          {quotes && Object.entries(quotes).map(([symbol, quote]) => (
            <StockItem 
              key={symbol} 
              symbol={symbol} 
              quote={quote} 
              market={activeMarket === 'us' ? 'NASDAQ' : 'BSE'}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default StockOverview;
