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
          primary: "#1e3a5f",
          light: "#2a5a8f",
          dark: "#152a45",
          accent: "#3b82f6",
          gold: "#c9a227",
          "gold-light": "#d4b44a",
          "blue-secondary": "#4a90d9",
        },
      },
      fontFamily: {
        arabic: ["var(--font-ibm-plex-arabic)", "IBM Plex Sans Arabic", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
