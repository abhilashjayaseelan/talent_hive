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
        footerBg: "#1d1934",
        limeGreen: '#0AD20A',
      },
    },
    plugins: [require("tailwind-scrollbar"), require("@tailwindcss/forms")],
  },
});
