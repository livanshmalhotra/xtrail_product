"use client";

import React, { useState } from "react";
import {
  Factory,
  Radio,
  Wifi,
  Database,
  BarChart3,
  BrainCircuit,
  Sparkles,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

export default function Industry40Section() {
  const [activeStep, setActiveStep] = useState(4); // Default to AI step

  const steps = [
    {
      id: 1,
      name: "Legacy Machines",
      short: "01. Hardware",
      icon: Factory,
      tagline: "20-40 Year Old Industrial Machinery",
      desc: "Silent CNCs, hydraulic presses, conveyors, and stamping machines without native cloud connectivity.",
      badge: "Legacy Baseline",
    },
    {
      id: 2,
      name: "Sensors",
      short: "02. Retrofit",
      icon: Radio,
      tagline: "Non-Invasive IIoT Sensor Arrays",
      desc: "Magnetic vibration sensors, surface thermistors, CT power clamps, and photoelectric counters.",
      badge: "Plug & Play",
    },
    {
      id: 3,
      name: "Connectivity",
      short: "03. Edge IoT",
      icon: Wifi,
      tagline: "Industrial Gateways & Edge Compute",
      desc: "Secure Modbus/MQTT edge gateways transmitting high-frequency telemetry every 100ms.",
      badge: "Sub-Second Latency",
    },
    {
      id: 4,
      name: "Data Integration",
      short: "04. Ingestion",
      icon: Database,
      tagline: "Centralized Factory Data Lake",
      desc: "Normalized telemetry streams unified into time-series data stores with multi-plant rollups.",
      badge: "Unified Schema",
    },
    {
      id: 5,
      name: "Analytics",
      short: "05. Dashboards",
      icon: BarChart3,
      tagline: "Real-Time OEE & Downtime Tracking",
      desc: "Live calculation of Overall Equipment Effectiveness (OEE), TEEP, shift output, and energy per part.",
      badge: "Live Telemetry",
    },
    {
      id: 6,
      name: "AI Engine",
      short: "06. Neural AI",
      icon: BrainCircuit,
      tagline: "Predictive & Prescriptive Models",
      desc: "Machine learning models predicting bearing failures, thermal anomalies, and component wear 72h prior.",
      badge: "Self-Learning AI",
    },
    {
      id: 7,
      name: "Smart Factory",
      short: "07. Intelligent",
      icon: Sparkles,
      tagline: "Autonomous Industrial Operations",
      desc: "Closed-loop feedback control, automated work-order generation, and continuous efficiency gains.",
      badge: "Target State",
    },
  ];

  return (
    <section id="industry40" className="relative w-full py-28 bg-[#050505] text-white overflow-hidden border-b border-white/10">
      {/* Dark Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#00a7e1]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#00a7e1] animate-ping" />
            <span className="font-mono text-[11px] tracking-[0.25em] text-[#00a7e1] uppercase font-semibold">
              Industry 4.0 Transformation Path
            </span>
          </div>

          <h2 className="font-syne font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white mb-6 tracking-tight leading-tight">
            From Silent Machinery to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00a7e1] to-[#00d2b8]">
              Intelligent Factories
            </span>
          </h2>

          <p className="font-mono text-sm text-white/60 leading-relaxed">
            Xtrail bridges the gap between legacy manufacturing assets and modern enterprise AI.
            Our non-invasive retrofit pipeline turns 30-year-old machinery into data-rich smart assets.
          </p>
        </div>

        {/* Dynamic Progression Pipeline Stepper Bar */}
        <div className="mb-14 overflow-x-auto pb-4 scrollbar-none">
          <div className="flex items-center justify-between min-w-[900px] px-4 py-6 rounded-2xl bg-[#0c0e14]/90 border border-white/10 backdrop-blur-xl">
            {steps.map((step, idx) => {
              const IconComp = step.icon;
              const isActive = activeStep === step.id;
              const isPast = step.id < activeStep;

              return (
                <React.Fragment key={step.id}>
                  <button
                    onClick={() => setActiveStep(step.id)}
                    className={`group flex flex-col items-center gap-3 p-3 rounded-xl transition-all duration-300 relative ${
                      isActive
                        ? "bg-[#00a7e1]/20 border border-[#00a7e1] scale-105 shadow-[0_0_25px_rgba(0,167,225,0.3)]"
                        : "hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                        isActive
                          ? "bg-[#00a7e1] text-black"
                          : isPast
                          ? "bg-white/10 text-[#00a7e1]"
                          : "bg-white/5 text-white/40"
                      }`}
                    >
                      <IconComp className="w-6 h-6" />
                    </div>

                    <div className="text-center">
                      <span className="block font-mono text-[10px] text-white/40 uppercase tracking-widest">
                        {step.short}
                      </span>
                      <span
                        className={`block font-syne font-bold text-xs ${
                          isActive ? "text-[#00a7e1]" : "text-white/80"
                        }`}
                      >
                        {step.name}
                      </span>
                    </div>
                  </button>

                  {idx < steps.length - 1 && (
                    <div className="flex-1 flex items-center justify-center relative px-2">
                      <div className="h-[2px] w-full bg-white/10 relative overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ${
                            isPast || isActive ? "bg-[#00a7e1] w-full" : "w-0"
                          }`}
                        />
                      </div>
                      <ChevronRight className="w-4 h-4 text-white/30 shrink-0" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Selected Progression Details Card */}
        {(() => {
          const currentStep = steps.find((s) => s.id === activeStep) || steps[0];
          const IconComponent = currentStep.icon;

          return (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl bg-gradient-to-br from-[#0c0e14] via-[#090b10] to-[#050505] border border-white/15 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
              {/* Card Ambient Glow */}
              <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-[#00a7e1]/10 rounded-full blur-3xl pointer-events-none" />

              {/* Left Column inside Detail Card */}
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#00a7e1]/10 border border-[#00a7e1]/30">
                  <span className="font-mono text-xs font-bold text-[#00a7e1] uppercase">
                    STAGE {currentStep.id} OF 7 • {currentStep.badge}
                  </span>
                </div>

                <h3 className="font-syne font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                  {currentStep.tagline}
                </h3>

                <p className="font-mono text-sm text-white/70 leading-relaxed">
                  {currentStep.desc}
                </p>

                <div className="pt-4 space-y-3">
                  <div className="flex items-center gap-3 font-mono text-xs text-white/80">
                    <CheckCircle2 className="w-4 h-4 text-[#00a7e1]" />
                    <span>Zero alteration to original machine electrical controls</span>
                  </div>
                  <div className="flex items-center gap-3 font-mono text-xs text-white/80">
                    <CheckCircle2 className="w-4 h-4 text-[#00a7e1]" />
                    <span>Multi-protocol edge gateway support (Modbus, OPC-UA, MQTT)</span>
                  </div>
                  <div className="flex items-center gap-3 font-mono text-xs text-white/80">
                    <CheckCircle2 className="w-4 h-4 text-[#00a7e1]" />
                    <span>Real-time anomaly triggers to plant engineers via SMS/Telegram</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Diagram Widget */}
              <div className="lg:col-span-6 flex justify-center">
                <div className="w-full max-w-md p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl relative space-y-5">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#00a7e1] text-black flex items-center justify-center font-bold">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-syne font-bold text-base text-white">{currentStep.name}</div>
                        <div className="font-mono text-[10px] text-[#00a7e1]">SYSTEM ARCHITECTURE NODE</div>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded font-bold">
                      HEALTH: OPTIMAL
                    </span>
                  </div>

                  {/* Simulated Telemetry Streams */}
                  <div className="space-y-3 font-mono text-xs">
                    <div className="p-3 rounded-lg bg-black/40 border border-white/5 flex justify-between items-center">
                      <span className="text-white/50">Data Stream Throughput</span>
                      <span className="text-[#00a7e1] font-bold">1,420 pkts/sec</span>
                    </div>

                    <div className="p-3 rounded-lg bg-black/40 border border-white/5 flex justify-between items-center">
                      <span className="text-white/50">Anomaly Detection Confidence</span>
                      <span className="text-emerald-400 font-bold">99.2%</span>
                    </div>

                    <div className="p-3 rounded-lg bg-black/40 border border-white/5 flex justify-between items-center">
                      <span className="text-white/50">Predicted Remaining Lifetime</span>
                      <span className="text-amber-400 font-bold">4,820 Hours</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </section>
  );
}
