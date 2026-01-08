import { useEffect, useState } from "react";

interface Packet {
  id: number;
  type: "dns" | "http";
  delay: number;
}

const PacketAnimation = () => {
  const [packets, setPackets] = useState<Packet[]>([]);

  useEffect(() => {
    const generatePacket = () => {
      const newPacket: Packet = {
        id: Date.now() + Math.random(),
        type: Math.random() > 0.5 ? "dns" : "http",
        delay: Math.random() * 2,
      };
      setPackets((prev) => [...prev.slice(-10), newPacket]);
    };

    const interval = setInterval(generatePacket, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Network lines */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      <div className="absolute top-2/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-success/20 to-transparent" />

      {/* Animated packets */}
      {packets.map((packet) => (
        <div
          key={packet.id}
          className="absolute animate-packet-flow"
          style={{
            top: packet.type === "dns" ? "33%" : "50%",
            animationDelay: `${packet.delay}s`,
          }}
        >
          <div
            className={`w-3 h-3 rounded-full ${
              packet.type === "dns"
                ? "bg-primary glow-primary"
                : "bg-success glow-success"
            }`}
          />
        </div>
      ))}

      {/* Nodes */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary/50 border border-primary animate-pulse-glow" />
      <div className="absolute right-8 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-success/50 border border-success animate-pulse-glow" />
    </div>
  );
};

export default PacketAnimation;
