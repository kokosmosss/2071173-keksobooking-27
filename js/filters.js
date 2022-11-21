import { renderMarkers, clearMarkers } from './map.js';
import { debounce } from './util.js';
import { toggleElements } from './page.js';

const DEFAULT_VALUE = 'any';
const PriceValues = {
  low: {
    min: 0,
    max: 10000,
  },
  middle: {
    min: 10000,
    max: 50000,
  },
  high: {
    min: 50000,
    max: 100000,
  },
};
const ADVERTISEMENT_COUNT = 10;
const RENDER_MARKERS_DELAY = 500;

const mapFilter = document.querySelector('.map__filters');
const mapFilters = mapFilter.querySelectorAll('fieldset, select');
const type = document.querySelector('#housing-type');
const price = document.querySelector('#housing-price');
const rooms = document.querySelector('#housing-rooms');
const guests = document.querySelector('#housing-guests');
const features = document.querySelectorAll('.map__checkbox');

const activateFilters = () => {
  mapFilter.classList.remove('map__filters--disabled');
  toggleElements(mapFilters, false);
};

const filterByFeatures = ({ offer }) => {
  const selectedFeatures = Array.from(features).filter((feature) => feature.checked);

  if (!selectedFeatures.length) {
    return true;
  }

  if (!offer.features) {
    return false;
  }

  return selectedFeatures.every((feature) => offer.features.includes(feature.value));
};

const filterByType = ({ offer }) => type.value === DEFAULT_VALUE || type.value === offer.type;

const filterByPrice = ({ offer }) => (
  price.value === DEFAULT_VALUE ||
  offer.price >= PriceValues[price.value].min &&
  offer.price < PriceValues[price.value].max
);

const filterByRooms = ({offer}) => rooms.value === DEFAULT_VALUE || Number(rooms.value) === offer.rooms;

const filterByGuests = ({ offer }) => guests.value === DEFAULT_VALUE || Number(guests.value) === offer.guests;

const filterMarkers = (ads) => ads.filter((ad) => (
  filterByPrice(ad) &&
  filterByType(ad) &&
  filterByRooms(ad) &&
  filterByGuests(ad) &&
  filterByFeatures(ad)
));

const onFilterFormChange = (ads) => {
  clearMarkers();
  const newAds = filterMarkers(ads);
  renderMarkers(newAds.slice(0, ADVERTISEMENT_COUNT));
};

const setFilterListener = (data) => {
  mapFilter.addEventListener('change', debounce(() => {
    onFilterFormChange(data);
  }, RENDER_MARKERS_DELAY));
  mapFilter.addEventListener('reset', debounce(() => {
    onFilterFormChange(data);
  }, RENDER_MARKERS_DELAY));
};

const resetFilters = () => {
  mapFilter.reset();
};

export { activateFilters, setFilterListener, resetFilters };
