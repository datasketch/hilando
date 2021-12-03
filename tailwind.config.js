module.exports = {
  purge: {
    enabled: process.env.HUGO_ENVIRONMENT === "production",
    content: ["./layouts/**/*.html"],
    options: {
      safelist: [
        'header--active',
        'nav--active',
        'menu-icon--active',
        'overlay--active',
        'btn-up--active',
        'pagination__button',
        'event__item',
        'event__place',
        'event__title',
        'event__month',
        'event__type'
      ]
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
        'banner-eventos': 'url(/images/eventos/banner-eventos.svg)',
        'banner-programa': 'url(/images/sobre-programa/banner-sobre-el-programa.svg)'
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
