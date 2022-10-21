const adForm = document.querySelector('.ad-form');
const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  // errorClass: 'error__message',
  // successClass: 'success__message',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__element--invalid',
});

const accommodationValues = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0'],
};

const validateAccommodation = () => accommodationValues[roomNumber.value].includes(capacity.value);

pristine.addValidator(roomNumber, validateAccommodation, 'Такое количество гостей недопустимо для выбранного количества комнат');
capacity.addEventListener('change', () => pristine.validate(roomNumber));

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

