/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Poppins", "DM Sans", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          blue: "#2563EB",
          cyan: "#06B6D4",
          purple: "#7C3AED",
          teal: "#14B8A6",
          orange: "#FB923C",
        },
      },
      boxShadow: {
        glass: "0 10px 30px rgba(0,0,0,0.08)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
