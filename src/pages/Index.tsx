import { useState, useEffect } from "react";
import { StockCard } from "@/components/StockCard";
import { StockChart } from "@/components/StockChart";
import { AlertPanel } from "@/components/AlertPanel";
import { Portfolio } from "@/components/Portfolio";
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { BarChart3, Bell, Wallet, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-dashboard.jpg";

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
}

// Mock data - in real app, this would come from an API
const generateMockStocks = (): Stock[] => [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 175.23,
    change: 2.45,
    changePercent: 1.42,
    volume: "45.2M"
  },
  {
    symbol: "GOOGL", 
    name: "Alphabet Inc.",
    price: 142.18,
    change: -1.85,
    changePercent: -1.29,
    volume: "28.7M"
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation", 
    price: 338.11,
    change: 4.23,
    changePercent: 1.27,
    volume: "32.1M"
  },
  {
    symbol: "TSLA",
    name: "Tesla, Inc.",
    price: 189.45,
    change: -3.67,
    changePercent: -1.90,
    volume: "67.4M"
  }
];

const generateChartData = (basePrice: number, isPositive: boolean) => {
  const data = [];
  let currentPrice = basePrice * 0.98; // Start slightly lower
  
  for (let i = 0; i < 24; i++) {
    const variation = (Math.random() - 0.5) * 2;
    const trend = isPositive ? 0.1 : -0.1;
    currentPrice += variation + trend;
    
    data.push({
      time: `${i}:00`,
      price: Math.max(currentPrice, basePrice * 0.95)
    });
  }
  
  return data;
};

const Index = () => {
  const [stocks, setStocks] = useState<Stock[]>(generateMockStocks());
  const [selectedStock, setSelectedStock] = useState<Stock>(stocks[0]);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setStocks(prevStocks => 
        prevStocks.map(stock => {
          const variation = (Math.random() - 0.5) * 2;
          const newPrice = Math.max(stock.price + variation, stock.price * 0.95);
          const change = newPrice - stock.price;
          const changePercent = (change / stock.price) * 100;
          
          return {
            ...stock,
            price: newPrice,
            change: change,
            changePercent: changePercent
          };
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleAddStock = (symbol: string) => {
    // Check if stock already exists
    if (stocks.find(s => s.symbol === symbol)) return;
    
    // Mock new stock data
    const newStock: Stock = {
      symbol,
      name: `${symbol} Corp.`,
      price: Math.random() * 200 + 50,
      change: (Math.random() - 0.5) * 10,
      changePercent: (Math.random() - 0.5) * 5,
      volume: `${(Math.random() * 50 + 10).toFixed(1)}M`
    };
    
    setStocks(prev => [...prev, newStock]);
  };

  return (
    <div className="min-h-screen bg-[var(--gradient-hero)] text-foreground">
      {/* Hero Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Financial Dashboard" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background" />
        </div>
        
        <div className="relative z-10 container mx-auto px-6 py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary-glow bg-clip-text text-transparent">
              Real-Time Stock Tracker
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Monitor your portfolio, set alerts, and track market movements with professional-grade tools
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto mb-8">
            <SearchBar onAddStock={handleAddStock} />
          </div>
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Portfolio & Alerts */}
          <div className="space-y-6">
            <Portfolio />
            <AlertPanel />
          </div>

          {/* Center Column - Chart */}
          <div className="lg:col-span-1">
            <StockChart 
              symbol={selectedStock.symbol}
              data={generateChartData(selectedStock.price, selectedStock.change >= 0)}
              isPositive={selectedStock.change >= 0}
            />
          </div>

          {/* Right Column - Quick Stats */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Market Overview</h3>
            </div>
            
            {stocks.map((stock) => (
              <div
                key={stock.symbol}
                onClick={() => setSelectedStock(stock)}
                className="cursor-pointer"
              >
                <StockCard {...stock} />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex justify-center gap-4 mt-12">
          <Button variant="outline" size="lg">
            <BarChart3 className="w-5 h-5 mr-2" />
            Advanced Charts
          </Button>
          <Button variant="outline" size="lg">
            <Bell className="w-5 h-5 mr-2" />
            Manage Alerts
          </Button>
          <Button variant="outline" size="lg">
            <Wallet className="w-5 h-5 mr-2" />
            Portfolio Analysis
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
