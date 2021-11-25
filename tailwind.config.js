module.exports = {
  purge: {
    enabled: process.env.HUGO_ENVIRONMENT === "production",
    content: ["./layouts/**/*.html"],
    options: {
      safelist: []
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {},
      backgroundImage: {},
      colors: {},
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
