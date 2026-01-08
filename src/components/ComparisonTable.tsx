const ComparisonTable = () => {
  const comparisons = [
    { dns: "Finds website IP", http: "Loads website data" },
    { dns: "Domain activity", http: "Web activity" },
    { dns: "UDP Port 53", http: "TCP Port 80" },
    { dns: "Query → Response", http: "Request → Response" },
  ];

  return (
    <div className="rounded-xl overflow-hidden border border-border bg-card/50 backdrop-blur">
      <div className="grid grid-cols-2">
        <div className="px-6 py-4 bg-primary/10 border-b border-r border-primary/30">
          <h4 className="font-mono font-bold text-primary text-center">DNS</h4>
        </div>
        <div className="px-6 py-4 bg-success/10 border-b border-success/30">
          <h4 className="font-mono font-bold text-success text-center">HTTP</h4>
        </div>
      </div>
      {comparisons.map((row, index) => (
        <div
          key={index}
          className="grid grid-cols-2 border-b border-border last:border-b-0"
        >
          <div className="px-6 py-4 border-r border-border text-center text-foreground">
            {row.dns}
          </div>
          <div className="px-6 py-4 text-center text-foreground">{row.http}</div>
        </div>
      ))}
    </div>
  );
};

export default ComparisonTable;
