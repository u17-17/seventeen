/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      boxShadow: {
        soft: "0 24px 80px rgba(15, 15, 15, 0.08)",
        card: "0 18px 50px rgba(15, 15, 15, 0.06)",
      },
      backgroundImage: {
        "dot-grid":
          "radial-gradient(circle at 1px 1px, rgba(15,15,15,0.12) 1px, transparent 0)",
        "fine-lines":
          "linear-gradient(rgba(15,15,15,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(15,15,15,0.06) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
