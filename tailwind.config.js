/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#25D162",
        "dark-bg": "#2B2B2B",
        "darker-bg": "#1D1D1D",
        "light-bg": "#F9FAFB",
        "light-gray": "#F3F4F6",
        "custom-green": "#25d162",
        "custom-dark": "#2b2b2b",
        "custom-black": "#1d1d1d",
        "custom-white": "#ffffff",
      },
    },
  },
  plugins: [],
};
