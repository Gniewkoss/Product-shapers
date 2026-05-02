/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#000f3d",
          blue: "#032796",
          "light-blue": "#0083fe",
          "dark-blue": "#022169",
          green: "#7dfab6",
          "green-card": "#82ffba",
        },
      },
      fontFamily: {
        sans: ["Satoshi", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Erode", "Georgia", "ui-serif", "serif"],
      },
      maxWidth: { content: "1280px" },
    },
  },
  plugins: [],
};
