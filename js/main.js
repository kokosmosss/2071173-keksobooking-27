
import { deactivatePage } from './page.js';
import { initValidation, initSlider } from './form-validation.js';
import { initMap } from './map.js';
import { setImgChooseEventListener } from './images.js';

deactivatePage();
initMap();
initSlider();
initValidation();
setImgChooseEventListener();
