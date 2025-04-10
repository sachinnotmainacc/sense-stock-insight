import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { getStockCandles, StockCandle } from "@/lib/finnhub";
import { format } from 'date-fns';

// Static data for Oct to April as fallback
const staticData = [
  { date: 'Oct', AAPL: 159, TSLA: 209, MSFT: 390 },
  { date: 'Nov', AAPL: 170, TSLA: 199, MSFT: 410 },
  { date: 'Dec', AAPL: 166, TSLA: 177, MSFT: 403 },
  { date: 'Jan', AAPL: 173, TSLA: 182, MSFT: 415 },
  { date: 'Feb', AAPL: 182, TSLA: 175, MSFT: 425 },
  { date: 'Mar', AAPL: 188, TSLA: 189, MSFT: 430 },
  { date: 'Apr', AAPL: 194, TSLA: 269, MSFT: 435 },
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
  useStaticData?: boolean;
}

const StockChart = ({ className, useStaticData = false }: StockChartProps) => {
  const [useFallbackData, setUseFallbackData] = useState(false);
  
  // Get October to April timestamp range
  const currentYear = new Date().getFullYear();
  const from = Math.floor(new Date(currentYear-1, 9, 1).getTime() / 1000); // Last October
  const to = Math.floor(new Date(currentYear, 3, 30).getTime() / 1000);    // This April

  const { data: aaplData, isLoading: aaplLoading, error: aaplError } = useQuery({
    queryKey: ['aaplChart', from, to],
    queryFn: () => getStockCandles('AAPL', 'W', from, to), // Weekly data
    enabled: !useStaticData && !useFallbackData,
    refetchInterval: 60000, // 1 minute
    staleTime: 30000,
    retry: 2
  });

  const { data: tslaData, isLoading: tslaLoading, error: tslaError } = useQuery({
    queryKey: ['tslaChart', from, to],
    queryFn: () => getStockCandles('TSLA', 'W', from, to), 
    enabled: !useStaticData && !useFallbackData,
    refetchInterval: 60000,
    staleTime: 30000,
    retry: 2
  });

  const { data: msftData, isLoading: msftLoading, error: msftError } = useQuery({
    queryKey: ['msftChart', from, to],
    queryFn: () => getStockCandles('MSFT', 'W', from, to),
    enabled: !useStaticData && !useFallbackData,
    refetchInterval: 60000,
    staleTime: 30000,
    retry: 2
  });

  // Check for API errors and fall back to static data if needed
  useEffect(() => {
    if (aaplError || tslaError || msftError) {
      console.error("Error fetching stock data:", { aaplError, tslaError, msftError });
      setUseFallbackData(true);
    }
  }, [aaplError, tslaError, msftError]);

  const isLoading = !useStaticData && !useFallbackData && (aaplLoading || tslaLoading || msftLoading);

  const formatChartData = (data: StockCandle | undefined, symbol: string) => {
    if (!data || !data.t || !data.c || data.s !== "ok") return [];
    return data.t.map((timestamp, index) => ({
      date: format(new Date(timestamp * 1000), 'MMM d'),
      [symbol]: data.c[index]
    }));
  };

  // Determine which data to use
  const chartData = useStaticData || useFallbackData
    ? staticData
    : (() => {
        const aaplFormatted = formatChartData(aaplData, 'AAPL');
        const tslaFormatted = formatChartData(tslaData, 'TSLA');
        const msftFormatted = formatChartData(msftData, 'MSFT');

        if (aaplFormatted.length === 0 || tslaFormatted.length === 0 || msftFormatted.length === 0) {
          return staticData;
        }

        // Merge data for all three stocks
        return aaplFormatted.map((item, index) => {
          if (index < tslaFormatted.length && index < msftFormatted.length) {
            return {
              ...item,
              ...tslaFormatted[index],
              ...msftFormatted[index]
            };
          }
          return item;
        });
      })();

  if (isLoading) {
    return (
      <div className={`h-[300px] md:h-[400px] w-full ${className} animate-pulse`}>
        <div className="h-full w-full bg-white/5 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className={`h-[300px] md:h-[400px] w-full ${className}`}>
      <ChartContainer config={chartConfig} className="h-full w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
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
              dot={(useStaticData || useFallbackData)}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="TSLA" 
              stroke="#f87171" 
              strokeWidth={2} 
              dot={(useStaticData || useFallbackData)}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="MSFT" 
              stroke="#60a5fa" 
              strokeWidth={2} 
              dot={(useStaticData || useFallbackData)}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

export default StockChart;
