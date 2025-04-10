
import { Link } from "react-router-dom";
import { ArrowRight, LineChart, Globe, Brain, Zap, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeatureCard from "@/components/FeatureCard";
import StockChart from "@/components/StockChart";
import StockOverview from "@/components/StockOverview";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-darkbg text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-8 md:pt-40 md:pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <h1 className="font-grotesk text-4xl md:text-6xl font-bold leading-tight mb-6 max-w-3xl">
              Know <span className="text-gradient-purple">Why</span>, Not Just <span className="text-gradient-purple">What</span>.
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl">
              Real-time AI that explains stock & fund drops with real news analysis.
            </p>
            <Button asChild size="lg" className="bg-neon-purple hover:bg-neon-purple/80 text-white shadow-glow-sm">
              <Link to="/chat" className="flex items-center">
                Launch AI Chat <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            {/* Market Overview */}
            <div className="w-full max-w-5xl mt-10">
              <StockOverview />
            </div>
            
            {/* Hero Chart */}
            <div className="mt-10 w-full max-w-5xl p-4 glass-card rounded-xl shadow-glow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-grotesk font-medium">Market Performance</h3>
                <div className="flex space-x-2">
                  <span className="px-2 py-1 rounded-full text-xs bg-white/10">6M</span>
                  <span className="px-2 py-1 rounded-full text-xs bg-neon-purple/20 text-neon-purple">YTD</span>
                  <span className="px-2 py-1 rounded-full text-xs bg-white/10">1Y</span>
                </div>
              </div>
              <StockChart />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-darkbg-lighter">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-grotesk text-3xl md:text-4xl font-bold mb-4">
              Powered by Real Data
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              No mock data. Our AI analyzes real-time market information.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={LineChart}
              title="Real Stock + ETF Tracking"
              description="Monitor actual stock movements and etf performance in real-time with accurate data."
            />
            <FeatureCard 
              icon={Globe}
              title="Web Scraped News"
              description="Automatically extract relevant information from news sites across the web."
            />
            <FeatureCard 
              icon={Brain}
              title="Flask-Powered NLP Engine"
              description="Our advanced natural language processing engine understands context and nuance."
            />
            <FeatureCard 
              icon={LineChart}
              title="Accurate Sentiment Analysis"
              description="Understand market sentiment with precision through our AI analysis."
            />
            <FeatureCard 
              icon={Zap}
              title="Fast & Responsive"
              description="Get answers quickly with our optimized backend and responsive UI."
            />
            <FeatureCard 
              icon={Lock}
              title="Secure & Private"
              description="Your data and queries are protected with enterprise-grade security."
            />
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center md:space-x-12">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <div className="glass-card rounded-xl p-6 h-full shadow-glow-sm">
                <StockChart className="h-[300px]" />
              </div>
            </div>
            
            <div className="md:w-1/2">
              <h2 className="font-grotesk text-3xl md:text-4xl font-bold mb-6">
                Real Tech, Real Results
              </h2>
              <p className="text-gray-300 mb-6">
                NewsSense combines Python, Flask, React, and advanced NLP models to deliver insights that matter. Our backend processes news in real-time, extracting entities, sentiment, and correlations.
              </p>
              <p className="text-gray-300 mb-8">
                We don't use mock data or pre-written responses. Every analysis is performed on fresh data pulled from the web, processed through our Flask API, and delivered to you instantly.
              </p>
              <Button asChild size="lg" className="bg-neon-purple hover:bg-neon-purple/80 text-white shadow-glow-sm">
                <Link to="/chat" className="flex items-center">
                  Try the Chatbot Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <p className="text-sm text-gray-400 mt-4">
                Ask about stocks like AAPL, TSLA, QQQ and more...
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-darkbg to-darkbg-lighter">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-grotesk text-3xl md:text-4xl font-bold mb-6">
            Ready to understand the market?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Start a conversation with NewsSense AI and get real answers about market movements.
          </p>
          <Button asChild size="lg" className="bg-neon-purple hover:bg-neon-purple/80 text-white shadow-glow-sm">
            <Link to="/chat" className="flex items-center">
              Try the Chatbot Now <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
