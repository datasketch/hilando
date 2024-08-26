/* eslint-disable no-unused-vars */
import {renderEvent} from '../utils/render';
import {paginate, renderPaginationButtons} from '../utils/pagination';
import Swiper, {Navigation, Thumbs, Autoplay, FreeMode} from 'swiper';
import Modal from '../utils/modal';
import {normalize} from 'js/utils';

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
const orderBy = document.querySelector('#orderBy');
const resetBtn = document.querySelector('#reset');
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

let state = {
  originalData: JSON.parse(dataEl.value),
  filteredData: null,
  filters: {
    departamento: [],
    municipio: [],
    anio: [],
    mes: [],
    tipo: [],
    comunidad: [],
    query: '',
    orderBy: '0',
  },
  itemsPerPagination: 10,
  page: 1,
};

function filterData() {
  event.innerHTML = '';
  const {filters, originalData} = state;
  const hasDepartamentoFilter = !!filters.departamento.length;
  const hasMunicipioFilter = !!filters.municipio.length;
  const hasAnioFilter = !!filters.anio.length;
  const hasMesFilter = !!filters.mes.length;
  const hasTipoFilter = !!filters.tipo.length;
  const hasComunidadFilter = !!filters.comunidad.length;
  const hasQueryFilter = !!filters.query.length;
  const hasOrderBy = !!filters.orderBy.length;
  state.filteredData = originalData;

  if (hasDepartamentoFilter) {
    state.filteredData = state.filteredData.filter((item) =>
      filters.departamento.includes(item.macroregion),
    );
  }
  if (hasMunicipioFilter) {
    state.filteredData = state.filteredData.filter((item) =>
      filters.municipio.includes(item.municipio),
    );
  }
  if (hasAnioFilter) {
    state.filteredData = state.filteredData.filter((item) =>
      filters.anio.includes(item.anio),
    );
  }
  if (hasMesFilter) {
    state.filteredData = state.filteredData.filter((item) =>
      filters.mes.includes(item.mes),
    );
  }
  if (hasTipoFilter) {
    state.filteredData = state.filteredData.filter((item) =>
      filters.tipo.includes(item.tipo_evento),
    );
  }
  if (hasComunidadFilter) {
    state.filteredData = state.filteredData.filter((item) =>
      filters.comunidad.includes(item.comunidad),
    );
  }
  if (hasQueryFilter) {
    state.filteredData = state.filteredData.filter((item) =>
      normalize(item.nombre_evento).includes(normalize(filters.query)),
    );
  }

  if (hasOrderBy) {
    switch (filters.orderBy) {
      case '0':
      case '1':
        state.filteredData = state.filteredData.sort((a, b) => {
          if (b.anio > a.anio) {
            return 1;
          }
          if (b.anio < a.anio) {
            return -1;
          }
          return 0;
        });
        break;
      case '2':
        state.filteredData = state.filteredData.sort((a, b) => {
          if (b.anio < a.anio) {
            return 1;
          }
          if (b.anio > a.anio) {
            return -1;
          }
          return 0;
        });
        break;
      case '3':
        state.filteredData = state.filteredData.sort((a, b) => {
          if (a.nombre_evento > b.nombre_evento) {
            return 1;
          }
          if (a.nombre_evento < b.nombre_evento) {
            return -1;
          }
          return 0;
        });
        break;
      case '4':
        state.filteredData = state.filteredData.sort((a, b) => {
          if (a.nombre_evento < b.nombre_evento) {
            return 1;
          }
          if (a.nombre_evento > b.nombre_evento) {
            return -1;
          }
          return 0;
        });
        break;
    }
  }

  state.filteredData = state.filteredData.filter((el) => el.foto.length !== 0);

  if (state.filteredData.length > 0) {
    paginate(state.page, state.itemsPerPagination, state.filteredData).forEach(
        (item) => renderEvent(event, item),
    );
  } else {
    event.innerHTML = '<p>No hay resultados para su búsqueda</p>';
  }

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
    panels[id]
        .querySelectorAll('input')
        .forEach((input) => input.setAttribute('disabled', 'true'));
  } else {
    panels[id].style.maxHeight = 193 + 'px';
    panels[id].style.padding = '16px 24px 8px 24px';
    panels[id].style.overflowY = 'scroll';
    images[id].style.transform = 'rotate(90deg)';
    panels[id]
        .querySelectorAll('input')
        .forEach((input) => input.removeAttribute('disabled'));
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

orderBy.addEventListener('change', (e) => {
  state.filters.orderBy = e.target.value;
  state.page = 1;
  filterData();
});

search.addEventListener('input', (e) => {
  state.filters.query = e.target.value;
  state.page = 1;
  filterData();
});

resetBtn.addEventListener('click', () => {
  state = {
    originalData: JSON.parse(dataEl.value),
    filteredData: null,
    filters: {
      departamento: [],
      municipio: [],
      anio: [],
      mes: [],
      tipo: [],
      comunidad: [],
      query: '',
      orderBy: '0',
    },
    itemsPerPagination: 10,
    page: 1,
  };
  search.value = '';
  orderBy.selectedIndex = 0;
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(function(checkbox) {
    checkbox.checked = false;
  });
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
    direction: window.innerWidth >= 1024 ? 'vertical' : 'horizontal',

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
    direction: window.innerWidth >= 1024 ? 'vertical' : 'horizontal',

    // Responsive breakpoints
    breakpoints: {
      0: {
        slidesPerView: 3,
        spaceBetween: 12,
      },
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
  const urlParams = new URLSearchParams(window.location.search);
  const event = urlParams.get('event');
  if (!event) return;
  const currEvent = state.originalData.find((el) => el.nombre_evento === event);
  new Modal(currEvent);
  const swiperThumbs = new Swiper('.swiperThumbs', {
    modules: [Autoplay, FreeMode],
    autoplay: {
      delay: 5000,
    },
    slidesPerView: 3,
    spaceBetween: 10,
    freeMode: true,
    watchSlidesProgress: true,
    direction: window.innerWidth >= 1024 ? 'vertical' : 'horizontal',
    breakpoints: {
      1024: {
        slidesPerView: 5,
        spaceBetween: 12,
      },
    },
  });
  const swiperMain = new Swiper('.swiperMain', {
    modules: [Navigation, Thumbs, Autoplay],
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
