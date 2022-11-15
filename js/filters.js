import { renderMarkers, clearMarkers } from './map.js';

const DEFAULT_VALUE = 'any';
const PRICE_VALUES = {
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

const mapFilter = document.querySelector('.map__filters');
const mapFilters = mapFilter.querySelectorAll('.map__filter');
const type = document.querySelector('#housing-type');
const price = document.querySelector('#housing-price');
const rooms = document.querySelector('#housing-rooms');
const guests = document.querySelector('#housing-guests');
// const features = document.querySelector('#housing-features');

const filterByType = (element) => type.value === DEFAULT_VALUE || type.value === element.offer.type;
const filterByPrice = (element) => price.value === DEFAULT_VALUE || element.offer.price >= PRICE_VALUES[price.value].min && element.offer.price < PRICE_VALUES[price.value].max;
const filterByRooms = (element) => rooms.value === DEFAULT_VALUE || rooms.value === element.offer.rooms;
const filterByGuests = (element) => guests.value === DEFAULT_VALUE || guests.value === element.offer.guests;

const filtersMarkers = (ads) => ads.filter((ad) => filterByPrice(ad) && filterByType(ad) && filterByRooms(ad) && filterByGuests(ad));

const onFilterFormChange = (ads) => {
  clearMarkers();
  const newAds = filtersMarkers(ads);
  renderMarkers(newAds.slice(0, ADVERTISEMENT_COUNT));
};

const setFilterListener = (data) => {
  mapFilter.addEventListener('change', () => onFilterFormChange(data));
};


const resetFilters = () => {
  mapFilters.forEach((filter) => {
    filter.value = DEFAULT_VALUE;
  });
};

export { setFilterListener, resetFilters };
