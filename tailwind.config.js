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
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-down": {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.55s cubic-bezier(0.22,1,0.36,1) both",
        "fade-up-slow": "fade-up 0.8s cubic-bezier(0.22,1,0.36,1) both",
        "fade-in": "fade-in 0.4s ease-out both",
        "slide-down": "slide-down 0.25s cubic-bezier(0.22,1,0.36,1) both",
        "slide-up": "slide-up 0.3s cubic-bezier(0.22,1,0.36,1) both",
        "scale-in": "scale-in 0.3s cubic-bezier(0.22,1,0.36,1) both",
        shimmer: "shimmer 2.5s linear infinite",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.22,1,0.36,1)",
      },
      backgroundImage: {
        "grid-pattern":
          "radial-gradient(circle, rgba(2,33,105,0.07) 1px, transparent 1px)",
        "hero-gradient":
          "radial-gradient(ellipse 80% 60% at 70% -10%, rgba(0,131,254,0.08) 0%, transparent 60%)",
      },
      backgroundSize: {
        "grid-sm": "28px 28px",
        "grid-md": "40px 40px",
      },
    },
  },
  plugins: [],
};
