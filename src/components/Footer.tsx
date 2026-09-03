"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1a2f3a] text-white border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Col 1: Digital Transformation */}
          <div>
            <h3 className="text-white font-syne font-bold text-[15px] tracking-wider mb-6 relative inline-block">
              DIGITAL TRANSFORMATION
              <span className="absolute bottom-[-8px] left-0 w-8 h-[3px] bg-[#00a7e1]"></span>
            </h3>
            <ul className="space-y-3 font-mono text-[13px] text-gray-300">
              <li>
                <a href="#services" className="hover:text-[#00a7e1] transition-colors block">
                  Plant Audit & Assessment
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#00a7e1] transition-colors block">
                  Sensorization & Retrofit
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#00a7e1] transition-colors block">
                  Data Integration & Dashboards
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#00a7e1] transition-colors block">
                  Predictive Maintenance AI
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2: Solutions */}
          <div>
            <h3 className="text-white font-syne font-bold text-[15px] tracking-wider mb-6 relative inline-block">
              SOLUTIONS
              <span className="absolute bottom-[-8px] left-0 w-8 h-[3px] bg-[#00a7e1]"></span>
            </h3>
            <ul className="space-y-3 font-mono text-[13px] text-gray-300">
              <li>
                <a href="#services" className="hover:text-[#00a7e1] transition-colors block">
                  Digital Transformation Consulting
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#00a7e1] transition-colors block">
                  Legacy Retrofit Services
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#00a7e1] transition-colors block">
                  AI-Powered Monitoring
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#00a7e1] transition-colors block">
                  Process Automation
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Focus Sectors */}
          <div>
            <h3 className="text-white font-syne font-bold text-[15px] tracking-wider mb-6 relative inline-block">
              FOCUS SECTORS
              <span className="absolute bottom-[-8px] left-0 w-8 h-[3px] bg-[#00a7e1]"></span>
            </h3>
            <ul className="space-y-3 font-mono text-[13px] text-gray-300">
              <li>
                <a href="#" className="hover:text-[#00a7e1] transition-colors block">
                  Manufacturing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#00a7e1] transition-colors block">
                  Supply Chain
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#00a7e1] transition-colors block">
                  Logistics & Warehousing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#00a7e1] transition-colors block">
                  Industrial Equipment
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Company */}
          <div>
            <h3 className="text-white font-syne font-bold text-[15px] tracking-wider mb-6 relative inline-block">
              COMPANY
              <span className="absolute bottom-[-8px] left-0 w-8 h-[3px] bg-[#00a7e1]"></span>
            </h3>
            <ul className="space-y-3 font-mono text-[13px] text-gray-300">
              <li>
                <a href="#" className="hover:text-[#00a7e1] transition-colors block">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#00a7e1] transition-colors block">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#transformation" className="hover:text-[#00a7e1] transition-colors block">
                  Our Approach
                </a>
              </li>
              <li>
                <a href="/products" className="hover:text-[#00a7e1] transition-colors inline-flex items-center gap-1">
                  <span>Products Portal</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#00a7e1]" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Legal bar */}
      <div className="border-t border-gray-700/50 bg-[#14252e]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Brand emblem */}
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 bg-white text-black flex items-center justify-center rounded font-bold">
                <svg className="w-4 h-4" viewBox="0 0 280 280" fill="none">
                  <path
                    d="M 20 20 L 115 150 L 20 280 L 90 280 L 140 195 L 190 280 L 260 280 L 165 150 L 260 20 L 190 20 L 140 105 L 90 20 Z"
                    fill="black"
                  />
                </svg>
              </div>
              <span className="font-syne font-extrabold text-lg text-white tracking-wider">
                XTRAIL AI
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 font-mono text-xs text-gray-400">
              <a href="#" className="hover:text-[#00a7e1] transition-colors">
                Terms of Use
              </a>
              <span>|</span>
              <a href="#" className="hover:text-[#00a7e1] transition-colors">
                Terms and Conditions
              </a>
              <span>|</span>
              <a href="#" className="hover:text-[#00a7e1] transition-colors">
                Privacy Policy
              </a>
              <span>|</span>
              <a href="#" className="hover:text-[#00a7e1] transition-colors">
                Cookie Policy
              </a>
            </div>

            <div className="font-mono text-xs text-gray-400">
              © Xtrail 2026. All Rights Reserved
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
