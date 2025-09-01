import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface ChartDataPoint {
  time: string;
  price: number;
}

interface StockChartProps {
  symbol: string;
  data: ChartDataPoint[];
  isPositive?: boolean;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="text-foreground font-medium">{label}</p>
        <p className="text-primary">
          Price: ${payload[0].value.toFixed(2)}
        </p>
      </div>
    );
  }
  return null;
};

export const StockChart = ({ symbol, data, isPositive = true }: StockChartProps) => {
  return (
    <Card className="p-6 border-border bg-card">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">{symbol} Price Chart</h3>
        <p className="text-sm text-muted-foreground">Last 24 hours</p>
      </div>
      
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="time" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="price"
              stroke={isPositive ? "hsl(var(--success))" : "hsl(var(--destructive))"}
              strokeWidth={2}
              dot={false}
              activeDot={{ 
                r: 4, 
                fill: isPositive ? "hsl(var(--success))" : "hsl(var(--destructive))",
                stroke: "hsl(var(--background))",
                strokeWidth: 2
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};