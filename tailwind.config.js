/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#1e3a32",
          deep: "#14271f",
          soft: "#2a4d42",
          mist: "#e7ede9",
        },
        accent: {
          DEFAULT: "#c49752",
          soft: "#d8b884",
          deep: "#a37a3a",
        },
        cream: {
          DEFAULT: "#f5efe5",
          deep: "#ebe3d3",
        },
        ink: {
          DEFAULT: "#14100a",
          soft: "#4d4539",
        },
      },
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
        brand: "0 18px 44px rgba(30, 58, 50, 0.18)",
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
