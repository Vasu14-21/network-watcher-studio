import { useState, useEffect, useCallback } from "react";
import { Play, Pause, RotateCcw, Filter, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Packet {
  id: number;
  time: string;
  source: string;
  destination: string;
  protocol: "DNS" | "HTTP" | "TCP" | "UDP";
  info: string;
  port: number;
  domain?: string;
  requestType?: string;
}

const generatePacket = (id: number): Packet => {
  const protocols: Array<"DNS" | "HTTP" | "TCP" | "UDP"> = ["DNS", "HTTP", "DNS", "HTTP", "TCP", "UDP"];
  const protocol = protocols[Math.floor(Math.random() * protocols.length)];
  
  const domains = ["google.com", "facebook.com", "suspicious-site.xyz", "github.com", "api.service.net", "malware-c2.ru"];
  const ips = ["192.168.1.100", "192.168.1.105", "10.0.0.50", "172.16.0.25"];
  const dnsServers = ["8.8.8.8", "1.1.1.1", "208.67.222.222"];
  const webServers = ["142.250.183.206", "157.240.1.35", "185.199.108.133", "93.184.216.34"];
  
  const source = ips[Math.floor(Math.random() * ips.length)];
  const time = new Date().toLocaleTimeString('en-US', { hour12: false });
  
  if (protocol === "DNS") {
    const domain = domains[Math.floor(Math.random() * domains.length)];
    return {
      id,
      time,
      source,
      destination: dnsServers[Math.floor(Math.random() * dnsServers.length)],
      protocol: "DNS",
      info: `Standard query A ${domain}`,
      port: 53,
      domain,
    };
  } else if (protocol === "HTTP") {
    const paths = ["/index.html", "/api/data", "/download/file.exe", "/login", "/images/logo.png"];
    const methods = ["GET", "POST", "GET", "GET"];
    const method = methods[Math.floor(Math.random() * methods.length)];
    const domain = domains[Math.floor(Math.random() * domains.length)];
    return {
      id,
      time,
      source,
      destination: webServers[Math.floor(Math.random() * webServers.length)],
      protocol: "HTTP",
      info: `${method} ${paths[Math.floor(Math.random() * paths.length)]} HTTP/1.1`,
      port: 80,
      domain,
      requestType: method,
    };
  } else if (protocol === "TCP") {
    return {
      id,
      time,
      source,
      destination: webServers[Math.floor(Math.random() * webServers.length)],
      protocol: "TCP",
      info: "SYN, ACK",
      port: Math.random() > 0.5 ? 80 : 443,
    };
  } else {
    return {
      id,
      time,
      source,
      destination: dnsServers[Math.floor(Math.random() * dnsServers.length)],
      protocol: "UDP",
      info: "UDP Datagram",
      port: 53,
    };
  }
};

const PacketSimulator = () => {
  const [packets, setPackets] = useState<Packet[]>([]);
  const [filter, setFilter] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [packetId, setPacketId] = useState(1);
  const [filterValid, setFilterValid] = useState<boolean | null>(null);
  const [matchCount, setMatchCount] = useState(0);

  const validFilters = [
    "dns",
    "http",
    "tcp",
    "udp",
    "dns.qry.name",
    "http.request",
    "http.response",
    "udp.port == 53",
    "tcp.port == 80",
    "http.host",
  ];

  const checkFilter = useCallback((filterStr: string, packet: Packet): boolean => {
    const f = filterStr.toLowerCase().trim();
    if (!f) return true;
    
    if (f === "dns") return packet.protocol === "DNS";
    if (f === "http") return packet.protocol === "HTTP";
    if (f === "tcp") return packet.protocol === "TCP" || packet.protocol === "HTTP";
    if (f === "udp") return packet.protocol === "UDP" || packet.protocol === "DNS";
    if (f === "dns.qry.name") return packet.protocol === "DNS" && !!packet.domain;
    if (f === "http.request") return packet.protocol === "HTTP" && !!packet.requestType;
    if (f === "http.response") return packet.protocol === "HTTP";
    if (f === "http.host") return packet.protocol === "HTTP" && !!packet.domain;
    if (f === "udp.port == 53") return packet.port === 53;
    if (f === "tcp.port == 80") return packet.port === 80;
    
    return false;
  }, []);

  const filteredPackets = packets.filter((p) => checkFilter(filter, p));

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setPackets((prev) => {
        const newPacket = generatePacket(packetId);
        setPacketId((id) => id + 1);
        const updated = [...prev, newPacket].slice(-50);
        return updated;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [isRunning, packetId]);

  useEffect(() => {
    if (!filter.trim()) {
      setFilterValid(null);
      setMatchCount(packets.length);
      return;
    }
    
    const isValid = validFilters.some((vf) => 
      filter.toLowerCase().trim() === vf.toLowerCase()
    );
    setFilterValid(isValid);
    setMatchCount(filteredPackets.length);
  }, [filter, packets, filteredPackets.length]);

  const handleReset = () => {
    setPackets([]);
    setPacketId(1);
    setIsRunning(false);
    setFilter("");
  };

  const getProtocolColor = (protocol: string) => {
    switch (protocol) {
      case "DNS": return "text-primary bg-primary/20";
      case "HTTP": return "text-success bg-success/20";
      case "TCP": return "text-warning bg-warning/20";
      case "UDP": return "text-info bg-info/20";
      default: return "text-muted-foreground bg-muted";
    }
  };

  return (
    <div className="rounded-xl border border-border bg-card/80 backdrop-blur overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-muted/50 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-destructive/80" />
            <div className="w-3 h-3 rounded-full bg-warning/80" />
            <div className="w-3 h-3 rounded-full bg-success/80" />
          </div>
          <span className="font-mono text-sm text-muted-foreground">
            Packet Capture Simulator
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant={isRunning ? "destructive" : "default"}
            onClick={() => setIsRunning(!isRunning)}
            className="gap-2"
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isRunning ? "Stop" : "Start"}
          </Button>
          <Button size="sm" variant="outline" onClick={handleReset}>
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="px-4 py-3 bg-background/50 border-b border-border">
        <div className="flex items-center gap-3">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <div className="flex-1 relative">
            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Apply display filter... (try: dns, http, tcp.port == 80)"
              className="w-full bg-background border border-border rounded px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            {filterValid !== null && filter && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {filterValid ? (
                  <CheckCircle2 className="w-5 h-5 text-success" />
                ) : (
                  <XCircle className="w-5 h-5 text-destructive" />
                )}
              </div>
            )}
          </div>
          <div className="text-sm font-mono text-muted-foreground min-w-[100px] text-right">
            {matchCount} / {packets.length} packets
          </div>
        </div>
        
        {/* Quick Filter Chips */}
        <div className="flex flex-wrap gap-2 mt-3">
          {["dns", "http", "udp.port == 53", "tcp.port == 80"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-2 py-1 rounded text-xs font-mono transition-colors ${
                filter === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80 text-muted-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Packet Table Header */}
      <div className="grid grid-cols-12 gap-2 px-4 py-2 bg-muted/30 border-b border-border text-xs font-mono text-muted-foreground">
        <div className="col-span-1">No.</div>
        <div className="col-span-2">Time</div>
        <div className="col-span-2">Source</div>
        <div className="col-span-2">Destination</div>
        <div className="col-span-1">Protocol</div>
        <div className="col-span-4">Info</div>
      </div>

      {/* Packet List */}
      <div className="h-[300px] overflow-y-auto">
        {filteredPackets.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <Filter className="w-8 h-8 mb-2 opacity-50" />
            <p className="text-sm font-mono">
              {packets.length === 0
                ? "Click Start to begin capturing packets"
                : "No packets match the current filter"}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border/50">
            {filteredPackets.map((packet, index) => (
              <div
                key={packet.id}
                className={`grid grid-cols-12 gap-2 px-4 py-2 text-xs font-mono hover:bg-muted/30 transition-colors animate-fade-in ${
                  packet.domain?.includes("suspicious") || packet.domain?.includes("malware")
                    ? "bg-destructive/10"
                    : ""
                }`}
              >
                <div className="col-span-1 text-muted-foreground">{packet.id}</div>
                <div className="col-span-2 text-muted-foreground">{packet.time}</div>
                <div className="col-span-2 text-foreground">{packet.source}</div>
                <div className="col-span-2 text-foreground">{packet.destination}</div>
                <div className="col-span-1">
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${getProtocolColor(packet.protocol)}`}>
                    {packet.protocol}
                  </span>
                </div>
                <div className="col-span-4 text-muted-foreground truncate">{packet.info}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="px-4 py-2 bg-muted/30 border-t border-border flex items-center justify-between text-xs font-mono text-muted-foreground">
        <span>
          {isRunning ? (
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              Capturing...
            </span>
          ) : (
            "Capture stopped"
          )}
        </span>
        <span>
          {filter && filterValid && (
            <span className="text-success">Filter applied: {filter}</span>
          )}
          {filter && !filterValid && (
            <span className="text-destructive">Invalid filter syntax</span>
          )}
        </span>
      </div>
    </div>
  );
};

export default PacketSimulator;
