import Swiper, {Navigation, Autoplay} from 'swiper';

// init Swiper:

// eslint-disable-next-line no-unused-vars
const swiper = new Swiper('.swiper', {
  // configure Swiper to use modules
  modules: [Navigation, Autoplay],

  // Navigation arrows
  navigation: {
    nextEl: '.event-button-prev',
    prevEl: '.event-button-next',
    disabledClass: 'opacity-40',
  },

  // Autoplay
  autoplay: {
    delay: 1000,
  },

  // Default parameters
  slidesPerView: 1,
  spaceBetween: 10,

  // Responsive breakpoints
  breakpoints: {
    1366: {
      slidesPerView: 2,
      spaceBetween: 54.18,
    },
  },
});
