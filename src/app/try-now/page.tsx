"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ArrowRight,
  ExternalLink,
  Code2,
  Activity,
  Zap,
  ArrowLeft
} from "lucide-react";

// =========================================================================
// 🎯 PLACEHOLDER FOR REDIRECTION TARGET
// Replace the empty string below with your destination link:
// Examples:
//   - External app: "https://app.xtrail.in/signup"
//   - Staging portal: "https://staging.xtrail.in"
//   - Internal route: "/dashboard" or "/#contact"
// =========================================================================
const TARGET_REDIRECT_URL: string = ""; // <-- PASTE YOUR DESTINATION REDIRECTION URL HERE

// Set to 0 for instant redirection, or delay in milliseconds (e.g., 1500ms)
const AUTO_REDIRECT_DELAY_MS: number = 1500;
// =========================================================================

function TryNowContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const productParam = searchParams.get("product") || "command-tower";
  
  const [countdown, setCountdown] = useState<number>(Math.ceil(AUTO_REDIRECT_DELAY_MS / 1000));
  const [isRedirecting, setIsRedirecting] = useState<boolean>(Boolean(TARGET_REDIRECT_URL));

  const productTitles: Record<string, { title: string; tag: string; icon: string }> = {
    "command-tower": {
      title: "Xtrail Command Tower™ Sandbox",
      tag: "FLAGSHIP OEE ENGINE",
      icon: "dashboard",
    },
    "edge-gateway": {
      title: "Xtrail Edge IoT Node™ Gateway",
      tag: "HARDWARE & PROTOCOLS",
      icon: "hardware",
    },
    "vision-ai": {
      title: "Xtrail Vision AI™ Predictive Engine",
      tag: "THERMAL & VIBRATION AI",
      icon: "ai",
    },
    "poka-yoke": {
      title: "Xtrail Poka-Yoke Sense™ Automation",
      tag: "QUALITY GATE & INTERLOCKS",
      icon: "safety",
    },
  };

  const currentProduct = productTitles[productParam] || {
    title: "Xtrail AI Industrial Suite",
    tag: "ENTERPRISE PLATFORM",
    icon: "dashboard",
  };

  useEffect(() => {
    // If a redirect URL is configured, trigger automatic redirection
    if (TARGET_REDIRECT_URL && TARGET_REDIRECT_URL.trim().length > 0) {
      setIsRedirecting(true);
      const timer = setTimeout(() => {
        if (TARGET_REDIRECT_URL.startsWith("http://") || TARGET_REDIRECT_URL.startsWith("https://")) {
          window.location.href = TARGET_REDIRECT_URL;
        } else {
          router.push(TARGET_REDIRECT_URL);
        }
      }, AUTO_REDIRECT_DELAY_MS);

      const interval = setInterval(() => {
        setCountdown((prev) => (prev > 1 ? prev - 1 : 1));
      }, 1000);

      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-[#000000] text-white flex flex-col justify-between selection:bg-white selection:text-black">
      <Navbar />

      <div className="pt-28 pb-20 sm:pt-36 sm:pb-28 relative overflow-hidden bg-[#000000] flex-1 flex items-center">
        {/* Monochromatic Grid Pattern & Glows */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[#00a7e1]/10 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-white/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Back Navigation */}
          <div className="mb-8">
            <a
              href="/products"
              className="inline-flex items-center gap-2 font-mono text-xs text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Products</span>
            </a>
          </div>

          {/* If Redirection is Active */}
          {isRedirecting && TARGET_REDIRECT_URL ? (
            <div className="rounded-3xl bg-zinc-950 border border-white/20 p-8 sm:p-14 text-center shadow-2xl relative overflow-hidden max-w-2xl mx-auto">
              <div className="w-16 h-16 rounded-full bg-[#00a7e1]/10 border border-[#00a7e1]/30 text-[#00a7e1] flex items-center justify-center mx-auto mb-6 animate-pulse">
                <ExternalLink className="w-8 h-8" />
              </div>
              <h1 className="font-syne font-extrabold text-3xl sm:text-4xl text-white mb-3">
                Redirecting to Live Application
              </h1>
              <p className="font-mono text-xs sm:text-sm text-zinc-400 mb-6">
                Launching {currentProduct.title} in {countdown} second{countdown > 1 ? "s" : ""}...
              </p>
              <div className="flex justify-center">
                <a
                  href={TARGET_REDIRECT_URL}
                  className="px-8 py-3.5 rounded-xl font-mono text-xs font-bold tracking-widest uppercase bg-[#00a7e1] text-black hover:bg-white transition-all duration-300 flex items-center gap-2 shadow-[0_0_25px_rgba(0,167,225,0.4)]"
                >
                  <span>Click Here if Not Redirected</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ) : (
            /* Placeholder Screen when TARGET_REDIRECT_URL is pending user's link */
            <div className="space-y-8">
              {/* Header Box */}
              <div className="text-center max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/20 mb-6 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-[#00a7e1] animate-pulse" />
                  <span className="font-mono text-[11px] font-semibold text-white tracking-[0.25em] uppercase">
                    {currentProduct.tag}
                  </span>
                </div>

                <h1 className="font-syne font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight mb-4 leading-tight">
                  Try {currentProduct.title}
                </h1>
                <p className="font-mono text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
                  Experience live industrial telemetry, automated defect detection, and AI predictive maintenance in your sandbox environment.
                </p>
              </div>

              {/* Developer Placeholder Instructions Card */}
              <div className="rounded-2xl bg-zinc-950/80 border border-[#00a7e1]/40 p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
                  <div className="w-8 h-8 rounded-lg bg-[#00a7e1]/20 border border-[#00a7e1]/40 flex items-center justify-center text-[#00a7e1]">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                      Redirection Configuration Placeholder
                    </h3>
                    <p className="font-mono text-[11px] text-zinc-400">
                      File: <span className="text-[#00a7e1]">src/app/try-now/page.tsx</span> (Line 24)
                    </p>
                  </div>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <p className="text-zinc-300">
                    To connect your custom portal, signup page, or external cloud application, update the variable in this file:
                  </p>

                  {/* Code snippet display */}
                  <div className="rounded-xl bg-black border border-white/15 p-4 overflow-x-auto text-[12px]">
                    <div className="text-zinc-500">// 1. Open src/app/try-now/page.tsx</div>
                    <div className="text-zinc-500">// 2. Paste your destination URL:</div>
                    <div className="mt-1">
                      <span className="text-pink-400">const</span>{" "}
                      <span className="text-blue-300">TARGET_REDIRECT_URL</span>:{" "}
                      <span className="text-green-300">string</span> ={" "}
                      <span className="text-emerald-400">
                        &quot;https://your-custom-app-or-dashboard.com&quot;
                      </span>
                      ;
                    </div>
                  </div>

                  <p className="text-zinc-400 text-[11px] pt-1">
                    ✦ When configured, clicking <span className="text-white font-semibold">&quot;Try Now&quot;</span> on any product card will seamlessly forward your visitors to that destination.
                  </p>
                </div>
              </div>

              {/* Action Buttons & Fallbacks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 max-w-2xl mx-auto">
                <a
                  href="/#services"
                  className="p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-center transition-all duration-300 group block"
                >
                  <Activity className="w-6 h-6 text-[#00a7e1] mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <div className="font-syne font-bold text-sm text-white mb-1">
                    Explore Platform Services
                  </div>
                  <div className="font-mono text-[11px] text-zinc-400">
                    Review sensorization & control tower capabilities
                  </div>
                </a>

                <a
                  href="/#contact"
                  className="p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-center transition-all duration-300 group block"
                >
                  <Zap className="w-6 h-6 text-[#00d2b8] mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <div className="font-syne font-bold text-sm text-white mb-1">
                    Request On-Site Audit
                  </div>
                  <div className="font-mono text-[11px] text-zinc-400">
                    Book a 7-day plant pilot with live test nodes
                  </div>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function TryNowPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black text-white flex items-center justify-center font-mono text-xs">Loading Try Now Gateway...</div>}>
      <TryNowContent />
    </Suspense>
  );
}
