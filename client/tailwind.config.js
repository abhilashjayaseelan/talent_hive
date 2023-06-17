/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
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
  },
});
