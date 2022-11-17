
const isEscapeKey = (evt) => evt.key === 'Escape';

function debounce(cb, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => cb.apply(this, rest), timeoutDelay);
  };
}

export { isEscapeKey, debounce };
