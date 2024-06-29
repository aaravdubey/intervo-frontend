/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {colors: {
      "primary-blue": "#0154a5",
      "light-blue": "#e6f0fa",
      "dark-blue": "#041925",
      "teal-blue": "#113f67",
    },},
  },
  plugins: [],
}