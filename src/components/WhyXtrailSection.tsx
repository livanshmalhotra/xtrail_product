"use client";

import React from "react";
import { UserCheck, Layers, TrendingUp, Award, Cpu, Clock, ShieldAlert, CheckCircle2 } from "lucide-react";

export default function WhyXtrailSection() {
  const advantages = [
    {
      icon: UserCheck,
      title: "Customized Approach",
      desc: "Tailored IIoT retrofits designed specifically for 20 to 40 year old legacy machinery, preserving existing capital investments.",
    },
    {
      icon: Layers,
      title: "End-to-End Solutions",
      desc: "Sensors + Gateways + Automation + Digital Dashboards + AI in one turnkey project. One partner, one contract.",
    },
    {
      icon: TrendingUp,
      title: "Improved Factory Efficiency",
      desc: "Track real-time production output, power consumption, idle time, and operator activity across multi-state plant networks.",
    },
    {
      icon: Award,
      title: "Industry Expertise",
      desc: "Proven track record modernizing tier-1 & tier-2 manufacturing units across South & West India (KA, TN, AP).",
    },
    {
      icon: Cpu,
      title: "AI-Powered Intelligence",
      desc: "Self-learning predictive algorithms warn maintenance teams days before machine component breakdown occurs.",
    },
    {
      icon: Clock,
      title: "Rapid ROI & Minimal Disruption",
      desc: "Non-invasive sensor installation completed in hours without halting production line operations, yielding 3-6 month payback.",
    },
  ];

  return (
    <section className="relative w-full py-28 bg-[#E0EFF4] text-[#0A0A0A] overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-pattern-light opacity-50 pointer-events-none" />

      <div className="relative z-10 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="font-mono text-xs font-semibold text-[#1e3a5f] tracking-[0.35em] uppercase block mb-3 opacity-70">
            OUR ADVANTAGE
          </span>
          <h2 className="font-syne font-extrabold text-3xl sm:text-5xl text-[#111111] mb-5 tracking-tight">
            Why Choose Xtrail
          </h2>
          <p className="font-mono text-sm text-[#1e3a5f]/80 leading-relaxed max-w-xl mx-auto">
            We combine deep manufacturing domain expertise with non-invasive IoT retrofits and enterprise AI to deliver real, measurable plant performance.
          </p>
        </div>

        {/* 6 Advantage Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {advantages.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="group rounded-2xl bg-white p-8 border border-[#1e3a5f]/10 shadow-[0_4px_20px_rgba(30,58,95,0.06)] hover:shadow-[0_12px_40px_rgba(30,58,95,0.14)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#e8f4f8] text-[#1e3a5f] flex items-center justify-center mb-6 group-hover:bg-[#1e3a5f] group-hover:text-white transition-colors duration-300">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <h3 className="font-syne font-bold text-xl text-[#111111] mb-3 group-hover:text-[#1e3a5f] transition-colors">
                    {item.title}
                  </h3>

                  <p className="font-mono text-xs text-[#4a5568] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-black/5 flex items-center gap-2 font-mono text-[11px] font-semibold text-[#1e3a5f] opacity-80 group-hover:opacity-100">
                  <CheckCircle2 className="w-4 h-4 text-[#1e3a5f]" />
                  <span>XTRAIL PROVEN GUARANTEE</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
