import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        xtrail: {
          dark: "#050505",
          cardDark: "#0c0e12",
          borderDark: "rgba(255, 255, 255, 0.08)",
          accentCyan: "#00a7e1",
          accentTeal: "#00d2b8",
          navy: "#1e3a5f",
          deepNavy: "#1a2f3a",
          lightBg: "#E0EFF4",
          lightCard: "#ffffff",
        },
      },
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "sans-serif"],
        syne: ["var(--font-syne)", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
        sora: ["var(--font-sora)", "sans-serif"],
      },
      animation: {
        ticker: "ticker 35s linear infinite",
        pulseGlow: "pulseGlow 3s ease-in-out infinite",
        scanline: "scanline 8s linear infinite",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(1000%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
