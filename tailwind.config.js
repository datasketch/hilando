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
        'event',
        'event__item',
        'event__container-left',
        'event__municipio-departamento',
        'event__titulo',
        'event__nombre',
        'event__image-titulo',
        'event__container-right',
        'event__image',
        'slider-prev',
        'slider-next',
        'swiper-button-disabled',
        'single-navigation__item--active',
        'sub-menu-2--active',
        'modal',
        'modal--active',
        'modal__overlay',
        'modal__overlay--active',
        'modal__button-close',
        'opacity-60',
        'swiper-pagination-bullet',
        'swiper-pagination-bullet-active',
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
        'banner-multimedia': 'url(/images/galeria/multimedia/banner-multimedia.svg)',
      },
      colors: {
        'black': '#1A1A1A',
        'purple': '#5F2161',
        'cultured': '#fafafa',
        'space-cadet': '#3A3C6A',
        'rose': '#C5296A',
        'fern-green': '#4F7435',
        'magenta': '#963B62',
        'white-2': '#F0F0F2',
      },
      screens: {
        'sm': '640px',
        // => @media (min-width: 640px) { ... }

        'md': '768px',
        // => @media (min-width: 768px) { ... }

        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }

        'xl': '1366px',
        // => @media (min-width: 1366px) { ... }

        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
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
