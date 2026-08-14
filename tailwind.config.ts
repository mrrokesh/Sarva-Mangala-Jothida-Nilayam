import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cyan: {
          DEFAULT: "#C45C26",
          deep: "#A44A1C",
          mist: "#F3D4B8",
        },
        royal: {
          DEFAULT: "#7A3550",
          mid: "#9A4A66",
          night: "#F4EBE0",
        },
        gold: {
          DEFAULT: "#B8892A",
          bright: "#8B4A16",
          temple: "#A67C28",
          brass: "#8A6420",
        },
        kumkum: "#C43C4E",
        ivory: "#3D2A1C",
        cream: "#FFF8EE",
        ink: "#FFFCF8",
      },
      fontFamily: {
        tamil: ["var(--font-tamil)", "Noto Sans Tamil", "sans-serif"],
        tamilSerif: ["var(--font-tamil-serif)", "Noto Serif Tamil", "serif"],
        display: ["var(--font-cinzel)", "Cinzel", "serif"],
        classical: ["var(--font-playfair)", "Playfair Display", "serif"],
        body: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      boxShadow: {
        gold: "0 0 36px rgba(184, 137, 42, 0.22)",
        glass: "0 18px 50px rgba(61, 42, 28, 0.12)",
      },
      backgroundImage: {
        "temple-radial":
          "radial-gradient(ellipse at center, rgba(244,235,224,0.9) 0%, #FFFCF8 70%)",
      },
    },
  },
  plugins: [],
};

export default config;
