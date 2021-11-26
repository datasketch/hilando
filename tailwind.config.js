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
      backgroundImage: {
        'banner-home-sm': 'url(/images/home/banner-home.png)',
        'banner-home-lg': 'url(/images/home/banner-home@2x.png)',
      },
      colors: {
        black: '#1A1A1A',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
