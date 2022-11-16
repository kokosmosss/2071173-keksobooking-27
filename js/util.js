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

function debounce(cb, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => cb.apply(this, rest), timeoutDelay);
  };
}

export { getRandomFloat, getRandomInt, getArrayElement, getNewArray, isEscapeKey, debounce };
