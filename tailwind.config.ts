import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0a0a0f",
        surface: "#111118",
        border: "#1e1e2e",
        accent: "#f97316",
        "accent-2": "#fb923c",
        "text-primary": "#e8e8f0",
        muted: "#6b6b80",
        odia: "#22c55e",
      },
      fontFamily: {
        syne: ["var(--font-syne)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        bebas: ["var(--font-bebas)", "sans-serif"],
      },
      animation: {
        ticker: "ticker 20s linear infinite",
        "client-scroll": "clientScroll 25s linear infinite",
        "profile-float": "profileFloat 6s ease-in-out infinite",
        "ring-spin": "profileRingSpin 8s linear infinite",
        "page-load": "pageLoad 1s ease-out forwards",
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "ambient-pulse": "ambientPulse 4s ease-in-out infinite",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        "border-glow": "borderGlow 3s ease-in-out infinite",
        "float": "float 2s ease-in-out infinite",
        "count-up": "countUp 0.5s ease forwards",
      },
      keyframes: {
        ticker: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        clientScroll: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        profileFloat: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        profileRingSpin: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        pageLoad: {
          from: { opacity: "0", filter: "blur(6px)" },
          to: { opacity: "1", filter: "blur(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
