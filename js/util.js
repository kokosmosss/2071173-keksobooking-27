const getRandomFloat = (min, max, decimal) => {
  if (min < 0 || decimal < 0 || max <= min) {
    return NaN;
  }
  const random = Math.random() * (max + (0.1 ** decimal) - min) + min;

  return Number(random.toFixed(decimal));
};

const getRandomInt = (min, max) => {
  if (min < 0 || max <= min) {
    return NaN;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];

const getNewArray = (array) => {
  const newArrayLength = getRandomInt(1, array.length);

  return array.slice(0, newArrayLength);
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const closeElement = (element) => {
  element.style.display = 'none';
  // или вот так? element.remove();
  // не понимаю как и где удалять обработчик
};

const showSuccessMessage = () => {
  const successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');
  const successMessage = successTemplate.cloneNode(true);
  document.body.appendChild(successMessage);

  // тут еще надо сделать закрытие по произвольному клику, это значит его надо через event на document ловить?
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      closeElement(successMessage);
    }
  });
};

const showErrorMessage = () => {
  const errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
  const errorMessage = errorTemplate.cloneNode(true);
  document.body.appendChild(errorMessage);

  const errorButton = errorMessage.querySelector('.error__button');

  errorButton.addEventListener('click', () => {
    closeElement(errorMessage);
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      closeElement(errorMessage);
    }
  });
};

export { getRandomFloat, getRandomInt, getArrayElement, getNewArray, showSuccessMessage, showErrorMessage };
