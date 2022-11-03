import { activatePage } from './page.js';
import { address } from './form-validation.js';
import { renderPopup } from './popup.js';

const TOKIO_LAT = 35.65785;
const TOKIO_LNG = 139.78248;
const ZOOM = 12;
const MAX_ZOOM = 19;
// вот если я правильно поняла, то нужна такая функция, но дальше что я ней надо делать? с учетом что ее вызов должен быть внутри модуля. если я ее в мейне вызываю, то вылезает ошибка
const initMap = () => {
  const mainMap = L.map('map-canvas')
    .on('load', activatePage) // вот тут я так понимаю без скобок надо - передавать ссылку. но как понять логику, где они нужны, а где нет?
    .setView({
      lat: TOKIO_LAT,
      lng: TOKIO_LNG,
    }, ZOOM);

  return mainMap;
};

const map = initMap();

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: MAX_ZOOM,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
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

mainMarker.addTo(map);

address.value = `${TOKIO_LAT}, ${TOKIO_LNG}`;

mainMarker.on('moveend', (evt) => {
  const coordinates = evt.target.getLatLng();
  address.value = `${coordinates.lat.toFixed(5)}, ${coordinates.lng.toFixed(5)}`;
});

const getMarkers = (advertisements) => {
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

export { getMarkers };
