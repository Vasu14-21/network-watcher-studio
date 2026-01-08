import { Search, Eye, FileSearch, ArrowUpRight } from "lucide-react";

const steps = [
  {
    icon: <Search className="w-5 h-5" />,
    title: "Check Alerts",
    description: "Review security alerts from SIEM",
  },
  {
    icon: <Eye className="w-5 h-5" />,
    title: "Verify Traffic",
    description: "Check suspicious domains or URLs",
  },
  {
    icon: <FileSearch className="w-5 h-5" />,
    title: "Capture & Analyze",
    description: "Use Wireshark to capture traffic",
  },
  {
    icon: <ArrowUpRight className="w-5 h-5" />,
    title: "Escalate",
    description: "Report abnormal findings to L2",
  },
];

const SOCWorkflow = () => {
  return (
    <div className="rounded-lg border border-warning/30 bg-warning/5 p-6">
      <h3 className="text-lg font-mono font-semibold text-foreground mb-6 flex items-center gap-2">
        <span className="text-warning">⚡</span>
        How SOC L1 Uses This in Real Work
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {steps.map((step, index) => (
          <div key={index} className="relative group">
            <div className="p-4 rounded-lg bg-background/50 border border-border hover:border-warning/50 transition-colors text-center">
              <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center mx-auto mb-3 text-warning group-hover:bg-warning/30 transition-colors">
                {step.icon}
              </div>
              <p className="font-mono text-sm font-semibold text-foreground mb-1">
                {step.title}
              </p>
              <p className="text-xs text-muted-foreground">{step.description}</p>
            </div>
            
            {index < steps.length - 1 && (
              <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 text-warning/50">
                →
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SOCWorkflow;
