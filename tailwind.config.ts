import type { Config } from "tailwindcss";

// Design tokens — see README.md "Design System" section for rationale.
const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: "#0A0A0A", // primary background — near-black, not pure #000
        porcelain: "#F7F6F2", // primary light surface / reversed text
        graphite: "#1C1C1C", // secondary dark surface (cards on obsidian)
        mist: "#E7E4DD", // hairline borders on light surfaces
        gold: {
          DEFAULT: "#C9A24B", // muted architectural gold — the one accent
          light: "#E3C77A",
          dark: "#9C7B33",
        },
        ink: "#0A0A0A",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(3.5rem, 8vw, 8rem)", { lineHeight: "0.95", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.5rem, 5vw, 5rem)", { lineHeight: "1.0", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.75rem, 3vw, 3rem)", { lineHeight: "1.05", letterSpacing: "-0.01em" }],
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "8px",
        lg: "16px",
        xl: "24px",
      },
      backdropBlur: {
        xs: "2px",
      },
      transitionTimingFunction: {
        signature: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      spacing: {
        section: "clamp(5rem, 12vw, 10rem)",
      },
    },
  },
  plugins: [],
};

export default config;
