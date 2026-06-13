import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#080a0d",
        panel: "#101419",
        line: "rgba(255,255,255,0.1)",
        mint: "#25d59b",
        violet: "#8b5cf6",
        gold: "#f4c867"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 40px rgba(37, 213, 155, 0.18)"
      }
    }
  },
  plugins: []
} satisfies Config;

