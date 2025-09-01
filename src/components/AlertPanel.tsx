import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Alert {
  id: string;
  symbol: string;
  type: "above" | "below";
  price: number;
  active: boolean;
}

export const AlertPanel = () => {
  const [alerts, setAlerts] = useState<Alert[]>([
    { id: "1", symbol: "AAPL", type: "above", price: 180, active: true },
    { id: "2", symbol: "GOOGL", type: "below", price: 140, active: true },
  ]);
  
  const [newAlert, setNewAlert] = useState({
    symbol: "",
    type: "above" as "above" | "below",
    price: ""
  });

  const addAlert = () => {
    if (newAlert.symbol && newAlert.price) {
      const alert: Alert = {
        id: Date.now().toString(),
        symbol: newAlert.symbol.toUpperCase(),
        type: newAlert.type,
        price: parseFloat(newAlert.price),
        active: true
      };
      setAlerts([...alerts, alert]);
      setNewAlert({ symbol: "", type: "above", price: "" });
    }
  };

  const removeAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  return (
    <Card className="p-6 border-border bg-card">
      <div className="flex items-center gap-2 mb-6">
        <Bell className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Price Alerts</h3>
      </div>

      {/* Add New Alert */}
      <div className="space-y-4 mb-6 p-4 bg-secondary/30 rounded-lg border border-border/50">
        <div className="grid grid-cols-3 gap-3">
          <div>
            <Label className="text-xs text-muted-foreground">Symbol</Label>
            <Input
              placeholder="AAPL"
              value={newAlert.symbol}
              onChange={(e) => setNewAlert({ ...newAlert, symbol: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Condition</Label>
            <Select value={newAlert.type} onValueChange={(value: "above" | "below") => setNewAlert({ ...newAlert, type: value })}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="above">Above</SelectItem>
                <SelectItem value="below">Below</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Price</Label>
            <Input
              type="number"
              placeholder="150.00"
              value={newAlert.price}
              onChange={(e) => setNewAlert({ ...newAlert, price: e.target.value })}
              className="mt-1"
            />
          </div>
        </div>
        <Button onClick={addAlert} className="w-full" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Alert
        </Button>
      </div>

      {/* Active Alerts */}
      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg border border-border/30"
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-2 h-2 rounded-full",
                alert.active ? "bg-success animate-pulse" : "bg-muted-foreground"
              )} />
              <div>
                <span className="font-medium text-foreground">{alert.symbol}</span>
                <span className="text-muted-foreground ml-2">
                  {alert.type} ${alert.price.toFixed(2)}
                </span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeAlert(alert.id)}
              className="text-muted-foreground hover:text-destructive"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
        
        {alerts.length === 0 && (
          <p className="text-center text-muted-foreground py-4">
            No active alerts. Add one above to get started.
          </p>
        )}
      </div>
    </Card>
  );
};