/* eslint-disable no-unused-vars */
import {renderMultimedia} from '../utils/render';
import {paginate, renderPaginationButtons} from '../utils/pagination';
import Modal from '../utils/modal';
import Swiper, {Navigation, Thumbs, Autoplay, FreeMode} from 'swiper';

// ELEMENTS
const filters = document.querySelector('.filters');
const panels = document.querySelectorAll('.panel');
const images = document.querySelectorAll('.accordion--images');
const multimedia = document.querySelector('.multimedia');
const dataEl = document.querySelector('#data-multimedia');
const pagination = document.querySelector('.pagination');
const scrollPagination = document.querySelector('#paginationScroll');
dataEl.remove();

const state = {
  originalData: JSON.parse(dataEl.value),
  filteredData: null,
  filters: {
    municipio: [],
    comunidad: [],
    tipo: [],
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
  state.filteredData = originalData;

  if (hasMunicipioFilter) {
    state.filteredData = state.filteredData.filter((item) => filters.municipio.includes(item.municipio));
  }

  if (hasComunidadFilter) {
    state.filteredData = state.filteredData.filter((item) => filters.comunidad.includes(item.comunidad));
  }

  if (hasTipoFilter) {
    state.filteredData = state.filteredData.filter((item) => filters.tipo.includes(item['tipo_multimedia']));
  }

  paginate(state.page, state.itemsPerPagination, state.filteredData).forEach((item) => renderMultimedia(multimedia, item));

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
  } else {
    panels[id].style.maxHeight = 193 + 'px';
    panels[id].style.padding = '16px 24px 8px 24px';
    panels[id].style.overflowY = 'scroll';
    images[id].style.transform = 'rotate(90deg)';
  }
});

multimedia.addEventListener('click', function(e) {
  // get id
  const id = e.target.closest('button')?.dataset.id;

  // closure protection
  if (!id) return;

  // filter by id
  const data = JSON.parse(dataEl.value).filter((item) => item.id === +id)[0];
  console.log(data);
  const getMultimediaType = data.tipo_multimedia.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
  console.log(getMultimediaType);

  // call modal class

  // eslint-disable-next-line no-unused-vars
  const modal = new Modal(data, getMultimediaType);

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
});


window.addEventListener('load', () => {
  filterData();
});
