module.exports = {
  purge: {
    enabled: process.env.HUGO_ENVIRONMENT === 'production',
    content: ['./layouts/**/*.html'],
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
        'event__type',
        'slider-prev',
        'slider-next',
        'swiper-button-disabled',
        'single-navigation__item--active',
        'sub-menu-2--active',
      ],
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontSize: {
        xxxs: '0.5rem',
        xxs: '0.625rem',
      },
      backgroundImage: {
        'banner-home': 'url(/images/home/banner-home.png)',
        'banner-territorios': 'url(/images/territorios/banner-territorios.svg)',
        'banner-noticias': 'url(/images/noticias/banner-noticias.svg)',
        'banner-eventos': 'url(/images/eventos/banner-eventos.svg)',
        'banner-programa': 'url(/images/sobre-programa/banner-sobre-el-programa.svg)',
        'newsletter': 'url(/images/home/newsletter.png)',
      },
      colors: {
        'black': '#1A1A1A',
        'purple': '#5F2161',
        'cultured': '#fafafa',
        'space-cadet': '#3A3C6A',
        'rose': '#C5296A',
        'fern-green': '#4F7435',
        'magenta': '#963B62',
      },
    },
  },
  variants: {
    extend: {
      borderWidth: ['last'],
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
};
