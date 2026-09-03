"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function ServicesSection() {
  const [activePanel, setActivePanel] = useState<number | null>(null);

  const services = [
    {
      num: "01",
      tag: "LEGACY DX",
      title: "Digital Transformation Consulting",
      desc: "Strategic roadmap for 20–40 year old legacy manufacturing plants.",
      items: [
        "Plant Audit & ROI Calculator",
        "Legacy Machine Assessment",
        "Phased Digital Roadmap (Visibility → Automation → AI)",
        "Multi-state rollout strategy (KA / TN / AP)",
      ],
    },
    {
      num: "02",
      tag: "RETROFIT",
      title: "Sensorization & Automation Services",
      desc: "Non-invasive IIoT retrofit for silent industrial machinery.",
      items: [
        "Condition Monitoring Sensors (Vibration + Temperature)",
        "Energy Monitoring (CT Clamps & Power Analyzers)",
        "Modular Conveyors & Hydraulic/Pneumatic Upgrades",
        "Poka-Yoke Safety Systems & Quality Gates",
      ],
    },
    {
      num: "03",
      tag: "AI INTELLIGENCE",
      title: "Centralized Control Tower",
      desc: "Turn raw factory data into automated, predictive decision-making.",
      items: [
        "Centralized Command Center & Multi-Factory Dashboards",
        "Predictive & Prescriptive Maintenance AI",
        "Anomaly Detection & Real-time Diagnostics AI",
        "OEE Tracking + TEEP Capacity Optimization",
      ],
    },
  ];

  const tickerWords = [
    "STRATEGY",
    "INNOVATION",
    "TECHNOLOGY",
    "GROWTH",
    "PERFORMANCE",
    "DIGITAL",
    "AI",
    "TRANSFORMATION",
  ];

  return (
    <section id="services" className="relative w-full py-24 bg-[#E0EFF4] text-[#0A0A0A] overflow-hidden">
      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern-light opacity-60 pointer-events-none" />

      <div className="relative z-10 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-3 justify-center mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0A0A0A] animate-ping" />
            <span className="font-mono text-[11px] font-semibold tracking-[0.25em] text-[#0A0A0A]/60 uppercase">
              XTRAIL AI SOLUTIONS
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#0A0A0A] animate-ping" />
          </div>

          <div className="flex flex-col items-center justify-center font-syne mb-6">
            <span className="font-extrabold text-4xl sm:text-7xl lg:text-8xl tracking-tight text-[#0A0A0A] leading-tight">
              WE BUILD
            </span>
            <span className="title-outline-dark text-4xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight">
              YOUR DIGITAL
            </span>
            <span className="font-extrabold text-4xl sm:text-7xl lg:text-8xl tracking-tight text-[#0A0A0A] leading-tight">
              FUTURES
            </span>
          </div>

          <p className="font-mono text-xs sm:text-sm text-[#0A0A0A]/70 tracking-wide max-w-xl mx-auto leading-relaxed">
            End-to-end digital transformation • IIOT Industrialization • Automation • AI for Industry 4.0
          </p>
        </div>

        {/* Services 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {services.map((service, idx) => (
            <div
              key={service.num}
              onMouseEnter={() => setActivePanel(idx)}
              onMouseLeave={() => setActivePanel(null)}
              className={`relative rounded-2xl p-8 transition-all duration-400 border flex flex-col justify-between cursor-pointer ${
                activePanel === idx
                  ? "bg-white shadow-[0_20px_50px_rgba(30,58,95,0.12)] border-[#1e3a5f]/20 -translate-y-2"
                  : "bg-white/60 hover:bg-white border-black/5 shadow-sm"
              }`}
            >
              {/* Top Bar Indicator */}
              <div
                className={`h-1 w-full bg-[#1e3a5f] rounded-t-full transition-transform duration-300 ${
                  activePanel === idx ? "scale-x-100" : "scale-x-0"
                }`}
              />

              <div>
                {/* Panel Tag & Number */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-[10px] font-bold tracking-[0.25em] text-[#1e3a5f]/60 uppercase">
                    {service.tag}
                  </span>
                  <span className="font-mono text-xs font-semibold text-[#1e3a5f]/40">
                    {service.num}
                  </span>
                </div>

                {/* Panel Title & Desc */}
                <h3 className="font-syne font-extrabold text-2xl text-[#0A0A0A] mb-3 leading-snug">
                  {service.title}
                </h3>
                <p className="font-mono text-xs text-[#0A0A0A]/60 mb-8 leading-relaxed">
                  {service.desc}
                </p>

                {/* List of features */}
                <ul className="space-y-3.5 pt-4 border-t border-black/5">
                  {service.items.map((item, itemIdx) => (
                    <li
                      key={itemIdx}
                      className="flex items-start gap-3 group/item transition-transform duration-200 hover:translate-x-1"
                    >
                      <ArrowRight className="w-4 h-4 text-[#1e3a5f] shrink-0 mt-0.5 opacity-60 group-hover/item:opacity-100" />
                      <span className="text-sm font-medium text-[#1a1a1a] leading-tight">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Panel Footer */}
              <div className="pt-8 mt-6 border-t border-black/5 flex items-center justify-between">
                <span className="font-mono text-[11px] tracking-wider text-[#1e3a5f]/60 font-semibold uppercase group-hover:text-[#1e3a5f]">
                  Explore Solution
                </span>
                <ArrowRight className="w-4 h-4 text-[#1e3a5f] transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>

        {/* Endless Marquee Ticker */}
        <div className="pt-8 border-t border-black/10 overflow-hidden">
          <div className="flex w-max animate-ticker whitespace-nowrap">
            {[...tickerWords, ...tickerWords, ...tickerWords, ...tickerWords].map(
              (word, i) => (
                <div key={i} className="flex items-center gap-6 px-6 font-mono text-xs tracking-[0.25em] text-[#1e3a5f]/40">
                  <span>{word}</span>
                  <span className="text-[#1e3a5f]/20">✦</span>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
