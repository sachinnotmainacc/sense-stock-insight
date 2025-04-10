import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getMultipleStockQuotes, StockQuote } from "@/lib/finnhub";

interface StockItemProps {
  symbol: string;
  quote: StockQuote;
}

const StockItem = ({ symbol, quote }: StockItemProps) => {
  const isPositive = quote.d >= 0;
  const change = Math.abs(quote.d).toFixed(2);
  const percentage = Math.abs(quote.dp).toFixed(2);

  return (
    <div className="flex flex-col space-y-1 bg-white/5 rounded-lg p-3 backdrop-blur-sm">
      <div className="flex justify-between items-center">
        <span className="font-medium">{symbol}</span>
        <span className="text-sm text-gray-400">NASDAQ</span>
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
  const { data: quotes, isLoading, error } = useQuery({
    queryKey: ['stockQuotes'],
    queryFn: () => getMultipleStockQuotes(['AAPL', 'TSLA', 'MSFT', 'AMZN', 'NVDA']),
    refetchInterval: 60000, // Refetch every minute
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 w-full">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex flex-col space-y-1 bg-white/5 rounded-lg p-3 backdrop-blur-sm animate-pulse">
            <div className="h-4 bg-white/10 rounded w-3/4"></div>
            <div className="h-6 bg-white/10 rounded w-1/2"></div>
            <div className="h-4 bg-white/10 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-400">
        Error loading stock data. Please try again later.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 w-full">
      {quotes && Object.entries(quotes).map(([symbol, quote]) => (
        <StockItem key={symbol} symbol={symbol} quote={quote} />
      ))}
    </div>
  );
};

export default StockOverview;
