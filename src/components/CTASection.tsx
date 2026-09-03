"use client";

import React from "react";
import { ArrowRight, Calendar, ShieldCheck } from "lucide-react";

export default function CTASection() {
  return (
    <section id="contact" className="relative w-full py-24 bg-[#050505] text-white overflow-hidden border-b border-white/10">
      {/* Background glow */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-[#00a7e1]/20 to-[#00d2b8]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-[#0a0e17] via-[#0c121e] to-[#0a0e17] border border-white/15 p-8 sm:p-14 text-center shadow-2xl relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
            <ShieldCheck className="w-4 h-4 text-[#00a7e1]" />
            <span className="font-mono text-[11px] font-semibold text-[#00a7e1] tracking-[0.2em] uppercase">
              Ready to Upgrade Your Factory?
            </span>
          </div>

          <h2 className="font-syne font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white mb-6 tracking-tight">
            Schedule Your On-Site Plant Audit
          </h2>

          <p className="font-mono text-sm sm:text-base text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            Our engineering team will assess your legacy machinery, map out sensor placement, and deliver a zero-downtime ROI transformation proposal within 7 days.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <a
              href="mailto:contact@xtrail.in"
              className="px-8 py-4 rounded-xl font-mono text-xs font-bold tracking-widest uppercase bg-[#00a7e1] text-black hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(0,167,225,0.4)] hover:scale-105 flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Plant Assessment</span>
            </a>
            <a
              href="/products"
              className="px-8 py-4 rounded-xl font-mono text-xs font-bold tracking-widest uppercase bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all duration-300 flex items-center gap-2"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4 text-[#00a7e1]" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
