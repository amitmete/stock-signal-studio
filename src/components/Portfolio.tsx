import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Wallet, TrendingUp, DollarSign, PieChart } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatINR } from "@/lib/currency";

interface PortfolioPosition {
  symbol: string;
  shares: number;
  avgPrice: number;
  currentPrice: number;
  allocation: number;
}

const positions: PortfolioPosition[] = [
  { symbol: "AAPL", shares: 10, avgPrice: 150.00, currentPrice: 175.23, allocation: 35 },
  { symbol: "GOOGL", shares: 5, avgPrice: 135.00, currentPrice: 142.18, allocation: 25 },
  { symbol: "MSFT", shares: 8, avgPrice: 320.00, currentPrice: 338.11, allocation: 20 },
  { symbol: "TSLA", shares: 3, avgPrice: 220.00, currentPrice: 189.45, allocation: 20 },
];

export const Portfolio = () => {
  const totalValue = positions.reduce((sum, pos) => sum + (pos.shares * pos.currentPrice), 0);
  const totalCost = positions.reduce((sum, pos) => sum + (pos.shares * pos.avgPrice), 0);
  const totalGainLoss = totalValue - totalCost;
  const totalGainLossPercent = ((totalValue - totalCost) / totalCost) * 100;
  const isPositive = totalGainLoss >= 0;

  return (
    <Card className="p-6 border-border bg-card">
      <div className="flex items-center gap-2 mb-6">
        <Wallet className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Portfolio Overview</h3>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-secondary/20 rounded-lg p-4 border border-border/30">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Total Value</span>
          </div>
          <div className="text-2xl font-bold text-foreground">
            {formatINR(totalValue)}
          </div>
        </div>

        <div className="bg-secondary/20 rounded-lg p-4 border border-border/30">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Today's P&L</span>
          </div>
          <div className={cn(
            "text-2xl font-bold",
            isPositive ? "text-success" : "text-destructive"
          )}>
            {isPositive ? "+" : "-"}{formatINR(Math.abs(totalGainLoss))}
          </div>
          <div className={cn(
            "text-sm font-medium",
            isPositive ? "text-success" : "text-destructive"
          )}>
            ({isPositive ? "+" : ""}{totalGainLossPercent.toFixed(2)}%)
          </div>
        </div>

        <div className="bg-secondary/20 rounded-lg p-4 border border-border/30">
          <div className="flex items-center gap-2 mb-2">
            <PieChart className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Positions</span>
          </div>
          <div className="text-2xl font-bold text-foreground">
            {positions.length}
          </div>
        </div>
      </div>

      {/* Holdings */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-muted-foreground mb-3">Holdings</h4>
        {positions.map((position) => {
          const currentValue = position.shares * position.currentPrice;
          const costBasis = position.shares * position.avgPrice;
          const gainLoss = currentValue - costBasis;
          const gainLossPercent = ((currentValue - costBasis) / costBasis) * 100;
          const isPositivePosition = gainLoss >= 0;

          return (
            <div key={position.symbol} className="bg-secondary/10 rounded-lg p-4 border border-border/20">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="font-semibold text-foreground">{position.symbol}</div>
                  <div className="text-sm text-muted-foreground">
                    {position.shares} shares @ {formatINR(position.avgPrice)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-foreground">
                    {formatINR(currentValue)}
                  </div>
                  <div className={cn(
                    "text-sm font-medium",
                    isPositivePosition ? "text-success" : "text-destructive"
                  )}>
                    {isPositivePosition ? "+" : "-"}{formatINR(Math.abs(gainLoss))} ({isPositivePosition ? "+" : ""}{gainLossPercent.toFixed(1)}%)
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Allocation</span>
                  <span>{position.allocation}%</span>
                </div>
                <Progress 
                  value={position.allocation} 
                  className="h-2"
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};