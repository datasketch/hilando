import Swiper, {Navigation, Autoplay, Pagination} from 'swiper';
import Modal from './utils/modal';

const events = document.querySelector('.events');
const dataEl = document.querySelector('#data-eventos');
dataEl.remove();

// init Swiper: banners

// eslint-disable-next-line no-unused-vars
const swiperBanner = new Swiper('.swiper-banner', {
  // configure Swiper to use modules
  modules: [Navigation, Pagination, Autoplay],

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
    disabledClass: 'opacity-40',
  },

  // Pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  // Autoplay
  autoplay: {
    delay: 5000,
  },
});

// init Swiper: events

// eslint-disable-next-line no-unused-vars
const swiper = new Swiper('.swiper', {
  // configure Swiper to use modules
  modules: [Navigation, Autoplay],

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
    disabledClass: 'opacity-40',
  },

  // Autoplay
  autoplay: {
    delay: 5000,
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

events.addEventListener('click', function(e) {
  // get id
  const id = e.target.closest('button')?.dataset.id;

  // closure protection
  if (!id) return;

  // filter by id
  const data = JSON.parse(dataEl.value).filter((item) => item.id === +id);

  // call modal class
  // eslint-disable-next-line no-unused-vars
  const modal = new Modal(data[0]);
});
