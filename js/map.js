import { activateForm, activateFilters } from './page.js';
import { renderPopup } from './popup.js';
import { getData } from './api.js';
import { showAlert } from './messages.js';
import { setFilterListener } from './filters.js';

const TOKIO_LAT = 35.65785;
const TOKIO_LNG = 139.78248;
const ZOOM = 12;
const MAX_ZOOM = 19;
const TILELAYER_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const TILELAYER_ATTRIBUTION = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const ADVERTISEMENT_COUNT = 10;

const address = document.querySelector('#address');
const map = L.map('map-canvas');
const markerGroup = L.layerGroup().addTo(map);

L.tileLayer(TILELAYER_URL, {
  maxZoom: MAX_ZOOM,
  attribution: TILELAYER_ATTRIBUTION
}).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainMarker = L.marker(
  {
    lat: TOKIO_LAT,
    lng: TOKIO_LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const setDefaultAdress = () => {
  address.value = `${TOKIO_LAT}, ${TOKIO_LNG}`;
};

const onMarkerMove = (evt) => {
  const { lat, lng } = evt.target.getLatLng();
  address.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
};

const renderMarkers = (advertisements) => {
  advertisements.forEach((element) => {
    const marker = L.marker(
      {
        lat: element.location.lat,
        lng: element.location.lng,
      },
      {
        icon: pinIcon,
      },
    );
    marker
      .addTo(markerGroup)
      .bindPopup(renderPopup(element));
  });
};

const clearMarkers = () => markerGroup.clearLayers();

const onDataSuccess = (ads) => {
  renderMarkers(ads.slice(0, ADVERTISEMENT_COUNT));
  activateFilters();
  setFilterListener(ads);
};

const initMap = () => {
  map.on('load', () => {
    activateForm();
    getData(onDataSuccess, showAlert);
  })
    .setView({
      lat: TOKIO_LAT,
      lng: TOKIO_LNG,
    }, ZOOM);

  mainMarker.addTo(map);
  mainMarker.on('move', onMarkerMove);
  setDefaultAdress();
};

const resetMap = () => {
  mainMarker.setLatLng({
    lat: TOKIO_LAT,
    lng: TOKIO_LNG,
  });
  map.setView({
    lat: TOKIO_LAT,
    lng: TOKIO_LNG,
  }, ZOOM);
};

export { renderMarkers, initMap, resetMap, setDefaultAdress, clearMarkers };
