import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cyan: {
          DEFAULT: "#2EE6E0",
          deep: "#0BB8C4",
          mist: "#A8F4F0",
        },
        royal: {
          DEFAULT: "#0B2A6B",
          mid: "#123A8C",
          night: "#061433",
        },
        gold: {
          DEFAULT: "#D4AF37",
          bright: "#F4D06F",
          temple: "#C9A227",
          brass: "#B8860B",
        },
        kumkum: "#B11226",
        ivory: "#F7F1E3",
        cream: "#EFE6D2",
        ink: "#070B14",
      },
      fontFamily: {
        tamil: ["var(--font-tamil)", "Noto Sans Tamil", "sans-serif"],
        tamilSerif: ["var(--font-tamil-serif)", "Noto Serif Tamil", "serif"],
        display: ["var(--font-cinzel)", "Cinzel", "serif"],
        classical: ["var(--font-playfair)", "Playfair Display", "serif"],
        body: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      boxShadow: {
        gold: "0 0 40px rgba(212, 175, 55, 0.28)",
        glass: "0 20px 60px rgba(6, 20, 51, 0.45)",
      },
      backgroundImage: {
        "temple-radial":
          "radial-gradient(ellipse at center, rgba(18,58,140,0.55) 0%, rgba(6,20,51,0.92) 55%, #070B14 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
