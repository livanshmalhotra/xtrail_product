"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Activity, Zap, Cpu, ShieldCheck, Radio } from "lucide-react";

export default function HeroSection() {
  // Simulated real-time machine telemetry values
  const [oeeIndex, setOeeIndex] = useState(89.4);
  const [powerSavings, setPowerSavings] = useState(24.8);
  const [vibrationVal, setVibrationVal] = useState(0.04);

  useEffect(() => {
    const interval = setInterval(() => {
      setOeeIndex((prev) => +(prev + (Math.random() * 0.4 - 0.2)).toFixed(1));
      setPowerSavings((prev) => +(prev + (Math.random() * 0.2 - 0.1)).toFixed(1));
      setVibrationVal((prev) => +(0.04 + Math.random() * 0.01).toFixed(3));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden flex items-center bg-[#050505] border-b border-white/10">
      {/* Grid pattern background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.12] pointer-events-none" />

      {/* Radial ambient glow */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#00a7e1]/10 rounded-full blur-[140px] pointer-events-none animate-pulseGlow" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-[#00d2b8]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Headline & Messaging */}
        <div className="lg:col-span-7 flex flex-col gap-6 sm:gap-8">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-3 w-fit px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#00a7e1] animate-ping" />
            <span className="font-mono text-[11px] tracking-[0.25em] text-white/70 uppercase">
              Next-Gen Digital Partner
            </span>
          </div>

          {/* Main Hero Title */}
          <div className="flex flex-col gap-1 sm:gap-2">
            <span className="hero-title-solid text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight">
              Unlocking Your
            </span>
            <span className="hero-title-outline text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight">
              Digital Potential
            </span>
            <span className="hero-title-solid text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-[#00a7e1]">
              With Xtrail AI
            </span>
          </div>

          {/* Subtitle */}
          <p className="font-mono text-white/60 text-sm sm:text-base max-w-xl leading-relaxed tracking-tight">
            Building liquid identities and high-performance digital systems for the cutting edge of AI.
            We empower legacy industrial plants with IIoT sensorization, real-time command centers, and predictive intelligence.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-5 sm:gap-6 pt-2">
            <a
              href="#contact"
              className="hero-cta-btn bg-white text-black font-mono text-xs tracking-widest uppercase border border-white hover:border-[#00a7e1]"
            >
              Start Transformation
            </a>
            <a
              href="#services"
              className="group inline-flex items-center gap-2 text-xs font-mono tracking-widest text-white/80 hover:text-white uppercase transition-all duration-300 py-3"
            >
              <span>View Services</span>
              <ArrowRight className="w-4 h-4 text-[#00a7e1] group-hover:translate-x-2 transition-transform duration-300" />
            </a>
          </div>

          {/* Key Metric Pills */}
          <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 max-w-lg">
            <div>
              <div className="font-syne font-bold text-xl sm:text-2xl text-white">40%+</div>
              <div className="font-mono text-[10px] text-white/40 uppercase tracking-wider">OEE Gain</div>
            </div>
            <div>
              <div className="font-syne font-bold text-xl sm:text-2xl text-white">Zero</div>
              <div className="font-mono text-[10px] text-white/40 uppercase tracking-wider">Downtime Retrofit</div>
            </div>
            <div>
              <div className="font-syne font-bold text-xl sm:text-2xl text-white">3-6 Mo</div>
              <div className="font-mono text-[10px] text-white/40 uppercase tracking-wider">Rapid ROI</div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Industrial AI Control Panel Simulation */}
        <div className="lg:col-span-5 flex justify-center w-full">
          <div className="relative w-full max-w-md lg:max-w-none">
            {/* Ambient Back Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#00a7e1]/30 to-[#00d2b8]/30 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition duration-1000" />

            {/* Main Visual Glass Card */}
            <div className="relative rounded-2xl bg-[#0a0d14]/90 border border-white/15 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl overflow-hidden">
              {/* Card Scanline Effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00a7e1]/5 to-transparent h-20 animate-scanline pointer-events-none" />

              {/* Header inside card */}
              <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#00a7e1]/10 border border-[#00a7e1]/30 flex items-center justify-center">
                    <Cpu className="w-4 h-4 text-[#00a7e1]" />
                  </div>
                  <div>
                    <h3 className="font-syne font-bold text-sm text-white">Plant Control Tower</h3>
                    <p className="font-mono text-[10px] text-white/40">NODE-8472 • LIVE FEED</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                  <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                  <span className="font-mono text-[10px] font-semibold text-emerald-400 uppercase">ACTIVE</span>
                </div>
              </div>

              {/* Telemetry Grid */}
              <div className="space-y-4">
                {/* OEE Metric */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Activity className="w-5 h-5 text-[#00a7e1]" />
                    <div>
                      <div className="font-mono text-[11px] text-white/50 uppercase">Overall Equipment Efficiency</div>
                      <div className="font-syne font-bold text-xl text-white">{oeeIndex}%</div>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">
                    +4.2%
                  </span>
                </div>

                {/* Energy Efficiency Metric */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-[#00d2b8]" />
                    <div>
                      <div className="font-mono text-[11px] text-white/50 uppercase">Energy Savings Rate</div>
                      <div className="font-syne font-bold text-xl text-white">{powerSavings}%</div>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-[#00d2b8] bg-[#00d2b8]/10 px-2 py-1 rounded">
                    OPTIMIZED
                  </span>
                </div>

                {/* Vibration & Predictive AI Status */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-white/50">SENSOR VIBRATION TELEMETRY</span>
                    <span className="text-[#00a7e1] font-semibold">{vibrationVal} g-RMS</span>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-[#00a7e1] to-[#00d2b8] h-full w-[45%] rounded-full animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Status Banner */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/60">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>AI Predictive Guard: ONLINE</span>
                </div>
                <span className="text-[#00a7e1] font-bold">100% HEALTH</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
