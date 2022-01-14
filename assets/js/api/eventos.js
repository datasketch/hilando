import {renderEvent} from '../utils/render';
import {paginate, renderPaginationButtons} from '../utils/pagination';

// ELEMENTS
const filters = document.querySelector('.filters');
const panels = document.querySelectorAll('.panel');
const images = document.querySelectorAll('.accordion--images');
const event = document.querySelector('.event');
const dataEl = document.querySelector('#data-eventos');
const pagination = document.querySelector('.pagination');
const scrollPagination = document.querySelector('#paginationScroll');
dataEl.remove();

const state = {
  originalData: JSON.parse(dataEl.value),
  filteredData: null,
  filters: {
    departamento: [],
    municipio: [],
    mes: [],
    tipo: [],
  },
  itemsPerPagination: 10,
  page: 1,
};

function filterData() {
  event.innerHTML = '';
  const {filters, originalData} = state;
  const hasDepartamentoFilter = !!filters.departamento.length;
  const hasMunicipioFilter = !!filters.municipio.length;
  const hasMesFilter = !!filters.mes.length;
  const hasTipoFilter = !!filters.tipo.length;
  state.filteredData = originalData;

  if (hasDepartamentoFilter) {
    state.filteredData = state.filteredData.filter((item) => filters.departamento.includes(item.departamento));
  }
  if (hasMunicipioFilter) {
    state.filteredData = state.filteredData.filter((item) => filters.municipio.includes(item.municipio));
  }
  if (hasMesFilter) {
    state.filteredData = state.filteredData.filter((item) => filters.mes.includes(item.mes));
  }
  if (hasTipoFilter) {
    state.filteredData = state.filteredData.filter((item) => filters.tipo.includes(item.tipo));
  }

  paginate(state.page, state.itemsPerPagination, state.filteredData).forEach((item) => renderEvent(event, item));

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
  try {
    const child = e.target.closest('.accordion');
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
  } catch {
    return;
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

window.addEventListener('load', () => {
  filterData();
});
