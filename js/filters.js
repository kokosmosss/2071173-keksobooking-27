import { renderMarkers } from './map.js';

const ADVERTISEMENT_COUNT = 10;

const mapFilter = document.querySelector('.map__filters');
const mapFilters = mapFilter.querySelectorAll('fieldset, select');
const type = document.querySelector('#housing-type');

const filterType = (element) => {
  if (type.value === element.offer.type || type.value === 'any') {
    return true;
  }
};

const applyFilters = (ads) => {
  const newAds = ads.filter(filterType);
  ads.slice(0, ADVERTISEMENT_COUNT);
  renderMarkers(newAds);
};

const onAnyFilterChange = (cb) => {
  mapFilters.forEach((item) => item.addEventListener('change', cb));
};

export { applyFilters, onAnyFilterChange };
