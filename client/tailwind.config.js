module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: "#0b0f13",
        surface: "#0f1720",
        accent: "#7c5cff",
        muted: "#9aa4b2",
      },
    },
  },
  plugins: [],
};
