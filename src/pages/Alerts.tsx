import { AlertPanel } from "@/components/AlertPanel";

const Alerts = () => {
  return (
    <div className="min-h-screen container mx-auto px-6 py-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Manage Alerts</h1>
        <p className="text-muted-foreground mt-1">Create and manage your stock price alerts.</p>
      </header>
      <main>
        <section>
          <AlertPanel />
        </section>
      </main>
    </div>
  );
};

export default Alerts;
