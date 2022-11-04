/* eslint-disable no-unused-vars */
import {renderEvent} from '../utils/render';
import {paginate, renderPaginationButtons} from '../utils/pagination';
import Swiper, {Navigation, Pagination, Thumbs, Autoplay, FreeMode} from 'swiper';
import * as ics from 'ics';
import Modal from '../utils/modal';

// ELEMENTS
const filters = document.querySelector('.filters');
const panels = document.querySelectorAll('.panel');
const images = document.querySelectorAll('.accordion--images');
const event = document.querySelector('.event');
const events = document.querySelector('.events');
const dataEl = document.querySelector('#data-eventos');
const pagination = document.querySelector('.pagination');
const scrollPagination = document.querySelector('#paginationScroll');
const search = document.querySelector('#search');
dataEl.remove();

// init Swiper:

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
    1024: {
      slidesPerView: 2,
      spaceBetween: 54.18,
    },
  },
});

const state = {
  originalData: JSON.parse(dataEl.value),
  filteredData: null,
  filters: {
    departamento: [],
    municipio: [],
    mes: [],
    tipo: [],
    comunidad: [],
    query: '',
  },
  itemsPerPagination: 3,
  page: 1,
};

function filterData() {
  event.innerHTML = '';
  const {filters, originalData} = state;
  const hasDepartamentoFilter = !!filters.departamento.length;
  const hasMunicipioFilter = !!filters.municipio.length;
  const hasMesFilter = !!filters.mes.length;
  const hasTipoFilter = !!filters.tipo.length;
  const hasComunidadFilter = !!filters.comunidad.length;
  const hasQueryFilter = !!filters.query.length;
  state.filteredData = originalData;

  if (hasDepartamentoFilter) {
    state.filteredData = state.filteredData.filter((item) => filters.departamento.includes(item.macroregion));
  }
  if (hasMunicipioFilter) {
    state.filteredData = state.filteredData.filter((item) => filters.municipio.includes(item.municipio));
  }
  if (hasMesFilter) {
    state.filteredData = state.filteredData.filter((item) => filters.mes.includes(item.mes));
  }
  if (hasTipoFilter) {
    state.filteredData = state.filteredData.filter((item) => filters.tipo.includes(item.tipo_evento));
  }
  if (hasComunidadFilter) {
    state.filteredData = state.filteredData.filter((item) => filters.comunidad.includes(item.comunidad));
  }
  if (hasQueryFilter) {
    state.filteredData = state.filteredData.filter((item) => item.nombre_evento.toLowerCase().includes(filters.query.toLowerCase()));
  }

  paginate(state.page, state.itemsPerPagination, state.filteredData.sort((a, b) => new Date(b.date) - new Date(a.date))).forEach((item) => renderEvent(event, item));

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

event.addEventListener('click', function(e) {
  // get id
  const id = e.target.closest('button')?.dataset.id;

  // closure protection
  if (!id) return;

  // filter by id
  const data = JSON.parse(dataEl.value).filter((item) => item.id === +id)[0];

  // call modal class
  // eslint-disable-next-line no-unused-vars
  const modal = new Modal(data);

  // call slider library
  // const swiperThumbs = swiperGalleryThumbs('.swiperThumbs');
  // const swiperMain = swiperGalleryMain('.swiperMain');

  const swiperThumbs = new Swiper('.swiperThumbs', {
    // configure Swiper to use modules
    modules: [Autoplay, FreeMode],

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

events?.addEventListener('click', function(e) {
  // get id
  const id = e.target.closest('button')?.dataset.id;

  // closure protection
  if (!id) return;

  // filter by id
  const data = JSON.parse(dataEl.value).filter((item) => item.id === +id);

  // call modal class
  // eslint-disable-next-line no-unused-vars
  const modal = new Modal(data[0]);

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

search.addEventListener('input', (e) => {
  state.filters.query = e.target.value;
  filterData();
});

window.addEventListener('load', () => {
  filterData();
  const downloadICS = Array.from(document.querySelectorAll('.download-ics'));
  downloadICS.forEach((button) => {
    button.addEventListener('click', (e) => {
      try {
        const data = JSON.parse(e.target.dataset.ics);
        ics.createEvent(data, (err, value) => {
          if (err) {
            console.log(error);
            alert('Se ha producido un error');
            return;
          }
          window.open('data:text/calendar;charset=utf8,' + encodeURIComponent(value));
        });
      } catch (error) {
        console.log(error);
        alert('Se ha producido un error');
      }
    });
  });
});
