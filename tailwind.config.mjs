/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primarySubmit: "#26890d",
        primaryNext: "#007cd0",
      },
    },
  },
  plugins: [],
};

