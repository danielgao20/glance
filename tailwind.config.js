/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        custom: ['"Bricolage Grotesque"', "sans-serif"],
        inter: ["Inter", "sans-serif"], // Add this line for Inter font
      },
    },
  },
  plugins: [],
};
