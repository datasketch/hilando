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
        'banner-territorios': 'url(/images/territorios/banner-territorios.svg)',
        'banner-noticias': 'url(/images/noticias/banner-noticias.svg)',
        'banner-eventos': 'url(/images/eventos/banner-eventos.svg)'
      },
      colors: {
        black: '#1A1A1A',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/aspect-ratio")
  ]
};
