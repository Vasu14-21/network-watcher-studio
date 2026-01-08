import { CheckCircle } from "lucide-react";

const RealityChecklist = () => {
  const items = [
    "Identify basic DNS and HTTP traffic",
    "Apply simple display filters in Wireshark",
    "Recognize obvious suspicious activity",
    "Escalate to L2 when needed",
  ];

  return (
    <div className="p-6 rounded-xl border border-accent/30 bg-accent/5 backdrop-blur">
      <h4 className="font-mono font-bold text-accent mb-4 flex items-center gap-2">
        <span className="text-lg">📋</span> SOC Analyst L1 Reality Check
      </h4>
      <p className="text-muted-foreground text-sm mb-4">
        As an L1 analyst, you are expected to:
      </p>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-center gap-3 text-foreground animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RealityChecklist;
