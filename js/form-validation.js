const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_NIGTH_PRICE = 100000;

const adForm = document.querySelector('.ad-form');
const price = adForm.querySelector('#price');
const title = adForm.querySelector('#title');
const rooms = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');

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

const validateTitle = () => title.value.length >= MIN_TITLE_LENGTH && title.value.length <= MAX_TITLE_LENGTH;
const validatePrice = () => price.value >= 0 && price.value <= MAX_NIGTH_PRICE;
const validateAccommodation = () => accommodationValues[rooms.value].includes(capacity.value);

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

const initValidation = () => {
  pristine.addValidator(title, validateTitle);
  pristine.addValidator(price, validatePrice);
  pristine.addValidator(rooms, validateAccommodation, 'Выбранное количество комнат не подходит для выбранного количества гостей');
  capacity.addEventListener('change', () => pristine.validate(rooms));
  adForm.addEventListener('submit', onFormSubmit);
};

export { initValidation };

