"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Services", href: "/#services", isExternal: false, hasDropdown: true },
    { label: "Industry 4.0", href: "/#industry40", isExternal: false, hasDropdown: true },
    { label: "Digital Transformation", href: "/#transformation", isExternal: false, hasDropdown: true },
    { label: "Resources", href: "/#resources", isExternal: false, hasDropdown: true },
    { label: "Products", href: "/products", isExternal: false, isNew: true, hasDropdown: false },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#050505]/90 backdrop-blur-md border-b border-white/10 shadow-2xl py-3"
          : "bg-gradient-to-b from-[#050505]/95 via-[#050505]/80 to-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[56px] sm:h-[64px]">
          {/* Brand Logo */}
          <a href="/" className="flex items-center gap-2.5 group z-50">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 bg-white flex items-center justify-center rounded-lg border border-white/20 shadow-md group-hover:scale-105 transition-transform duration-300">
              {/* Xtrail Custom X Emblem */}
              <svg
                className="w-6 h-6 text-black"
                viewBox="0 0 280 280"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M 20 20 L 115 150 L 20 280 L 90 280 L 140 195 L 190 280 L 260 280 L 165 150 L 260 20 L 190 20 L 140 105 L 90 20 Z"
                  fill="black"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-syne font-extrabold text-xl tracking-wider text-white uppercase leading-none group-hover:text-[#00a7e1] transition-colors">
                XTRAIL
              </span>
              <span className="font-mono text-[9px] tracking-[0.25em] text-white/50 uppercase leading-tight">
                AI SOLUTIONS
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navItems.map((item) => (
              <div key={item.label} className="relative group">
                {item.isExternal ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 text-[14px] font-medium text-white/90 hover:text-white transition-colors flex items-center gap-1.5 rounded-md hover:bg-white/5 border border-transparent hover:border-[#00a7e1]/30 group-hover:shadow-[0_0_15px_rgba(0,167,225,0.2)]"
                  >
                    <span>{item.label}</span>
                    <span className="px-1.5 py-0.5 text-[9px] font-mono font-semibold bg-[#00a7e1] text-black rounded tracking-widest uppercase animate-pulse">
                      NEW
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#00a7e1] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                ) : (
                  <a
                    href={item.href}
                    className="px-3.5 py-2 text-[14px] font-medium text-white/80 hover:text-white transition-colors flex items-center gap-1 rounded-md hover:bg-white/5"
                  >
                    <span>{item.label}</span>
                    {item.hasDropdown && (
                      <ChevronDown className="w-3.5 h-3.5 text-white/50 group-hover:text-white group-hover:rotate-180 transition-transform duration-200" />
                    )}
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="#contact"
              className="px-5 py-2.5 text-[14px] font-mono font-semibold tracking-wider text-black bg-white hover:bg-[#00a7e1] hover:text-black rounded transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_25px_rgba(0,167,225,0.4)] hover:scale-105 uppercase"
            >
              Contact Us
            </a>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white/90 hover:text-white rounded-lg hover:bg-white/10 transition-colors z-50"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[64px] bg-[#050505]/98 backdrop-blur-xl border-t border-white/10 z-40 p-6 flex flex-col justify-between overflow-y-auto animate-fadeIn">
          <div className="space-y-4 pt-4">
            {navItems.map((item) => (
              <div key={item.label}>
                {item.isExternal ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-[#00a7e1]/10 border border-[#00a7e1]/30 text-white font-medium text-lg hover:bg-[#00a7e1]/20 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span>{item.label}</span>
                      <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-[#00a7e1] text-black rounded tracking-wider uppercase">
                        NEW
                      </span>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-[#00a7e1]" />
                  </a>
                ) : (
                  <a
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-3.5 rounded-xl text-white/80 hover:text-white hover:bg-white/5 font-medium text-lg transition-colors"
                  >
                    {item.label}
                  </a>
                )}
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-white/10 space-y-4">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full py-3 text-center font-mono font-bold tracking-wider text-black bg-white rounded-xl uppercase text-sm"
            >
              Contact Us
            </a>
            <p className="text-center text-xs font-mono text-white/40 tracking-widest uppercase">
              Xtrail AI • Transforming Digital Horizons
            </p>
          </div>
        </div>
      )}
    </nav>
  );
}
