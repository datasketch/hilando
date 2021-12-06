import { setupSlider } from '../js/lib/slider';

setupSlider('.slider-wrapper', {
  slidesPerView: 1,
  spaceBetween: 0,
  loop: false,
  autoplay: {
    delay: 5000,
  },
  breakpoints: {
    1024: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
  },
});