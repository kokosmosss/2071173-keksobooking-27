
import { deactivatePage } from './page.js';
import { initValidation, initSlider } from './form-validation.js';
import { initMap } from './map.js';
import './images.js';

deactivatePage();
initMap();
initSlider();
initValidation();

