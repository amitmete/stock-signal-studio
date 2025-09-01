import { Portfolio } from "@/components/Portfolio";

const PortfolioAnalysis = () => {
  return (
    <div className="min-h-screen container mx-auto px-6 py-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Portfolio Analysis</h1>
        <p className="text-muted-foreground mt-1">Overview of holdings with values in INR.</p>
      </header>
      <main>
        <section>
          <Portfolio />
        </section>
      </main>
    </div>
  );
};

export default PortfolioAnalysis;
