/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        rubik: ["Rubik-regular", "sans-serif"],
        "Rubik-bold": ["Rubik-Bold", "sans-serif"],
        "Rubik-extrabold": ["Rubik-ExtraBold", "sans-serif"],
        "Rubik-semibold": ["Rubik-SemiBold", "sans-serif"],
        "Rubik-light": ["Rubik-Light", "sans-serif"],
        "Rubik-medium": ["Rubik-Medium", "sans-serif"],
      },
      colors: {
        //colors
      },
    },
  },
  plugins: [],
};
