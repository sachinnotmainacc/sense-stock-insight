import axios from 'axios';

const FINNHUB_API_KEY = 'cvromlhr01qnpem8phd0cvromlhr01qnpem8phdg';
const FINNHUB_BASE_URL = 'https://finnhub.io/api/v1';

const finnhubClient = axios.create({
  baseURL: FINNHUB_BASE_URL,
  params: {
    token: FINNHUB_API_KEY
  }
});

export interface StockQuote {
  c: number;  // Current price
  d: number;  // Change
  dp: number; // Percent change
  h: number;  // High price of the day
  l: number;  // Low price of the day
  o: number;  // Open price of the day
  pc: number; // Previous close price
  t: number;  // Timestamp
}

export interface StockCandle {
  c: number[]; // Close prices
  h: number[]; // High prices
  l: number[]; // Low prices
  o: number[]; // Open prices
  s: string;   // Status
  t: number[]; // Timestamps
  v: number[]; // Volume
}

export const getStockQuote = async (symbol: string): Promise<StockQuote> => {
  try {
    const response = await finnhubClient.get(`/quote?symbol=${symbol}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching quote for ${symbol}:`, error);
    throw error;
  }
};

export const getStockCandles = async (symbol: string, resolution: string = 'D', from: number, to: number): Promise<StockCandle> => {
  try {
    const response = await finnhubClient.get(`/stock/candle`, {
      params: {
        symbol,
        resolution,
        from,
        to
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching candles for ${symbol}:`, error);
    throw error;
  }
};

export const getMultipleStockQuotes = async (symbols: string[]): Promise<Record<string, StockQuote>> => {
  const quotes: Record<string, StockQuote> = {};
  
  await Promise.all(
    symbols.map(async (symbol) => {
      try {
        const quote = await getStockQuote(symbol);
        quotes[symbol] = quote;
      } catch (error) {
        console.error(`Error fetching quote for ${symbol}:`, error);
      }
    })
  );
  
  return quotes;
}; 