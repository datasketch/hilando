/* eslint-disable no-unused-vars */
import {swiperResilientesEntities, swiperResilientesHistories, swiperResilientesRead, swiperResilientesViews} from './lib/slider';

const navigation = document.getElementById('navigation');
const sliderResilientesHistories = swiperResilientesHistories('.swiper-resilientes-histories');
const sliderResilientesViews = swiperResilientesViews('.swiper-resilientes-views');
const sliderResilientesRead = swiperResilientesRead('.swiper-resilientes-read');
const sliderResilientesEntities = swiperResilientesEntities('.swiper-resilientes-entities');

navigation.addEventListener('click', (e) => {
  e.preventDefault();
  const link = e.target.closest('a');
  const id = link.getAttribute('href');

  const coords = document.querySelector(id).getBoundingClientRect();
  window.scrollTo({
    left: (coords.left + window.scrollX) - 130,
    top: (coords.top + window.scrollY) - 130,
    behavior: 'smooth',
  });
});
