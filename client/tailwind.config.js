/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{html,js,ts,jsx,tsx}"];
export const theme = {
  extend: {
    fontFamily: {
      sans: ["Open Sans", "Roboto", "Arial", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    colors: {
       foundItBg:'#f7f2fa'
    }
  },
};
export const plugins = [];
