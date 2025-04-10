
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// Sample stock data
const data = [
  { date: 'Jan', AAPL: 159, TSLA: 209, MSFT: 390 },
  { date: 'Feb', AAPL: 170, TSLA: 199, MSFT: 410 },
  { date: 'Mar', AAPL: 166, TSLA: 177, MSFT: 403 },
  { date: 'Apr', AAPL: 173, TSLA: 182, MSFT: 415 },
  { date: 'May', AAPL: 182, TSLA: 175, MSFT: 425 },
  { date: 'Jun', AAPL: 188, TSLA: 189, MSFT: 430 },
  { date: 'Jul', AAPL: 194, TSLA: 269, MSFT: 435 },
];

const chartConfig = {
  AAPL: {
    label: "Apple Inc.",
    color: "#4ade80"
  },
  TSLA: {
    label: "Tesla Inc.",
    color: "#f87171"
  },
  MSFT: {
    label: "Microsoft Corp.",
    color: "#60a5fa"
  },
};

interface StockChartProps {
  className?: string;
}

const StockChart = ({ className }: StockChartProps) => {
  return (
    <div className={`h-[300px] md:h-[400px] w-full ${className}`}>
      <ChartContainer config={chartConfig} className="h-full w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis 
              dataKey="date" 
              stroke="#aaa" 
              tick={{ fill: '#aaa' }}
            />
            <YAxis 
              stroke="#aaa" 
              tick={{ fill: '#aaa' }}
              domain={['auto', 'auto']}
            />
            <ChartTooltip 
              content={({ active, payload }) => (
                <ChartTooltipContent 
                  active={active} 
                  payload={payload} 
                  indicator="dot"
                />
              )} 
            />
            <Line 
              type="monotone" 
              dataKey="AAPL" 
              stroke="#4ade80" 
              strokeWidth={2} 
              dot={{ r: 4 }} 
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="TSLA" 
              stroke="#f87171" 
              strokeWidth={2} 
              dot={{ r: 4 }} 
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="MSFT" 
              stroke="#60a5fa" 
              strokeWidth={2} 
              dot={{ r: 4 }} 
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

export default StockChart;
