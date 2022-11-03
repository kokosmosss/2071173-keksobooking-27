import { getNewAdvertisements } from './data.js';
import { deactivatePage, activatePage } from './page.js';
import { initValidation } from './form-validation.js';
import { getMarkers } from './map.js';

const similarCards = getNewAdvertisements();
getMarkers(similarCards);
deactivatePage();
activatePage(); // я оставила вызов тут просто чтобы работало, если убрать - форма заблокирована
initValidation();

