import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatINR } from "@/lib/currency";

interface StockCardProps {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume?: string;
}

export const StockCard = ({ symbol, name, price, change, changePercent, volume }: StockCardProps) => {
  const isPositive = change >= 0;
  
  return (
    <Card className="p-6 border-border bg-card hover:bg-card/80 transition-all duration-300 hover:shadow-[var(--shadow-card)] group">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-foreground">{symbol}</h3>
          <p className="text-sm text-muted-foreground truncate max-w-[180px]">{name}</p>
        </div>
        <div className={cn(
          "p-2 rounded-full transition-all duration-300",
          isPositive ? "bg-success/10 text-success group-hover:shadow-[var(--shadow-glow-success)]" : "bg-destructive/10 text-destructive group-hover:shadow-[var(--shadow-glow-destructive)]"
        )}>
          {isPositive ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="text-3xl font-bold text-foreground">
          {formatINR(price)}
        </div>
        
        <div className="flex items-center gap-2">
          <span className={cn(
            "text-sm font-medium",
            isPositive ? "text-success" : "text-destructive"
          )}>
            {isPositive ? "+" : ""}{change.toFixed(2)}
          </span>
          <span className={cn(
            "text-sm font-medium",
            isPositive ? "text-success" : "text-destructive"
          )}>
            ({isPositive ? "+" : ""}{changePercent.toFixed(2)}%)
          </span>
        </div>
        
        {volume && (
          <div className="text-xs text-muted-foreground">
            Vol: {volume}
          </div>
        )}
      </div>
    </Card>
  );
};