import { Globe, FileText, Shield, Zap, Play, Terminal } from "lucide-react";
import PacketAnimation from "@/components/PacketAnimation";
import FilterTable from "@/components/FilterTable";
import Quiz from "@/components/Quiz";
import ComparisonTable from "@/components/ComparisonTable";
import SectionCard from "@/components/SectionCard";
import WorkflowDiagram from "@/components/WorkflowDiagram";
import RealityChecklist from "@/components/RealityChecklist";
import TerminalText from "@/components/TerminalText";
import StepGuide from "@/components/StepGuide";
import SOCWorkflow from "@/components/SOCWorkflow";
import PacketSimulator from "@/components/PacketSimulator";

const dnsFilters = [
  { filter: "dns", use: "Show all DNS traffic" },
  { filter: "dns.qry.name", use: "Show requested domain name" },
  { filter: "dns.a", use: "Show DNS A record responses" },
  { filter: "udp.port == 53", use: "DNS over UDP" },
  { filter: "dns.flags.response == 0", use: "Show DNS queries only" },
];

const httpFilters = [
  { filter: "http", use: "Show all HTTP traffic" },
  { filter: "http.request", use: "Show HTTP requests" },
  { filter: "http.response", use: "Show HTTP responses" },
  { filter: "http.host", use: "Filter by hostname" },
  { filter: "tcp.port == 80", use: "HTTP traffic port" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background cyber-grid relative">
      {/* Scanline overlay */}
      <div className="fixed inset-0 scanline pointer-events-none z-50" />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex flex-col items-center justify-center px-4 py-16 overflow-hidden">
        <PacketAnimation />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-6">
            <Shield className="w-4 h-4 text-primary" />
            <span className="font-mono text-sm text-primary">SOC Analyst L1 Training</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            DNS & HTTP Traffic
            <br />
            <span className="text-gradient-cyber">Analysis with Wireshark</span>
          </h1>

          <div className="text-xl text-muted-foreground font-mono mt-6">
            <TerminalText text="$ wireshark --capture --filter 'dns or http'" typingSpeed={40} />
          </div>
        </div>
      </section>

      {/* Workflow Diagram */}
      <section className="px-4 py-8 max-w-4xl mx-auto">
        <h2 className="text-xl font-mono text-center text-muted-foreground mb-6">
          <Zap className="inline w-5 h-5 text-primary mr-2" />
          Real-Time Network Flow
        </h2>
        <WorkflowDiagram />
      </section>

      {/* Quiz Section */}
      <section className="px-4 py-16 max-w-4xl mx-auto">
        <Quiz />
      </section>

      {/* Packet Capture Simulator */}
      <section className="px-4 py-16 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-foreground mb-2">
          <Terminal className="inline w-6 h-6 text-primary mr-2" />
          Practice: Packet Capture Simulator
        </h2>
        <p className="text-center text-muted-foreground mb-8 font-mono text-sm">
          Apply Wireshark display filters in real-time
        </p>
        <PacketSimulator />
      </section>

      {/* Main Content */}
      <section className="px-4 py-16 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* DNS Section */}
          <SectionCard
            icon={<Globe className="w-6 h-6" />}
            title="DNS Analysis"
            subtitle="Domain Name System"
            accentColor="primary"
          >
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-background/50 border border-border">
                <p className="text-muted-foreground text-sm mb-2">What is DNS?</p>
                <p className="text-foreground">
                  DNS converts a website name into an IP address.
                </p>
                <div className="mt-3 p-3 rounded bg-primary/10 font-mono text-sm">
                  <span className="text-muted-foreground">Example: </span>
                  <span className="text-primary">google.com</span>
                  <span className="text-muted-foreground"> → </span>
                  <span className="text-success">142.250.183.206</span>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-background/50 border border-border">
                <p className="text-muted-foreground text-sm mb-2">Why SOC L1 Needs DNS</p>
                <ul className="space-y-2 text-foreground text-sm">
                  <li>• Shows which domains a system is trying to reach</li>
                  <li>• Helps detect suspicious or malicious domains</li>
                  <li>• Used in almost every network connection</li>
                  <li>• First indicator of C2 (Command & Control) activity</li>
                </ul>
              </div>

              <StepGuide
                title="How to See DNS in Real Time"
                description="You are watching which domain names a system is trying to access."
                accentColor="primary"
                steps={[
                  { text: "Open Wireshark" },
                  { text: "Select your active network interface" },
                  { text: "Click Start to begin capture" },
                  { text: "Open any website in a browser" },
                  { text: "Apply the display filter:", code: "dns" },
                ]}
                lookFor={{
                  label: "Look at:",
                  items: [
                    "Domain name (example.com)",
                    "Source IP (who is asking)",
                    "Destination IP (DNS server)",
                  ],
                }}
                indicators={{
                  good: "Known domain → normal",
                  bad: "Random or strange → escalate",
                }}
              />

              <FilterTable
                title="DNS Wireshark Filters"
                filters={dnsFilters}
                accentColor="primary"
              />
            </div>
          </SectionCard>

          {/* HTTP Section */}
          <SectionCard
            icon={<FileText className="w-6 h-6" />}
            title="HTTP Analysis"
            subtitle="HyperText Transfer Protocol"
            accentColor="success"
          >
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-background/50 border border-border">
                <p className="text-muted-foreground text-sm mb-2">What is HTTP?</p>
                <p className="text-foreground">
                  HTTP is used to load web pages and transfer data.
                </p>
                <div className="mt-3 p-3 rounded bg-success/10 font-mono text-sm">
                  <span className="text-muted-foreground">After DNS finds IP → </span>
                  <span className="text-success">HTTP gets content</span>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-background/50 border border-border">
                <p className="text-muted-foreground text-sm mb-2">Why SOC L1 Needs HTTP</p>
                <ul className="space-y-2 text-foreground text-sm">
                  <li>• Shows all web activity on the network</li>
                  <li>• Helps identify suspicious URLs</li>
                  <li>• Used by attackers to download malware</li>
                  <li>• Reveals data exfiltration attempts</li>
                </ul>
              </div>

              <StepGuide
                title="How to See HTTP in Real Time"
                description="You are watching web requests and responses."
                accentColor="success"
                steps={[
                  { text: "Start Wireshark capture" },
                  { text: "Visit a website using http:// (not https)", code: "http://example.com" },
                  { text: "Apply the display filter:", code: "http" },
                ]}
                lookFor={{
                  label: "Look at:",
                  items: [
                    "Website name",
                    "URL path",
                    "Request type (GET / POST)",
                  ],
                }}
                indicators={{
                  good: "Normal browsing → OK",
                  bad: "Unknown site or file download → investigate",
                }}
              />

              <FilterTable
                title="HTTP Wireshark Filters"
                filters={httpFilters}
                accentColor="success"
              />
            </div>
          </SectionCard>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="px-4 py-16 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-foreground mb-8">
          <span className="text-primary">{">"}</span> Quick Comparison (SOC View)
        </h2>
        <ComparisonTable />
      </section>

      {/* SOC L1 Real Work Workflow */}
      <section className="px-4 py-16 max-w-4xl mx-auto">
        <SOCWorkflow />
      </section>

      {/* Reality Check */}
      <section className="px-4 py-16 max-w-2xl mx-auto">
        <RealityChecklist />
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 border-t border-border">
        <div className="max-w-6xl mx-auto text-center">
          <p className="font-mono text-sm text-muted-foreground">
            <span className="text-primary">$</span> SOC Analyst L1 Training Module
            <span className="animate-terminal-blink ml-1 text-primary">▋</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
