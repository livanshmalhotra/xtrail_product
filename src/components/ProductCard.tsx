"use client";

import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Cpu,
  Eye,
  ShieldAlert,
  ArrowRight,
  Terminal,
} from "lucide-react";

interface ProductCardProps {
  product: {
    id: string;
    tag: string;
    title: string;
    tagline: string;
    desc: string;
    iconName: "dashboard" | "hardware" | "ai" | "safety";
    metrics: { value: string; label: string };
    specs: string[];
    visualType: "dashboard" | "hardware" | "ai" | "safety";
  };
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [typedWordsCount, setTypedWordsCount] = useState<number>(0);

  const getIcon = (name: string) => {
    switch (name) {
      case "dashboard":
        return LayoutDashboard;
      case "hardware":
        return Cpu;
      case "ai":
        return Eye;
      case "safety":
        return ShieldAlert;
      default:
        return LayoutDashboard;
    }
  };

  const IconComp = getIcon(product.iconName);
  const isEven = index % 2 === 0;

  // Split all specs into words per line
  const specsWords = product.specs.map((spec) => spec.split(" "));
  const totalWords = specsWords.reduce((acc, words) => acc + words.length, 0);

  // Word-by-word typewriter animation trigger when hovered
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHovered) {
      setTypedWordsCount(0);
      interval = setInterval(() => {
        setTypedWordsCount((prev) => {
          if (prev < totalWords) {
            return prev + 1;
          }
          clearInterval(interval);
          return prev;
        });
      }, 70); // Types 1 word every 70ms for realistic terminal writing speed
    } else {
      setTypedWordsCount(0);
    }
    return () => clearInterval(interval);
  }, [isHovered, totalWords]);

  // Helper function to render typed words per line
  const renderTypedLines = () => {
    let accumulatedWords = 0;
    return specsWords.map((words, lineIdx) => {
      const startWordIdx = accumulatedWords;
      const endWordIdx = accumulatedWords + words.length;
      accumulatedWords += words.length;

      // If typedWordsCount hasn't reached this line yet, don't show line
      if (typedWordsCount < startWordIdx) return null;

      // Calculate how many words of this line to display
      const visibleWordsInLine = Math.max(
        0,
        Math.min(words.length, typedWordsCount - startWordIdx)
      );

      const visibleText = words.slice(0, visibleWordsInLine).join(" ");
      const isCurrentlyTypingThisLine =
        typedWordsCount >= startWordIdx && typedWordsCount < endWordIdx;

      return (
        <div key={lineIdx} className="flex items-start gap-2 text-xs font-mono text-zinc-200 leading-relaxed">
          <span className="text-white font-bold shrink-0">&gt;</span>
          <span className="text-white font-mono">
            {visibleText}
            {isCurrentlyTypingThisLine && (
              <span className="inline-block w-2 h-3.5 bg-[#00a7e1] animate-pulse ml-1 align-middle" />
            )}
          </span>
        </div>
      );
    });
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group rounded-3xl bg-[#09090b] border border-white/15 p-8 sm:p-10 backdrop-blur-2xl shadow-2xl relative overflow-hidden transition-all duration-500 hover:border-white/50 hover:shadow-[0_0_50px_rgba(255,255,255,0.08)] cursor-pointer"
    >
      {/* Subtle Monochrome Ambient Gradient Overlay */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
      <div
        className={`absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
      />

      <div
        className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
          isEven ? "" : "lg:flex-row-reverse"
        }`}
      >
        {/* Content Side */}
        <div className="lg:col-span-7 flex flex-col justify-between min-h-[380px] relative z-10">
          {/* Top Bar: Tag & Slow Blinking Blue Production Ready Badge */}
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-[10px] font-bold tracking-[0.25em] text-white uppercase bg-white/10 px-3 py-1 rounded border border-white/20">
              {product.tag}
            </span>

            {/* Slow Blinking Blue Badge */}
            <div className="flex items-center gap-2 font-mono text-xs text-[#00a7e1]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] absolute inline-flex h-full w-full rounded-full bg-[#00a7e1] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00a7e1]"></span>
              </span>
              <span className="font-bold tracking-wider animate-[pulse_3s_ease-in-out_infinite]">
                PRODUCTION READY
              </span>
            </div>
          </div>

          {/* Title Shift Container: Shifts upward to top of card on hover */}
          <div
            className={`transition-all duration-500 ease-out transform ${
              isHovered ? "-translate-y-3" : "translate-y-2"
            }`}
          >
            <h2 className="font-syne font-extrabold text-3xl sm:text-4xl text-white tracking-tight mb-1 group-hover:text-white transition-colors">
              {product.title}
            </h2>
            <p className="font-mono text-xs sm:text-sm text-zinc-300 font-semibold uppercase tracking-wider mb-4">
              {product.tagline}
            </p>
            <p className="font-mono text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-xl">
              {product.desc}
            </p>
          </div>

          {/* Dynamic Specifications Area - Word-by-Word Live Typewriter Animation on Hover */}
          <div className="my-6 min-h-[150px] p-5 rounded-2xl bg-black border border-white/15 relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 font-mono text-xs">
              <div className="flex items-center gap-2 text-zinc-400">
                <Terminal className="w-3.5 h-3.5 text-white" />
                <span className="font-bold text-white uppercase tracking-wider">
                  {isHovered ? "LIVE WORD-BY-WORD WRITING..." : "HOVER CARD TO REVEAL SPECIFICATIONS"}
                </span>
              </div>
              <span className="text-[10px] text-[#00a7e1] font-mono font-semibold">
                {isHovered ? "TERMINAL ACTIVE" : "SPEC MODE"}
              </span>
            </div>

            {isHovered ? (
              <div className="space-y-2.5 font-mono text-xs">
                {renderTypedLines()}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-20 text-center text-zinc-500 font-mono text-xs gap-2">
                <div className="w-6 h-6 rounded-full border border-dashed border-zinc-600 flex items-center justify-center animate-spin">
                  <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full" />
                </div>
                <span>Hover over this card to watch specifications type word-by-word</span>
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-4">
            <a
              href="#demo"
              className="px-6 py-3 rounded-xl font-mono text-xs font-bold tracking-wider uppercase bg-white text-black hover:bg-zinc-200 transition-all duration-300 flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
            >
              <span>Request Demo</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Visual Graphics Panel Side (Distinct Visuals, Text & Shapes for each card) */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full max-w-sm rounded-2xl bg-black border border-white/20 p-6 backdrop-blur-xl flex flex-col justify-between gap-6 relative overflow-hidden group-hover:scale-105 transition-transform duration-500 shadow-2xl">
            {/* Visual Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/15">
              <div className="w-12 h-12 rounded-xl bg-white text-black flex items-center justify-center font-bold shadow-md">
                <IconComp className="w-6 h-6" />
              </div>
              <div className="text-right">
                <span className="block font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
                  HARDWARE ARCHITECTURE
                </span>
                <span className="block font-mono text-xs font-bold text-white">
                  NODE-{index + 1}04
                </span>
              </div>
            </div>

            {/* Custom Shapes & Visual Graphics depending on product visualType */}
            <div className="py-4 flex flex-col items-center justify-center relative min-h-[160px]">
              {product.visualType === "dashboard" && (
                <div className="w-full space-y-3 font-mono">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-400">COMMAND MATRIX</span>
                    <span className="text-white font-bold">99.8% READY</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-3 bg-zinc-900 border border-white/10 rounded-lg text-center">
                      <div className="text-white font-bold text-sm">24/7</div>
                      <div className="text-[9px] text-zinc-500">MONITORING</div>
                    </div>
                    <div className="p-3 bg-zinc-900 border border-white/10 rounded-lg text-center">
                      <div className="text-white font-bold text-sm">12ms</div>
                      <div className="text-[9px] text-zinc-500">POLL SPEED</div>
                    </div>
                    <div className="p-3 bg-zinc-900 border border-white/10 rounded-lg text-center">
                      <div className="text-white font-bold text-sm">4 PLANTS</div>
                      <div className="text-[9px] text-zinc-500">SYNCED</div>
                    </div>
                  </div>
                  <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden border border-white/10">
                    <div className="bg-white h-full w-[85%] animate-pulse" />
                  </div>
                </div>
              )}

              {product.visualType === "hardware" && (
                <div className="w-full space-y-3 font-mono">
                  <div className="p-4 bg-zinc-900 border border-white/15 rounded-xl space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-400">BUS: MODBUS/RS485</span>
                      <span className="text-white font-bold">SERIAL ACTIVE</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="h-1.5 flex-1 bg-white rounded animate-pulse" />
                      <div className="h-1.5 flex-1 bg-zinc-700 rounded" />
                      <div className="h-1.5 flex-1 bg-white rounded animate-pulse" />
                      <div className="h-1.5 flex-1 bg-white rounded" />
                    </div>
                    <div className="flex justify-between text-[10px] text-zinc-500">
                      <span>TX: 4.8MB/s</span>
                      <span>RX: 4.8MB/s</span>
                    </div>
                  </div>
                </div>
              )}

              {product.visualType === "ai" && (
                <div className="w-full space-y-3 font-mono">
                  <div className="p-4 bg-zinc-900 border border-white/15 rounded-xl space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-zinc-400">BEARING WEAR AI</span>
                      <span className="text-white font-bold">PREDICTIVE OK</span>
                    </div>
                    <div className="flex items-end gap-1.5 h-10 pt-2">
                      <div className="w-1/6 bg-white h-[40%] rounded-t" />
                      <div className="w-1/6 bg-white h-[75%] rounded-t animate-pulse" />
                      <div className="w-1/6 bg-zinc-600 h-[30%] rounded-t" />
                      <div className="w-1/6 bg-white h-[90%] rounded-t" />
                      <div className="w-1/6 bg-zinc-600 h-[50%] rounded-t" />
                      <div className="w-1/6 bg-white h-[65%] rounded-t" />
                    </div>
                  </div>
                </div>
              )}

              {product.visualType === "safety" && (
                <div className="w-full space-y-3 font-mono">
                  <div className="p-4 bg-zinc-900 border border-white/15 rounded-xl space-y-2 text-center">
                    <div className="flex items-center justify-center gap-2 text-xs font-bold text-white">
                      <ShieldAlert className="w-4 h-4 text-white" />
                      <span>INTERLOCK SYSTEM ENGAGED</span>
                    </div>
                    <div className="text-[10px] text-zinc-400">
                      DEFECT ESCAPE RATE: 0.00%
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Key Metric */}
            <div className="pt-3 border-t border-white/15 flex items-center justify-between">
              <div>
                <div className="font-syne font-extrabold text-3xl text-white">
                  {product.metrics.value}
                </div>
                <div className="font-mono text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                  {product.metrics.label}
                </div>
              </div>
              <div className="px-3 py-1 rounded bg-zinc-900 border border-white/10 font-mono text-[10px] text-white">
                VERIFIED
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
