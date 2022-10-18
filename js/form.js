const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.querySelectorAll('.ad-form__element');
const mapFilters = document.querySelector('.map__filters');
const mapFilter = mapFilters.querySelectorAll('.map__filter');
const mapFeatures = mapFilters.querySelector('.map__features');


const blockForm = () => {
  adForm.classList.add('.ad-form--disabled');
  mapFilters.classList.add('.map__filters--disabled');

  adFormElements.forEach((element) => { element.setAttribute('disabled', 'disabled'); });
  mapFilter.forEach((filter) => { filter.setAttribute('disabled', 'disabled'); });
  mapFeatures.setAttribute('disabled', 'disabled');
};

const activateForm = () => {
  adForm.classList.remove('.ad-form--disabled');
  mapFilters.classList.remove('.map__filters--disabled');

  adFormElements.forEach((element) => { element.removeAttribute('disabled'); });
  mapFilter.forEach((filter) => { filter.removeAttribute('disabled'); });
  mapFeatures.removeAttribute('disabled');
};

export { blockForm, activateForm };
