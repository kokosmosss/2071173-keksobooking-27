function getRandomCoordinate (min, max, decimal) {
  if (min < 0 || max < 0 || decimal < 0 || max <= min) {
    return NaN;
  }
  const randomCoordinate = Math.random() * (max - min) + min;
  return randomCoordinate.toFixed(decimal);
}

getRandomCoordinate(2, 4, 3);
