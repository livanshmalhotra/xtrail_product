import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Server, Calendar, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Products · Xtrail AI",
  description:
    "Explore Xtrail AI Products — Command Tower, Edge IoT Nodes, Vision AI, and Poka-Yoke Automation for industrial manufacturing.",
};

export default function ProductsPage() {
  const products = [
    {
      id: "command-tower",
      tag: "FLAGSHIP SOFTWARE PLATFORM",
      title: "Xtrail Command Tower™",
      tagline: "Multi-Factory Operations Control & OEE Engine",
      desc: "A centralized real-time dashboard unifying production counts, shift targets, OEE, energy consumption, and downtime alerts across all your manufacturing plants.",
      iconName: "dashboard" as const,
      visualType: "dashboard" as const,
      metrics: {
        value: "89.4%",
        label: "AVG OEE BOOST",
      },
      specs: [
        "Real-time OEE & TEEP Capacity Analytics with multi-plant views (KA / TN / AP)",
        "Automated shift downtime classification & bottleneck diagnostic engines",
        "Python API & WebSocket real-time data stream adapters built for custom ML backends",
        "Role-based access control for plant managers, operators, and CXO executives",
      ],
    },
    {
      id: "edge-gateway",
      tag: "HARDWARE & EDGE COMPUTE",
      title: "Xtrail Edge IoT Node™",
      tagline: "Industrial Protocol Translator & Edge Gateway",
      desc: "Plug-and-play industrial hardware supporting Modbus RTU, OPC-UA, RS485, and analog sensor inputs. Transmits encrypted telemetry every 100ms.",
      iconName: "hardware" as const,
      visualType: "hardware" as const,
      metrics: {
        value: "<100ms",
        label: "DATA LATENCY",
      },
      specs: [
        "Sub-second high frequency data sampling (100ms resolution across 32 channels)",
        "Non-invasive zero-downtime installation on 20-40 year old legacy machines",
        "Industrial DIN-rail rugged aluminum enclosure (IP67 vibration & heat resistant)",
        "MQTT / HTTP REST endpoint connectivity ready for Python data pipelines",
      ],
    },
    {
      id: "vision-ai",
      tag: "AI PREDICTIVE ENGINE",
      title: "Xtrail Vision AI™",
      tagline: "Predictive Maintenance & Thermal Anomaly Detection",
      desc: "Neural network models monitoring high-frequency vibration signatures and infrared thermal patterns to predict mechanical bearing wear 72 hours prior to breakdown.",
      iconName: "ai" as const,
      visualType: "ai" as const,
      metrics: {
        value: "99.2%",
        label: "AI ACCURACY",
      },
      specs: [
        "72-hour early failure detection accuracy for critical bearings and motor spindles",
        "Automated thermal anomaly severity scoring & instant SMS / Telegram alerts",
        "Integrates with thermal IR, acoustic vibration, and surface thermistor sensors",
        "Native Python PyTorch / ONNX ML backend compatibility for edge AI models",
      ],
    },
    {
      id: "poka-yoke",
      tag: "AUTOMATION & SAFETY",
      title: "Xtrail Poka-Yoke Sense™",
      tagline: "Modular Quality Gate & Interlock System",
      desc: "Poka-yoke assembly line automation incorporating photoelectric sensors, conveyor interlocks, and automated stop-guards to prevent defect propagation.",
      iconName: "safety" as const,
      visualType: "safety" as const,
      metrics: {
        value: "0.0%",
        label: "DEFECT ESCAPE",
      },
      specs: [
        "Instant conveyor halt on defect detection before assembly line propagation",
        "Operator activity cycle tracking & automated station time logging",
        "Modular pneumatic & hydraulic actuator upgrades for legacy machinery",
        "Zero-error assembly verification with automated audit logging",
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-[#000000] text-white flex flex-col justify-between selection:bg-white selection:text-black">
      <Navbar />

      <div className="pt-28 pb-20 sm:pt-36 sm:pb-28 relative overflow-hidden bg-[#000000]">
        {/* Monochromatic Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

        {/* Ambient Background Glows */}
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-white/5 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-white/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-24">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/20 mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="font-mono text-[11px] font-semibold text-white tracking-[0.25em] uppercase">
                XTRAIL PRODUCT SUITE
              </span>
            </div>

            <h1 className="font-syne font-extrabold text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight mb-6 leading-tight">
              Enterprise Industrial AI &{" "}
              <span className="hero-title-outline text-white">
                IIoT Platforms
              </span>
            </h1>

            <p className="font-mono text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Purpose-built hardware nodes, real-time command towers, and predictive machine learning models designed specifically to digitize legacy manufacturing plants.
            </p>

            {/* Python Backend Readiness Badge */}
            <div className="mt-8 inline-flex items-center gap-3 px-5 py-2.5 rounded-xl bg-white/5 border border-white/20">
              <Server className="w-4 h-4 text-[#00a7e1]" />
              <span className="font-mono text-xs font-semibold text-zinc-200">
                Backend Ready: Standard REST & WebSocket APIs ready to connect with Python services
              </span>
            </div>
          </div>

          {/* Product Cards List */}
          <div className="space-y-12 mb-24">
            {products.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>

          {/* CTA Evaluation Banner */}
          <div id="demo" className="rounded-3xl bg-zinc-950 border border-white/20 p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
            <h2 className="font-syne font-extrabold text-3xl sm:text-4xl text-white mb-4">
              Need a Custom Product Evaluation?
            </h2>
            <p className="font-mono text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto mb-8 leading-relaxed">
              Our engineering team provides test gateway units and live Command Tower dashboard demos tailored for your factory setup.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/try-now"
                className="px-8 py-4 rounded-xl font-mono text-xs font-bold tracking-widest uppercase bg-[#00a7e1] text-black hover:bg-white transition-all duration-300 shadow-[0_0_25px_rgba(0,167,225,0.4)] flex items-center gap-2 hover:scale-105"
              >
                <span>Try Now</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="mailto:products@xtrail.in"
                className="px-8 py-4 rounded-xl font-mono text-xs font-bold tracking-widest uppercase bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all duration-300 flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Contact Products Team</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
