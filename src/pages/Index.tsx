
import { Link } from "react-router-dom";
import { ArrowRight, LineChart, Globe, Brain, Zap, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeatureCard from "@/components/FeatureCard";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-darkbg text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <h1 className="font-grotesk text-4xl md:text-6xl font-bold leading-tight mb-6 max-w-3xl">
              Know <span className="text-gradient-purple">Why</span>, Not Just <span className="text-gradient-purple">What</span>.
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl">
              Real-time AI that explains stock & fund drops with real news analysis.
            </p>
            <Button asChild size="lg" className="bg-neon-purple hover:bg-neon-purple/80 text-white">
              <Link to="/chat" className="flex items-center">
                Launch AI Chat <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            
            {/* Hero Image or Animation */}
            <div className="mt-16 w-full max-w-4xl p-4 glass-card rounded-xl overflow-hidden">
              <div className="w-full h-[300px] md:h-[400px] bg-gradient-to-br from-darkbg-lighter to-darkbg flex items-center justify-center rounded-lg">
                <div className="text-center p-8 max-w-md">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-neon-purple/20 flex items-center justify-center">
                      <Brain className="h-8 w-8 text-neon-purple" />
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-grotesk font-medium mb-4">Intelligent Stock Analysis</h3>
                  <p className="text-gray-400">
                    NewsSense analyzes financial news, social media sentiment, and market patterns to explain stock movements.
                  </p>
                </div>
              </div>
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
              <div className="glass-card rounded-xl p-6 h-full">
                <div className="bg-darkbg-lighter p-6 rounded-lg h-[300px] flex items-center justify-center">
                  <div className="text-center">
                    <code className="text-neon-cyan block mb-4 font-mono text-sm">{'from flask import Flask'}</code>
                    <code className="text-neon-purple block mb-4 font-mono text-sm">{'import React from "react"'}</code>
                    <code className="text-white/70 block font-mono text-sm">{'// Real code, real data'}</code>
                  </div>
                </div>
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
              <Button asChild size="lg" className="bg-neon-purple hover:bg-neon-purple/80 text-white">
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
          <Button asChild size="lg" className="bg-neon-purple hover:bg-neon-purple/80 text-white">
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
