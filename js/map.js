import { activatePage } from './page.js';
import { renderPopup } from './popup.js';
import { getNewAdvertisements } from './data.js';

const TOKIO_LAT = 35.65785;
const TOKIO_LNG = 139.78248;
const ZOOM = 12;
const MAX_ZOOM = 19;
const TILELAYER_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const TILELAYER_ATTRIBUTION = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

const address = document.querySelector('#address');
const map = L.map('map-canvas');
const similarCards = getNewAdvertisements();

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

address.value = `${TOKIO_LAT}, ${TOKIO_LNG}`;

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
      .addTo(map)
      .bindPopup(renderPopup(element));
  });
};

const initMap = () => {
  map.on('load', () => {
    activatePage();
    renderMarkers(similarCards);
  })
    .setView({
      lat: TOKIO_LAT,
      lng: TOKIO_LNG,
    }, ZOOM);

  mainMarker.addTo(map);
  mainMarker.on('move', onMarkerMove);
};

export { initMap };
