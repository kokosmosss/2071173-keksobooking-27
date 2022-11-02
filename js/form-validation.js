// import { mainMarker } from './map.js';

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

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'text-help',
});

const accommodationValues = {
  1: ['1'],
  2: ['2', '1'],
  3: ['3', '2', '1'],
  100: ['0'],
};

const minPrices = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const validateTitle = () => title.value.length >= MIN_TITLE_LENGTH && title.value.length <= MAX_TITLE_LENGTH;
const validatePrice = () => price.value >= minPrices[type.value] && price.value <= MAX_NIGHT_PRICE;
const validateAccommodation = () => accommodationValues[rooms.value].includes(capacity.value);

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

const onTypeChange = () => {
  price.min = minPrices[type.value];
  price.placeholder = minPrices[type.value];
  pristine.validate(price);
};

address.readOnly = true;

const printMinPriceError = () => `Минимальная цена для выбранного типа размещения ${minPrices[type.value]} руб.`;

const initValidation = () => {
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
};

export { initValidation };
export { address };

