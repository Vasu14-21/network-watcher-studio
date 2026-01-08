interface FilterRow {
  filter: string;
  use: string;
}

interface FilterTableProps {
  title: string;
  filters: FilterRow[];
  accentColor: "primary" | "success";
}

const FilterTable = ({ title, filters, accentColor }: FilterTableProps) => {
  const colorClasses = {
    primary: {
      header: "bg-primary/10 border-primary/30",
      code: "text-primary",
      glow: "glow-primary",
    },
    success: {
      header: "bg-success/10 border-success/30",
      code: "text-success",
      glow: "glow-success",
    },
  };

  const colors = colorClasses[accentColor];

  return (
    <div className="rounded-lg overflow-hidden border border-border bg-card/50 backdrop-blur">
      <div className={`px-4 py-3 border-b ${colors.header}`}>
        <h4 className="font-mono font-semibold text-foreground">{title}</h4>
      </div>
      <div className="divide-y divide-border">
        {filters.map((row, index) => (
          <div
            key={index}
            className="flex items-center gap-4 px-4 py-3 hover:bg-secondary/30 transition-colors"
          >
            <code
              className={`font-mono text-sm px-2 py-1 rounded bg-background/50 ${colors.code} min-w-[140px]`}
            >
              {row.filter}
            </code>
            <span className="text-muted-foreground text-sm">{row.use}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterTable;
