import { useState } from "react";
import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  onAddStock?: (symbol: string) => void;
}

const popularStocks = ["AAPL", "GOOGL", "MSFT", "TSLA", "AMZN", "NVDA", "META", "NFLX"];

export const SearchBar = ({ onAddStock }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleAddStock = (symbol: string) => {
    onAddStock?.(symbol);
    setSearchTerm("");
    setIsFocused(false);
  };

  const filteredStocks = popularStocks.filter(stock => 
    stock.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          type="text"
          placeholder="Search stocks (e.g., AAPL, GOOGL)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          className="pl-10 pr-4 h-12 text-base bg-secondary/50 border-border focus:bg-card transition-colors"
        />
        {searchTerm && (
          <Button
            onClick={() => handleAddStock(searchTerm.toUpperCase())}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 px-3"
            size="sm"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        )}
      </div>

      {/* Search Results/Suggestions */}
      {isFocused && (searchTerm || !searchTerm) && (
        <Card className="absolute top-full left-0 right-0 mt-2 p-2 bg-card border-border shadow-lg z-50">
          <div className="space-y-1">
            {searchTerm ? (
              <>
                {filteredStocks.length > 0 ? (
                  <>
                    <div className="text-xs text-muted-foreground px-2 py-1">Suggestions</div>
                    {filteredStocks.map((stock) => (
                      <button
                        key={stock}
                        onClick={() => handleAddStock(stock)}
                        className="w-full text-left px-3 py-2 rounded-md hover:bg-secondary/50 transition-colors flex items-center justify-between group"
                      >
                        <span className="font-medium text-foreground">{stock}</span>
                        <Plus className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                      </button>
                    ))}
                  </>
                ) : (
                  <div className="px-3 py-2 text-sm text-muted-foreground">
                    No matches found. Try typing a stock symbol.
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="text-xs text-muted-foreground px-2 py-1">Popular Stocks</div>
                {popularStocks.slice(0, 6).map((stock) => (
                  <button
                    key={stock}
                    onClick={() => handleAddStock(stock)}
                    className="w-full text-left px-3 py-2 rounded-md hover:bg-secondary/50 transition-colors flex items-center justify-between group"
                  >
                    <span className="font-medium text-foreground">{stock}</span>
                    <Plus className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                  </button>
                ))}
              </>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};