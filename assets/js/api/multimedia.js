/* eslint-disable no-unused-vars */
import {renderMultimedia} from '../utils/render';
import {paginate, renderPaginationButtons} from '../utils/pagination';
import Modal from '../utils/modal';
import Swiper, {Navigation, Thumbs, Autoplay, FreeMode} from 'swiper';
const orderBy = require('lodash.orderby');

// ELEMENTS
const filters = document.querySelector('.filters');
const panels = document.querySelectorAll('.panel');
const images = document.querySelectorAll('.accordion--images');
const multimedia = document.querySelector('.multimedia');
const dataEl = document.querySelector('#data-multimedia');
const pagination = document.querySelector('.pagination');
const search = document.querySelector('#search');
const scrollPagination = document.querySelector('#paginationScroll');

const state = {
  originalData: JSON.parse(dataEl.value),
  filteredData: null,
  filters: {
    municipio: [],
    comunidad: [],
    tipo: [],
    query: '',
  },
  itemsPerPagination: 6,
  page: 1,
};

function filterData() {
  multimedia.innerHTML = '';
  const {filters, originalData} = state;
  const hasMunicipioFilter = !!filters.municipio.length;
  const hasComunidadFilter = !!filters.comunidad.length;
  const hasTipoFilter = !!filters.tipo.length;
  const hasQueryFilter = !!filters.query.length;
  state.filteredData = orderBy(originalData, 'id', 'desc');

  if (hasMunicipioFilter) {
    state.filteredData = state.filteredData.filter((item) => filters.municipio.includes(item.municipio));
  }

  if (hasComunidadFilter) {
    state.filteredData = state.filteredData.filter((item) => filters.comunidad.includes(item.comunidad_focalizada));
  }

  if (hasTipoFilter) {
    state.filteredData = state.filteredData.filter((item) => filters.tipo.includes(item['tipo_multimedia']));
  }

  if (hasQueryFilter) {
    state.filteredData = state.filteredData.filter((item) => item.nombre_galeria?.toLowerCase().includes(filters.query.toLowerCase()) || item.titulo?.toLowerCase().includes(filters.query.toLowerCase()));
  }

  // state.filteredData = orderBy(state.filteredData, 'id', 'desc');

  paginate(state.page, state.itemsPerPagination, state.filteredData).forEach((item) => renderMultimedia(multimedia, item, item.type));

  pagination.insertAdjacentHTML(
      'beforeend',
      renderPaginationButtons(
          pagination,
          state.page,
          state.itemsPerPagination,
          state.filteredData,
      ),
  );
}

filters.addEventListener('change', function(e) {
  const {name: key, value} = e.target;
  const filterKeyValue = state.filters[key];
  if (filterKeyValue.includes(value)) {
    const index = filterKeyValue.findIndex((item) => item === value);
    filterKeyValue.splice(index, 1);
  } else {
    filterKeyValue.push(value);
  }
  state.page = 1;
  filterData();
});

pagination.addEventListener('click', (e) => {
  const btn = e.target.closest('.pagination__button');
  if (!btn) return;
  state.page = +btn.dataset.page;
  filterData();
  scrollPagination.scrollIntoView({behavior: 'smooth'});
});

// EVENTS HANDLERS
filters.addEventListener('click', function(e) {
  const child = e.target.closest('.accordion');
  if (!child) return;
  const id = child.getAttribute('data-tab');
  if (panels[id].style.maxHeight) {
    panels[id].style.maxHeight = null;
    panels[id].style.padding = '0px 24px 0px 24px';
    panels[id].style.overflowY = 'hidden';
    images[id].style.transform = 'rotate(0deg)';
    panels[id].querySelectorAll('input').forEach((input) => input.setAttribute('disabled', 'true'));
  } else {
    panels[id].style.maxHeight = 193 + 'px';
    panels[id].style.padding = '16px 24px 8px 24px';
    panels[id].style.overflowY = 'scroll';
    images[id].style.transform = 'rotate(90deg)';
    panels[id].querySelectorAll('input').forEach((input) => input.removeAttribute('disabled'));
  }
});

multimedia.addEventListener('click', function(e) {
  // get id
  const id = e.target.closest('button')?.dataset.id;

  // closure protection
  if (!id) return;

  // filter by id
  const data = JSON.parse(dataEl.value).filter((item) => item.id === +id)[0];
  const getType = data.type;

  // call modal class

  // eslint-disable-next-line no-unused-vars
  const modal = new Modal(data, getType);

  // call slider library
  // const swiperThumbs = swiperGalleryThumbs('.swiperThumbs');
  // const swiperMain = swiperGalleryMain('.swiperMain');

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

    // loop: true,

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

  const swiper = new Swiper('.swiperVideoAudio', {
    // configure Swiper to use modules
    modules: [Navigation, Autoplay],

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next--video-audio',
      prevEl: '.swiper-button-prev--video-audio',
    },

    // Default parameters
    spaceBetween: 10,

    autoplay: {
      delay: 5000,
    },

    loop: true,
  });
});

search.addEventListener('input', (e) => {
  state.filters.query = e.target.value;
  filterData();
});


window.addEventListener('load', () => {
  filterData();
});
