const {default: Modal} = require('js/utils/modal');
const {paginate} = require('js/utils/pagination');
const {renderLearn} = require('js/utils/render');
import Swiper, {Navigation, Thumbs, Autoplay, FreeMode} from 'swiper';

const filters = document.querySelector('.filters');
const panels = document.querySelectorAll('.panel');
const images = document.querySelectorAll('.accordion--images');
const dataEl = document.querySelector('#data-aprende');
const learn = document.querySelector('.learn');
const pagination = document.querySelector('.pagination');
const scrollPagination = document.querySelector('#paginationScroll');
const orderBy = document.querySelector('#orderBy');
const resetBtn = document.querySelector('#reset');
dataEl.remove();

let state = {
  originalData: JSON.parse(dataEl.value),
  filteredData: null,
  filters: {
    topic: [],
    orderBy: '0',
  },
  itemsPerPagination: 10,
  page: 1,
};

function filterData() {
  learn.innerHTML = '';
  const {filters, originalData} = state;
  const hasTopicFilter = !!filters.topic.length;
  const hasOrderBy = !!filters.orderBy.length;
  state.filteredData = originalData;

  if (hasTopicFilter) {
    state.filteredData = state.filteredData.filter((item) =>
      filters.topic.includes(item.tema),
    );
  }

  if (hasOrderBy) {
    switch (filters.orderBy) {
      case '0':
      case '1':
        state.filteredData = state.filteredData.sort((a, b) => {
          if (new Date(b.fecha) > new Date(a.fecha)) {
            return 1;
          }
          if (new Date(b.fecha) < new Date(a.fecha)) {
            return -1;
          }
          return 0;
        });
        break;
      case '2':
        state.filteredData = state.filteredData.sort((a, b) => {
          if (new Date(b.fecha) < new Date(a.fecha)) {
            return 1;
          }
          if (new Date(b.fecha) > new Date(a.fecha)) {
            return -1;
          }
          return 0;
        });
        break;
      case '3':
        state.filteredData = state.filteredData.sort((a, b) => {
          if (a.nombre_de_la_publicacion > b.nombre_de_la_publicacion) {
            return 1;
          }
          if (a.nombre_de_la_publicacion < b.nombre_de_la_publicacion) {
            return -1;
          }
          return 0;
        });
        break;
      case '4':
        state.filteredData = state.filteredData.sort((a, b) => {
          if (a.nombre_de_la_publicacion < b.nombre_de_la_publicacion) {
            return 1;
          }
          if (a.nombre_de_la_publicacion > b.nombre_de_la_publicacion) {
            return -1;
          }
          return 0;
        });
        break;
    }
  }

  if (state.filteredData.length > 0) {
    paginate(state.page, state.itemsPerPagination, state.filteredData).forEach(
        (item) => renderLearn(learn, item),
    );
  } else {
    learn.innerHTML = '<p>No hay resultados para su búsqueda</p>';
  }
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

orderBy.addEventListener('change', (e) => {
  state.filters.orderBy = e.target.value;
  state.page = 1;
  filterData();
});

resetBtn.addEventListener('click', () => {
  state = {
    originalData: JSON.parse(dataEl.value),
    filteredData: null,
    filters: {
      topic: [],
      orderBy: '0',
    },
    itemsPerPagination: 10,
    page: 1,
  };
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

learn?.addEventListener('click', function(e) {
  // get id
  const id = e.target.closest('button')?.dataset.id;

  // closure protection
  if (!id) return;

  // filter by id
  const data = JSON.parse(dataEl.value).filter((item) => +item.Id === +id);

  // call modal class
  // eslint-disable-next-line no-unused-vars
  const formatData = {
    ...data[0],
    enlace_video: data[0].enlace_video
        .split(',')
        .map((url) => url.trim())
        .filter(Boolean).join(','),
  };


  const modal = new Modal(formatData, 'aprende');

  const swiperThumbs = new Swiper('.swiperThumbs', {
    // configure Swiper to use modules
    modules: [Navigation, Autoplay, FreeMode],

    // Default parameters
    slidesPerView: 'auto',
    spaceBetween: 10,
    freeMode: true,
    watchSlidesProgress: true,
    direction: 'horizontal',
  });

  // eslint-disable-next-line no-unused-vars
  const swiperMain = new Swiper('.swiperMain', {
    // configure Swiper to use modules
    modules: [Navigation, Thumbs, Autoplay],

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-learn-next',
      prevEl: '.swiper-button-learn-prev',
      disabledClass: 'opacity-40',
    },

    // Default parameters
    spaceBetween: 10,

    thumbs: {
      swiper: swiperThumbs,
    },

    loop: true,
  });
});

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

window.addEventListener('load', () => {
  filterData();
});
