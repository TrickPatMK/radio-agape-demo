import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        zilla: ['"Zilla Slab"', "Georgia", "serif"],
        cockpit: ['"Zilla Slab"', '"DM Sans"', "system-ui", "-apple-system", "sans-serif"],
      },
      colors: {
        paper: {
          DEFAULT: "#ebe5e3",
          surface: "#ddd5d1",
          strong: "#cfc5c0",
          ink: "#241f1c",
          muted: "#564d49",
          accent: "#085830",
        },
        agape: {
          50: "#f0f7ff",
          100: "#e0effe",
          200: "#bae0fd",
          300: "#7cc7fb",
          400: "#36abf7",
          500: "#0c8fe9",
          600: "#0171c7",
          700: "#025ba2",
          800: "#064d85",
          900: "#0b416f",
          950: "#072a4a",
        },
      },
    },
  },
  plugins: [],
};
export default config;
