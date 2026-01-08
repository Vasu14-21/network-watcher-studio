import { Check, AlertTriangle } from "lucide-react";

interface Step {
  text: string;
  code?: string;
}

interface StepGuideProps {
  title: string;
  description: string;
  steps: Step[];
  lookFor?: { label: string; items: string[] };
  indicators?: { good: string; bad: string };
  accentColor: "primary" | "success";
}

const StepGuide = ({
  title,
  description,
  steps,
  lookFor,
  indicators,
  accentColor,
}: StepGuideProps) => {
  const colorClasses = {
    primary: {
      border: "border-primary/30",
      bg: "bg-primary/10",
      text: "text-primary",
      stepBg: "bg-primary",
    },
    success: {
      border: "border-success/30",
      bg: "bg-success/10",
      text: "text-success",
      stepBg: "bg-success",
    },
  };

  const colors = colorClasses[accentColor];

  return (
    <div className={`rounded-lg border ${colors.border} ${colors.bg} p-5 space-y-4`}>
      <div>
        <h4 className="font-mono font-semibold text-foreground text-lg">{title}</h4>
        <p className="text-muted-foreground text-sm mt-1">{description}</p>
      </div>

      <div className="space-y-3">
        {steps.map((step, index) => (
          <div key={index} className="flex gap-3 items-start">
            <div
              className={`w-6 h-6 rounded-full ${colors.stepBg} flex items-center justify-center text-xs font-bold text-background shrink-0`}
            >
              {index + 1}
            </div>
            <div className="flex-1">
              <p className="text-foreground text-sm">{step.text}</p>
              {step.code && (
                <code className={`block mt-2 px-3 py-2 rounded bg-background/80 font-mono text-sm ${colors.text}`}>
                  {step.code}
                </code>
              )}
            </div>
          </div>
        ))}
      </div>

      {lookFor && (
        <div className="p-3 rounded bg-background/50 border border-border">
          <p className="text-muted-foreground text-xs mb-2 font-mono">{lookFor.label}</p>
          <ul className="space-y-1">
            {lookFor.items.map((item, index) => (
              <li key={index} className="text-foreground text-sm flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${colors.stepBg}`} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {indicators && (
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded bg-success/10 border border-success/30">
            <div className="flex items-center gap-2 mb-1">
              <Check className="w-4 h-4 text-success" />
              <span className="text-xs font-mono text-success">NORMAL</span>
            </div>
            <p className="text-foreground text-sm">{indicators.good}</p>
          </div>
          <div className="p-3 rounded bg-destructive/10 border border-destructive/30">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="w-4 h-4 text-destructive" />
              <span className="text-xs font-mono text-destructive">SUSPICIOUS</span>
            </div>
            <p className="text-foreground text-sm">{indicators.bad}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StepGuide;
