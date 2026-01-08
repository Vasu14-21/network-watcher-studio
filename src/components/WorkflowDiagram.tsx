import { useState, useEffect } from "react";
import { Globe, Server, FileText, ArrowRight } from "lucide-react";

const WorkflowDiagram = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { icon: Globe, label: "User types google.com", color: "text-foreground" },
    { icon: Server, label: "DNS: Find IP", color: "text-primary" },
    { icon: ArrowRight, label: "142.250.183.206", color: "text-accent" },
    { icon: FileText, label: "HTTP: Load page", color: "text-success" },
  ];

  return (
    <div className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur">
      <div className="flex items-center justify-between gap-2 md:gap-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = activeStep === index;
          const isPast = index < activeStep;

          return (
            <div key={index} className="flex items-center gap-2 md:gap-4">
              <div
                className={`flex flex-col items-center transition-all duration-500 ${
                  isActive ? "scale-110" : isPast ? "opacity-50" : "opacity-30"
                }`}
              >
                <div
                  className={`p-3 rounded-xl border ${
                    isActive
                      ? "border-primary bg-primary/20 glow-primary"
                      : "border-border bg-muted/20"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? step.color : "text-muted-foreground"}`} />
                </div>
                <span
                  className={`mt-2 text-xs font-mono text-center max-w-20 ${
                    isActive ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-8 md:w-12 h-px transition-all duration-500 ${
                    isPast || isActive
                      ? "bg-gradient-to-r from-primary to-primary/0"
                      : "bg-border"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorkflowDiagram;
