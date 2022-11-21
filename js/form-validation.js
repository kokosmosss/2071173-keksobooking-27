import { sendData } from './api.js';
import { showErrorMessage, showSuccessMessage } from './messages.js';
import { resetMap, setDefaultAdress } from './map.js';
import { resetFilters } from './filters.js';
import { resetPrewiew } from './images.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_NIGHT_PRICE = 100000;

const adForm = document.querySelector('.ad-form');
const price = adForm.querySelector('#price');
const title = adForm.querySelector('#title');
const address = adForm.querySelector('#address');
const rooms = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const type = adForm.querySelector('#type');
const checkIn = adForm.querySelector('#timein');
const checkOut = adForm.querySelector('#timeout');
const sliderElement = adForm.querySelector('.ad-form__slider');
const resetButton = adForm.querySelector('.ad-form__reset');
const submitButton = adForm.querySelector('.ad-form__submit');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'text-help',
}, false);

const AccommodationValues = {
  1: ['1'],
  2: ['2', '1'],
  3: ['3', '2', '1'],
  100: ['0'],
};

const MinPrices = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const validateTitle = () => title.value.length >= MIN_TITLE_LENGTH && title.value.length <= MAX_TITLE_LENGTH;
const validatePrice = () => price.value >= MinPrices[type.value] && price.value <= MAX_NIGHT_PRICE;
const validateAccommodation = () => AccommodationValues[rooms.value].includes(capacity.value);


const onTypeChange = () => {
  price.min = MinPrices[type.value];
  price.placeholder = MinPrices[type.value];
};

const printMinPriceError = () => `Минимальная цена для выбранного типа размещения ${MinPrices[type.value]} руб.`;

const createSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100000,
    },
    start: MinPrices[type.value],
    step: 1,
    connect: 'lower',
    format: {
      to: (value) => value.toFixed(0),
      from: (value) => Number(value),
    },
  });
};

const onSliderChange = () => {
  sliderElement.noUiSlider.set(price.value);
};

const initSlider = () => {
  createSlider();
  price.addEventListener('change', onSliderChange);

  sliderElement.noUiSlider.on('update', () => {
    price.value = sliderElement.noUiSlider.get();
    pristine.validate(price);
  });
};

const resetForm = () => {
  adForm.reset();
  price.placeholder = MinPrices[type.value];
  price.min = MinPrices[type.value];
  sliderElement.noUiSlider.set(price.value);
  pristine.reset();
};

const resetPage = () => {
  resetForm();
  resetMap();
  resetFilters();
  setDefaultAdress();
  resetPrewiew();
};

const onResetButtonClick = (evt) => {
  evt.preventDefault();
  resetPage();
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const onSendSuccess = () => {
  showSuccessMessage();
  resetPage();
  unblockSubmitButton();
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();

  if (isValid) {
    blockSubmitButton();
    sendData(
      onSendSuccess,
      () => {
        showErrorMessage();
        unblockSubmitButton();
      },
      new FormData(adForm),
    );
  }
};

const initValidation = () => {
  address.readOnly = true;
  pristine.addValidator(title, validateTitle);
  pristine.addValidator(price, validatePrice, printMinPriceError);
  pristine.addValidator(rooms, validateAccommodation, 'Выбранное количество комнат не подходит для выбранного количества гостей');

  capacity.addEventListener('change', () => pristine.validate(rooms));
  rooms.addEventListener('change', () => pristine.validate(capacity));
  type.addEventListener('change', onTypeChange);
  checkIn.addEventListener('change', () => {
    checkOut.value = checkIn.value;
  });
  checkOut.addEventListener('change', () => {
    checkIn.value = checkOut.value;
  });
  adForm.addEventListener('submit', onFormSubmit);
  resetButton.addEventListener('click', onResetButtonClick);
};

export { initValidation, initSlider };


