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

export { getRandomFloat };
export { getRandomInt };
export { getArrayElement };
export { getNewArray };
