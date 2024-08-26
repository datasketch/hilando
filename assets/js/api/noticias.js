'use strict';

const {format} = require('date-fns');
const {es} = require('date-fns/locale');
const {normalize} = require('js/utils');
const {renderPaginationButtons, paginate} = require('js/utils/pagination');
const {renderNews} = require('js/utils/render');

const search = document.querySelector('#search');
const resetBtn = document.querySelector('#reset');
const filters = document.querySelector('.filters');
const dataEl = document.querySelector('#data-news');
const news = document.querySelector('.news');
const pagination = document.querySelector('.pagination');
const scrollPagination = document.querySelector('#paginationScroll');
dataEl.remove();


const panels = document.querySelectorAll('.panel');
const images = document.querySelectorAll('.accordion--images');

let state = {
  originalData: JSON.parse(dataEl.value),
  filteredData: null,
  filters: {
    query: '',
    date: [],
    topic: [],
    municipality: [],
    region: [],
    author: [],
  },
  itemsPerPagination: 8,
  page: 1,
};

function filterData() {
  news.innerHTML = '';
  const {filters, originalData} = state;

  const hasQueryFilter = !!filters.query.length;
  const hasDateFilter = !!filters.date.length;
  const hasTopicFilter = !!filters.topic.length;
  const hasMunicipalityFilter = !!filters.municipality.length;
  const hasRegionFilter = !!filters.region.length;
  const hasAuthorFilter = !!filters.author.length;
  state.filteredData = originalData;

  if (hasQueryFilter) {
    state.filteredData = state.filteredData.filter((item) =>
      normalize(item.title).includes(normalize(filters.query)),
    );
  }

  if (hasDateFilter) {
    state.filteredData = state.filteredData.filter((item) =>
      filters.date.includes(
          format(new Date(item.date), 'MMMM yyyy', {locale: es}),
      ),
    );
  }

  if (hasTopicFilter) {
    state.filteredData = state.filteredData.filter((item) =>
      filters.topic.includes(item.topic),
    );
  }

  if (hasMunicipalityFilter) {
    state.filteredData = state.filteredData.filter((item) =>
      filters.municipality.includes(item.municipality),
    );
  }

  if (hasRegionFilter) {
    state.filteredData = state.filteredData.filter((item) =>
      filters.region.includes(item.region),
    );
  }

  if (hasAuthorFilter) {
    state.filteredData = state.filteredData.filter((item) =>
      filters.author.includes(item.author),
    );
  }

  if (state.filteredData.length > 0) {
    paginate(state.page, state.itemsPerPagination, state.filteredData).forEach(
        (item) => renderNews(news, item),
    );
  } else {
    news.innerHTML = '<p>No hay resultados para su búsqueda</p>';
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

search.addEventListener('input', (e) => {
  state.filters.query = e.target.value;
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

resetBtn.addEventListener('click', () => {
  state = {
    originalData: JSON.parse(dataEl.value),
    filteredData: null,
    filters: {
      query: '',
      date: [],
      topic: [],
      municipality: [],
      region: [],
      author: [],
    },
    itemsPerPagination: 8,
    page: 1,
  };
  search.value = '';
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(function(checkbox) {
    checkbox.checked = false;
  });
  filterData();
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
