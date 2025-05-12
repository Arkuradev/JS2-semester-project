/** @type {import('tailwindcss').Config} */
export default {
  content: ["./**/*.html", "./js/**/*.mjs", "!./node_modules/**/*"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        nav: "rgb(var(--nav) / <alpha-value>)",
        background: "rgb(var(--background) / <alpha-value>)",
        main: "rgb(var(--main) / <alpha-value>)",
        hover: "rgb(var(--hover) / <alpha-value>)",
        primary: "rgb(var(--primary) / <alpha-value>)",
        secondary: "rgb(var(--secondary) / <alpha-value>)",
        tertiary: "rgb(var(--tertiary) / <alpha-value>)",
        "btn-primary": "rgb(var(--btn-primary) / <alpha-value>)",
        "btn-secondary": "rgb(var(--btn-secondary) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        text: "rgb(var(--text) / <alpha-value>)",
        "text-input": "rgb(var(--text-input) / <alpha-value>)",
        "text-muted": "rgb(var(--text-muted) / <alpha-value>)",
        funds: "rgb(var(--funds) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
