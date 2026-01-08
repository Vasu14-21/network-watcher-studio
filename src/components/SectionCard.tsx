import { ReactNode } from "react";

interface SectionCardProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  accentColor: "primary" | "success" | "accent";
  children: ReactNode;
}

const SectionCard = ({ icon, title, subtitle, accentColor, children }: SectionCardProps) => {
  const colorClasses = {
    primary: "border-primary/30 hover:border-primary/50",
    success: "border-success/30 hover:border-success/50",
    accent: "border-accent/30 hover:border-accent/50",
  };

  const iconBgClasses = {
    primary: "bg-primary/10 text-primary",
    success: "bg-success/10 text-success",
    accent: "bg-accent/10 text-accent",
  };

  return (
    <div
      className={`p-8 rounded-2xl border bg-card/50 backdrop-blur transition-all hover:bg-card/80 ${colorClasses[accentColor]}`}
    >
      <div className="flex items-center gap-4 mb-6">
        <div className={`p-3 rounded-xl ${iconBgClasses[accentColor]}`}>
          {icon}
        </div>
        <div>
          <h3 className="text-2xl font-bold text-foreground">{title}</h3>
          <p className="text-muted-foreground text-sm">{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  );
};

export default SectionCard;
