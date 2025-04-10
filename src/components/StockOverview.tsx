
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface StockItemProps {
  symbol: string;
  price: string;
  change: string;
  percentage: string;
  positive: boolean;
}

const StockItem = ({ symbol, price, change, percentage, positive }: StockItemProps) => {
  return (
    <div className="flex flex-col space-y-1 bg-white/5 rounded-lg p-3 backdrop-blur-sm">
      <div className="flex justify-between items-center">
        <span className="font-medium">{symbol}</span>
        <span className="text-sm text-gray-400">NASDAQ</span>
      </div>
      <div className="text-xl font-semibold">${price}</div>
      <div className={`flex items-center text-sm ${positive ? 'text-green-400' : 'text-red-400'}`}>
        {positive ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
        {change} ({percentage})
      </div>
    </div>
  );
};

const StockOverview = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 w-full">
      <StockItem symbol="AAPL" price="188.42" change="+1.25" percentage="0.67%" positive={true} />
      <StockItem symbol="TSLA" price="178.21" change="-3.71" percentage="2.04%" positive={false} />
      <StockItem symbol="MSFT" price="432.63" change="+4.27" percentage="1.00%" positive={true} />
      <StockItem symbol="AMZN" price="178.12" change="+1.32" percentage="0.75%" positive={true} />
      <StockItem symbol="NVDA" price="924.78" change="-12.55" percentage="1.34%" positive={false} />
    </div>
  );
};

export default StockOverview;
