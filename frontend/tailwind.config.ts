import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base surfaces
        bg: {
          DEFAULT: "#0B0F14", // deep slate — app background
          surface: "#131A22", // card / panel surface
          elevated: "#1A2430", // raised surface (modals, popovers)
        },
        border: {
          DEFAULT: "#253141",
          subtle: "#1B2531",
        },
        text: {
          primary: "#F1F5F4",
          secondary: "#94A3AF",
          muted: "#5B6B78",
        },
        // Brand accent system — three roles, not one generic neon
        mint: {
          // vitality / health — primary actions
          400: "#6EE7C4",
          500: "#43D9A3",
          600: "#2FB588",
        },
        coral: {
          // nutrition / energy — secondary emphasis
          400: "#FFA47C",
          500: "#FF8A5B",
          600: "#E56F41",
        },
        violet: {
          // the "Mind" / AI layer — assistant-driven UI
          400: "#A79BFA",
          500: "#8B7CF6",
          600: "#7059E8",
        },
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "monospace"],
      },
      boxShadow: {
        "glow-mint": "0 0 0 1px rgba(67,217,163,0.3), 0 0 24px rgba(67,217,163,0.18)",
        "glow-violet": "0 0 0 1px rgba(139,124,246,0.35), 0 0 24px rgba(139,124,246,0.20)",
        "card": "0 1px 2px rgba(0,0,0,0.4), 0 0 0 1px rgba(37,49,65,0.6)",
      },
      borderRadius: {
        lg: "0.75rem",
        xl: "1rem",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
      },
      animation: {
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;