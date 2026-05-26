export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0f172a",
        gold: "#d4af37",
        border: "#1e293b",
        background: "#ffffff",
        foreground: "#0f172a",
        muted: "#64748b"
      },

      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Playfair Display", "serif"]
      },

      backgroundImage: {
        "gradient-hero":
          "linear-gradient(to right, #0f172a, #1e293b)"
      },

      boxShadow: {
        elegant:
          "0 10px 30px rgba(0,0,0,0.12)"
      }
    }
  },
  plugins: []
};