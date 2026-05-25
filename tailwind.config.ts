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
        brand: {
          navy: "#0A2647",
          teal: "#0E918C",
          "sky-blue": "#48A9E6",
          gold: "#D4A853",
          coral: "#E8735A",
          charcoal: "#1A1A2E",
          // Backward-compatible aliases
          primary: "#0A2647",
          light: "#48A9E6",
          dark: "#0A2647",
          accent: "#0E918C",
          "gold-light": "#B8860B",
          "blue-secondary": "#48A9E6",
        },
      },
      fontFamily: {
        arabic: ["var(--font-ibm-plex-arabic)", "IBM Plex Sans Arabic", "sans-serif"],
        inter: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      borderRadius: {
        card: "12px",
        btn: "8px",
        input: "6px",
      },
      boxShadow: {
        card: "0 4px 6px rgba(10, 38, 71, 0.1)",
        "card-hover": "0 12px 24px rgba(10, 38, 71, 0.15)",
      },
      spacing: {
        section: "80px",
      },
    },
  },
  plugins: [],
};
export default config;
