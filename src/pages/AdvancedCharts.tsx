import { useMemo, useState } from "react";
import { StockChart } from "@/components/StockChart";
import { SearchBar } from "@/components/SearchBar";

interface ChartDataPoint {
  time: string;
  price: number;
}

const generateChartData = (basePrice: number, isPositive: boolean): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];
  let currentPrice = basePrice * 0.98;
  for (let i = 0; i < 24; i++) {
    const variation = (Math.random() - 0.5) * 2;
    const trend = isPositive ? 0.1 : -0.1;
    currentPrice += variation + trend;
    data.push({ time: `${i}:00`, price: Math.max(currentPrice, basePrice * 0.95) });
  }
  return data;
};

const AdvancedCharts = () => {
  const [symbol, setSymbol] = useState<string>("RELIANCE");
  const [basePrice, setBasePrice] = useState<number>(2500);
  const [isPositive, setIsPositive] = useState<boolean>(true);

  const data = useMemo(() => generateChartData(basePrice, isPositive), [basePrice, isPositive]);

  return (
    <div className="min-h-screen container mx-auto px-6 py-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Advanced Charts for Indian Stocks</h1>
        <p className="text-muted-foreground mt-1">Interactive price visualization with INR currency.</p>
      </header>

      <main>
        <section className="max-w-2xl mb-6">
          <SearchBar
            onAddStock={(s) => {
              setSymbol(s);
              setBasePrice(Math.random() * 2000 + 200);
              setIsPositive(Math.random() > 0.5);
            }}
          />
        </section>

        <section>
          <StockChart symbol={symbol} data={data} isPositive={isPositive} />
        </section>
      </main>
    </div>
  );
};

export default AdvancedCharts;
