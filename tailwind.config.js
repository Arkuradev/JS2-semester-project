/** @type {import('tailwindcss').Config} */
export default {
  content: ["./**/*.{html,js}", "!./node_modules/**/*"],
  safelist: [
    "text-green-500",
    "text-red-500",
    "text-yellow-500",
    "bg-green-500",
    "bg-red-500",
    "bg-yellow-500",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
