import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, Info, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import NewsArticle from "@/components/NewsArticle";
import DataSourceInfo from "@/components/DataSourceInfo";
import Navbar from "@/components/Navbar";

// Define the backend API URL based on environment
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface Article {
  title: string;
  source: string;
  date: string;
  snippet: string;
  url: string;
  sentiment: string;
}

interface ApiResponse {
  articles: Article[];
  meta: {
    total_articles: number;
    sources_scanned: string[];
    data_source: string;
    last_updated: string;
  };
}

const News = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [meta, setMeta] = useState<ApiResponse['meta'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  const fetchArticles = async (entity?: string) => {
    setIsLoading(true);
    setError("");
    
    try {
      const url = `${API_BASE_URL}/api/articles${entity ? `?entity=${entity}` : ''}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Error fetching news: ${response.status}`);
      }
      
      const data: ApiResponse = await response.json();
      setArticles(data.articles);
      setMeta(data.meta);
    } catch (err) {
      console.error("Error fetching articles:", err);
      setError("Failed to load news articles. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      fetchArticles(searchTerm);
    } else {
      fetchArticles();
    }
  };

  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    article.snippet.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.source.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-darkbg">
      <Navbar />
      
      <main className="container mx-auto max-w-4xl px-4 pt-20 pb-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-grotesk font-bold text-gradient-purple">Financial News</h1>
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            className="text-xs flex items-center space-x-1 rounded-full"
            onClick={() => fetchArticles()}
          >
            <RefreshCw className="h-3 w-3 mr-1" />
            Refresh
          </Button>
        </div>

        {meta && <DataSourceInfo meta={meta} />}
        
        <form onSubmit={handleSearch} className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search for stocks, news, or sources..."
            className="pl-10 bg-darkbg-lighter border-white/10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-neon-cyan mb-4"></div>
            <p className="text-gray-400">Loading financial news...</p>
          </div>
        ) : error ? (
          <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 text-center">
            <p className="text-red-400">{error}</p>
            <Button variant="outline" className="mt-4" onClick={() => fetchArticles()}>
              Try Again
            </Button>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="text-center py-12">
            <Info className="h-10 w-10 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400 mb-2">No articles found matching your search.</p>
            <Button variant="link" onClick={() => setSearchTerm("")}>
              Clear search
            </Button>
          </div>
        ) : (
          <div>
            <p className="text-sm text-gray-400 mb-4">
              Showing {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''}
              {searchTerm ? ` matching "${searchTerm}"` : ''}
            </p>
            
            <div>
              {filteredArticles.map((article, index) => (
                <NewsArticle
                  key={index}
                  title={article.title}
                  source={article.source}
                  date={article.date}
                  snippet={article.snippet}
                  url={article.url}
                  sentiment={article.sentiment}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default News; 