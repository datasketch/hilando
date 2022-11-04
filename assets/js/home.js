/* eslint-disable no-unused-vars */
import Modal from './utils/modal';
import {swiperBanner, swiperNews, swiperEvents, swiperGalleryThumbs, swiperGalleryMain} from './lib/slider';
import Swiper, {Navigation, Pagination, Thumbs, Autoplay, FreeMode} from 'swiper';

const events = document.querySelector('.events');
const dataEl = document.querySelector('#data-eventos');
dataEl.remove();

// Slider banner home page
const sliderHomeBanner = swiperBanner('.swiper-banner');

// Slider news
const sliderNews = swiperNews('.swiper-news');

// Slider events
const sliderEvents = swiperEvents('.swiper-events');


events?.addEventListener('click', function(e) {
  // get id
  const id = e.target.closest('button')?.dataset.id;

  // closure protection
  if (!id) return;

  // filter by id
  const data = JSON.parse(dataEl.value).filter((item) => item.id === +id)[0];

  // call modal class
  const modal = new Modal(data, 'eventos');

  // call slider library

  const swiperThumbs = new Swiper('.swiperThumbs', {
    // configure Swiper to use modules
    modules: [Navigation, Autoplay, FreeMode],

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

    loop: true,

    // Default parameters
    slidesPerView: 3,
    spaceBetween: 10,
    freeMode: true,
    watchSlidesProgress: true,
    direction: 'vertical',

    // Responsive breakpoints
    breakpoints: {
      1024: {
        slidesPerView: 5,
        spaceBetween: 12,
      },
    },
  });

  const swiperMain = new Swiper('.swiperMain', {
    // configure Swiper to use modules
    modules: [Navigation, Thumbs, Autoplay],

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next-events',
      prevEl: '.swiper-button-prev-events',
    },

    // Default parameters
    spaceBetween: 10,

    thumbs: {
      swiper: swiperThumbs,
    },

    autoplay: {
      delay: 5000,
    },

    loop: true,
  });
});
