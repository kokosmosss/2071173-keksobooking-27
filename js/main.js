import { getNewAdvertisements } from './data.js';
import { renderPopup } from './popup.js';

const similarCards = getNewAdvertisements();
const mapCanvas = document.querySelector('.map__canvas');
const card = renderPopup(similarCards[0]);
mapCanvas.appendChild(card);
