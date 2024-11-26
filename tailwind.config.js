/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        base:"#FFC0CB",
        primary:"#FFA500",
        sunrise:"#FFFF00"
      },
      fontFamily:{
        pacifico: ["Pacifico", "cursive"],
        open:["Open Sans", "serif"]
      }
    },
  },
  plugins: [],
}

