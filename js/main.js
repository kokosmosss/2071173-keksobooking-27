const TIME = [
  '12:00',
  '13:00',
  '14:00',
];

const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const FEATCHURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg ',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

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

const getAuthorAvatar = () => {
  const result = getRandomInt(1, 10);
  if (result < 10) {
    return `img/avatars/user + 0 + ${result} + .png`;
  } else {
    return `img/avatars/user + ${result} + .png`;
  }
};

const getArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];

const getNewArray = (array) => {
  const newArray = [];
  const newArrayLength = getRandomInt(1, array.length);

  for (let i = 1; i <= newArrayLength; i++) {
    const options = array.shift();
    newArray.push(options);
  }

  return newArray;
};

const getAdvertisement = () => {
  const latCoordinate = getRandomFloat(35.65000, 35.70000, 4);
  const lngCoordinate = getRandomFloat(139.70000, 139.80000, 5);
  return {
    author: {
      avatar: getAuthorAvatar(),
    },

    offer: {
      title: 'Уютное жилье в центре Токио',
      address: `${latCoordinate}, ${lngCoordinate}`,
      price: getRandomInt(1, 10000),
      type: getArrayElement(TYPE),
      rooms: getRandomInt(1, 10),
      guests: getRandomInt(1, 10),
      checkin: getArrayElement(TIME),
      checkout: getArrayElement(TIME),
      features: getNewArray(FEATCHURES),
      description: 'Какое-то описание',
      photos: getNewArray(PHOTOS),
    },

    location: {
      lat: latCoordinate,
      lng: lngCoordinate,
    },
  };
};

const newAdvertisements = Array.from({ length: 10 }, getAdvertisement);
newAdvertisements();// написала просто чтобы линтер не ругался

