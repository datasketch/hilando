import {renderPublicaciones} from '../utils/render';
import {paginate, renderPaginationButtons} from '../utils/pagination';

// ELEMENTS
const filters = document.querySelector('.filters');
const panels = document.querySelectorAll('.panel');
const images = document.querySelectorAll('.accordion--images');
const publicaciones = document.querySelector('.publicaciones');
const dataEl = document.querySelector('#data-publicaciones');
const pagination = document.querySelector('.pagination');
const scrollPagination = document.querySelector('#paginationScroll');
const search = document.querySelector('#search');
dataEl.remove();

const state = {
  originalData: JSON.parse(dataEl.value),
  filteredData: null,
  filters: {
    tema: [],
    query: '',
  },
  itemsPerPagination: 6,
  page: 1,
};

function filterData() {
  publicaciones.innerHTML = '';
  const {filters, originalData} = state;
  const hasTemaFilter = !!filters.tema.length;
  const hasQueryFilter = !!filters.query.length;
  state.filteredData = originalData;

  if (hasTemaFilter) {
    state.filteredData = state.filteredData.filter((item) => filters.tema.includes(item.tema));
  }

  if (hasQueryFilter) {
    state.filteredData = state.filteredData.filter((item) => item.nombre_publicacion.toLowerCase().includes(filters.query.toLowerCase()));
  }

  paginate(state.page, state.itemsPerPagination, state.filteredData).forEach((item) => renderPublicaciones(publicaciones, item));

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

search.addEventListener('input', (e) => {
  state.filters.query = e.target.value;
  filterData();
});

window.addEventListener('load', () => {
  filterData();
});
