/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00C853",
        bg: "#F7F7F7",
        text: "#222222",
      },
    },
  },
  plugins: [],
};
