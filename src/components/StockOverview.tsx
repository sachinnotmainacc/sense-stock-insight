import { ArrowUpRight, ArrowDownRight, AlertCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getMultipleStockQuotes, StockQuote } from "@/lib/finnhub";
import { useState, useEffect } from "react";

// Mock data for Indian stocks since Finnhub free API might have limitations with Indian markets
const mockIndianStockData: Record<string, StockQuote> = {
  'RELIANCE.NS': {
    c: 2948.75,
    d: 23.4,
    dp: 0.8,
    h: 2960.0,
    l: 2925.1,
    o: 2930.0,
    pc: 2925.35,
    t: Date.now()
  },
  'TCS.NS': {
    c: 3851.05,
    d: 15.85,
    dp: 0.41,
    h: 3865.0,
    l: 3835.0,
    o: 3840.0,
    pc: 3835.2,
    t: Date.now()
  },
  'HDFCBANK.NS': {
    c: 1676.6,
    d: -8.7,
    dp: -0.52,
    h: 1688.0,
    l: 1670.0,
    o: 1685.2,
    pc: 1685.3,
    t: Date.now()
  },
  'INFY.NS': {
    c: 1767.35,
    d: 12.45,
    dp: 0.71,
    h: 1772.0,
    l: 1755.0,
    o: 1758.0,
    pc: 1754.9,
    t: Date.now()
  },
  'ICICIBANK.NS': {
    c: 1123.75,
    d: -4.9,
    dp: -0.43,
    h: 1130.0,
    l: 1120.0,
    o: 1127.0,
    pc: 1128.65,
    t: Date.now()
  }
};

interface StockItemProps {
  symbol: string;
  quote: StockQuote;
  market: string;
}

const StockItem = ({ symbol, quote, market }: StockItemProps) => {
  const isPositive = quote.d >= 0;
  const change = Math.abs(quote.d).toFixed(2);
  const percentage = Math.abs(quote.dp).toFixed(2);
  const currencySymbol = market === 'NSE' ? '₹' : '$';
  
  // If price is 0, it means we couldn't get valid data
  const hasValidData = quote.c > 0;

  return (
    <div className="flex flex-col space-y-1 bg-white/5 rounded-lg p-3 backdrop-blur-sm">
      <div className="flex justify-between items-center">
        <span className="font-medium">{symbol.split('.')[0]}</span>
        <span className="text-sm text-gray-400">{market}</span>
      </div>
      
      {hasValidData ? (
        <>
          <div className="text-xl font-semibold">{currencySymbol}{quote.c.toFixed(2)}</div>
          <div className={`flex items-center text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
            {change} ({percentage}%)
          </div>
        </>
      ) : (
        <>
          <div className="text-xl font-semibold text-gray-400">--</div>
          <div className="flex items-center text-sm text-amber-400">
            <AlertCircle className="h-3 w-3 mr-1" />
            No data available
          </div>
        </>
      )}
    </div>
  );
};

const StockOverview = () => {
  const [activeMarket, setActiveMarket] = useState<'us' | 'india'>('us');
  const [indianQuotesData, setIndianQuotesData] = useState<Record<string, StockQuote>>(mockIndianStockData);
  
  const usStocks = ['AAPL', 'TSLA', 'MSFT', 'AMZN', 'NVDA'];
  const indianStocks = ['RELIANCE.NS', 'TCS.NS', 'HDFCBANK.NS', 'INFY.NS', 'ICICIBANK.NS'];
  
  const { data: usQuotes, isLoading: usLoading, error: usError } = useQuery({
    queryKey: ['usStockQuotes'],
    queryFn: () => getMultipleStockQuotes(usStocks),
    refetchInterval: 60000,
  });
  
  // Attempt to fetch real data but fallback to mock data
  const { data: realIndianQuotes, isLoading: indianLoading, error: indianError } = useQuery({
    queryKey: ['indianStockQuotes'],
    queryFn: () => getMultipleStockQuotes(indianStocks),
    refetchInterval: 60000,
    onSuccess: (data) => {
      // Check if we got any valid price data
      const hasValidData = Object.values(data).some(quote => quote.c > 0);
      if (hasValidData) {
        // Merge with mock data for any missing stocks
        const mergedData = { ...mockIndianStockData };
        Object.entries(data).forEach(([symbol, quote]) => {
          if (quote.c > 0) {
            mergedData[symbol] = quote;
          }
        });
        setIndianQuotesData(mergedData);
      }
    }
  });
  
  // Apply small random variations to mock data every minute to simulate real-time updates
  useEffect(() => {
    if (activeMarket === 'india') {
      const interval = setInterval(() => {
        setIndianQuotesData(prev => {
          const updated = { ...prev };
          Object.keys(updated).forEach(symbol => {
            const quote = updated[symbol];
            const change = (Math.random() * 10 - 5) * 0.1; // Random change between -0.5% and +0.5%
            const newPrice = quote.c * (1 + change / 100);
            
            updated[symbol] = {
              ...quote,
              c: parseFloat(newPrice.toFixed(2)),
              d: parseFloat((newPrice - quote.pc).toFixed(2)),
              dp: parseFloat(((newPrice - quote.pc) / quote.pc * 100).toFixed(2)),
              t: Date.now()
            };
          });
          return updated;
        });
      }, 60000);
      
      return () => clearInterval(interval);
    }
  }, [activeMarket]);
  
  const isLoading = activeMarket === 'us' ? usLoading : indianLoading;
  const error = activeMarket === 'us' ? usError : indianError;
  const quotes = activeMarket === 'us' ? usQuotes : indianQuotesData;
  
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
              market={activeMarket === 'us' ? 'NASDAQ' : 'NSE'}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default StockOverview;
