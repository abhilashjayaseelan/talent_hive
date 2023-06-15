/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{html,js,ts,jsx,tsx}"];
export const theme = {
  extend: {
    fontFamily: {
      sans: ["Open Sans", "Roboto", "Arial", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    colors: {
      foundItBg: "#f7f2fa",
      scrollbarTrack: "var(--scrollbar-track-color)",
      scrollbarThumb: "var(--scrollbar-thumb-color)",
      scrollbarThumbHover: "var(--scrollbar-thumb-color-hover)",
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
export const plugins = [];
