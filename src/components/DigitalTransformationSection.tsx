"use client";

import React, { useState } from "react";
import { Eye, Bot, Cpu, Search, Activity, LayoutDashboard, Brain, Wrench } from "lucide-react";

export default function DigitalTransformationSection() {
  const [activeTab, setActiveTab] = useState<"visibility" | "automation" | "intelligence">("visibility");

  const pillars = [
    {
      id: "visibility",
      title: "1. Visibility",
      subtitle: "See Everything in Real-Time",
      icon: Eye,
      color: "from-[#00a7e1] to-[#0077b6]",
      desc: "Transform 'silent' machine floors into real-time operational displays across your multi-state plants.",
      steps: [
        {
          num: "01",
          name: "Plant Audit & Assessment",
          desc: "Comprehensive on-site audit of 20-40 year old machines, bottleneck identification, and ROI projection.",
          icon: Search,
        },
        {
          num: "02",
          name: "Non-Invasive Sensorization",
          desc: "Quick attach magnetic vibration sensors, thermistors, current transformers, and optical pulse counters.",
          icon: Activity,
        },
      ],
    },
    {
      id: "automation",
      title: "2. Automation",
      subtitle: "Streamline & Control",
      icon: Bot,
      color: "from-[#00d2b8] to-[#00a7e1]",
      desc: "Automate machine status logging, conveyor flow, poka-yoke gates, and shopfloor alerts.",
      steps: [
        {
          num: "03",
          name: "Data Integration & Gateways",
          desc: "Unify disparate industrial protocols (Modbus, OPC-UA, RS485) into a single edge data gateway.",
          icon: Cpu,
        },
        {
          num: "04",
          name: "Real-Time Central Dashboards",
          desc: "Centralized command center tracking live OEE, shift target completion, power utilization, and idle time.",
          icon: LayoutDashboard,
        },
      ],
    },
    {
      id: "intelligence",
      title: "3. Intelligence",
      subtitle: "Predict & Optimize with AI",
      icon: Brain,
      color: "from-[#7209b7] to-[#00a7e1]",
      desc: "Deploy AI models that predict breakdowns, prescribe optimal maintenance schedules, and boost TEEP.",
      steps: [
        {
          num: "05",
          name: "AI Intelligence Layer",
          desc: "Machine learning algorithms trained on plant telemetry data to detect subtle degradation patterns.",
          icon: Brain,
        },
        {
          num: "06",
          name: "Predictive Maintenance AI",
          desc: "Prescriptive warnings sent automatically before catastrophic machine failures occur.",
          icon: Wrench,
        },
      ],
    },
  ];

  const currentPillar = pillars.find((p) => p.id === activeTab) || pillars[0];

  return (
    <section id="transformation" className="relative w-full py-28 bg-[#050505] text-white overflow-hidden border-b border-white/10">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-[#00a7e1]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs font-semibold text-[#00a7e1] tracking-[0.25em] uppercase block mb-3">
            XTRAIL METHODOLOGY
          </span>
          <h2 className="font-syne font-extrabold text-3xl sm:text-5xl text-white mb-6">
            The Digital Transformation Journey
          </h2>
          <p className="font-mono text-sm text-white/60">
            A proven 3-phase framework for modernizing legacy manufacturing operations with predictable outcomes.
          </p>
        </div>

        {/* 3 Main Phase Selector Tabs: Visibility -> Automation -> Intelligence */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-14">
          {pillars.map((pillar) => {
            const IconC = pillar.icon;
            const isSelected = activeTab === pillar.id;

            return (
              <button
                key={pillar.id}
                onClick={() => setActiveTab(pillar.id as any)}
                className={`p-6 rounded-2xl border transition-all duration-300 flex items-center gap-4 text-left ${
                  isSelected
                    ? "bg-white/10 border-[#00a7e1] shadow-[0_0_30px_rgba(0,167,225,0.2)] scale-102"
                    : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 opacity-70"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold shrink-0 ${
                    isSelected ? "bg-[#00a7e1] text-black" : "bg-white/10 text-white"
                  }`}
                >
                  <IconC className="w-6 h-6" />
                </div>

                <div>
                  <h3 className="font-syne font-bold text-lg text-white">{pillar.title}</h3>
                  <p className="font-mono text-xs text-white/50">{pillar.subtitle}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Phase Detail Display */}
        <div className="rounded-3xl bg-[#0c0e14] border border-white/15 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-white/10">
            <div>
              <span className="font-mono text-xs text-[#00a7e1] uppercase font-bold tracking-widest block mb-2">
                ACTIVE PHASE • {currentPillar.title}
              </span>
              <h3 className="font-syne font-extrabold text-2xl sm:text-3xl text-white">
                {currentPillar.subtitle}
              </h3>
            </div>
            <p className="font-mono text-xs sm:text-sm text-white/60 max-w-md">
              {currentPillar.desc}
            </p>
          </div>

          {/* 2 Step Cards inside the Active Phase */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {currentPillar.steps.map((step) => {
              const StepIcon = step.icon;

              return (
                <div
                  key={step.num}
                  className="rounded-2xl bg-white/5 border border-white/10 p-8 hover:bg-white/10 hover:border-[#00a7e1]/40 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#00a7e1]/10 border border-[#00a7e1]/30 flex items-center justify-center text-[#00a7e1] group-hover:scale-110 transition-transform">
                      <StepIcon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-lg font-bold text-white/30 group-hover:text-[#00a7e1] transition-colors">
                      STEP {step.num}
                    </span>
                  </div>

                  <h4 className="font-syne font-bold text-xl text-white mb-3">
                    {step.name}
                  </h4>
                  <p className="font-mono text-xs text-white/60 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
