import axios from 'axios';

const FINNHUB_API_KEY = 'cvromlhr01qnpem8phd0cvromlhr01qnpem8phdg';
const FINNHUB_BASE_URL = 'https://finnhub.io/api/v1';

// Configure axios client with better timeout and retrying capability
const finnhubClient = axios.create({
  baseURL: FINNHUB_BASE_URL,
  params: {
    token: FINNHUB_API_KEY
  },
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add request/response interceptors for debugging and error tracking
finnhubClient.interceptors.request.use(request => {
  console.log('Finnhub API Request:', request.url, JSON.stringify(request.params));
  return request;
}, error => {
  console.error('Finnhub API Request Error:', error);
  return Promise.reject(error);
});

finnhubClient.interceptors.response.use(
  response => {
    console.log('Finnhub API Response:', response.config.url, response.status);
    return response;
  },
  error => {
    console.error('Finnhub API Error:', error.config?.url, error.response?.status, error.message);
    return Promise.reject(error);
  }
);

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

// Implement retry mechanism for API calls
const withRetry = async <T>(fn: () => Promise<T>, retries = 3, delay = 1000): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) throw error;
    console.log(`Retrying API call, ${retries} attempts left...`);
    await new Promise(resolve => setTimeout(resolve, delay));
    return withRetry(fn, retries - 1, delay * 1.5);
  }
};

export const getStockQuote = async (symbol: string): Promise<StockQuote> => {
  try {
    return await withRetry(async () => {
      const response = await finnhubClient.get(`/quote?symbol=${symbol}`);
      
      // Validate the data to ensure we have valid values
      if (response.data && typeof response.data.c === 'number') {
        return response.data;
      } else {
        throw new Error(`Invalid data returned for ${symbol}`);
      }
    });
  } catch (error) {
    console.error(`Error fetching quote for ${symbol}:`, error);
    throw error;
  }
};

export const getStockCandles = async (symbol: string, resolution: string = 'D', from: number, to: number): Promise<StockCandle> => {
  try {
    return await withRetry(async () => {
      const response = await finnhubClient.get(`/stock/candle`, {
        params: {
          symbol,
          resolution,
          from,
          to
        }
      });
      
      if (response.data && response.data.s === 'ok') {
        return response.data;
      } else {
        throw new Error(`Invalid candle data for ${symbol}: ${response.data?.s}`);
      }
    });
  } catch (error) {
    console.error(`Error fetching candles for ${symbol}:`, error);
    throw error;
  }
};

export const getMultipleStockQuotes = async (symbols: string[]): Promise<Record<string, StockQuote>> => {
  const quotes: Record<string, StockQuote> = {};
  
  // Process in batches of 5 to avoid rate limiting
  const batchSize = 5;
  const batches = [];
  
  for (let i = 0; i < symbols.length; i += batchSize) {
    batches.push(symbols.slice(i, i + batchSize));
  }
  
  for (const batch of batches) {
    await Promise.all(
      batch.map(async (symbol) => {
        try {
          const quote = await getStockQuote(symbol);
          
          // Additional validation to ensure we have proper data
          if (quote.c > 0) {
            quotes[symbol] = quote;
          } else {
            console.warn(`Zero or negative price for ${symbol}: ${quote.c}`);
            // Don't add invalid data to results
          }
        } catch (error) {
          console.error(`Error fetching quote for ${symbol}:`, error);
          // Don't add error records to the results
        }
      })
    );
    
    // Small delay between batches to avoid rate limiting
    if (batches.length > 1) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
  
  return quotes;
}; 