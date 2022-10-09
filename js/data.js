import { getRandomFloat, getRandomInt, getArrayElement, getNewArray } from './util.js';

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

const FEATURES = [
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

const MIN_LAT_COORDINATE = 35.65000;
const MAX_LAT_COORDINATE = 35.70000;

const MIN_LNG_COORDINATE = 139.70000;
const MAX_LNG_COORDINATE = 139.80000;

const ADVERTISEMENT_COUNT = 10;


let advertismentNumber = 0;

const getAuthorAvatar = (avatarNumber) => {
  const prettyAvatarNumber = avatarNumber < 10 ? avatarNumber.toString().padStart(2, '0') : 10;

  return `img/avatars/user${prettyAvatarNumber}.png`;
};

const getAdvertisement = () => {
  advertismentNumber += 1;
  const latCoordinate = getRandomFloat(MIN_LAT_COORDINATE, MAX_LAT_COORDINATE, 5);
  const lngCoordinate = getRandomFloat(MIN_LNG_COORDINATE, MAX_LNG_COORDINATE, 5);

  return {
    author: {
      avatar: getAuthorAvatar(advertismentNumber),
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
      features: getNewArray(FEATURES),
      description: 'Какое-то описание',
      photos: getNewArray(PHOTOS),
    },
    location: {
      lat: latCoordinate,
      lng: lngCoordinate,
    },
  };
};

const getNewAdvertisements = () => Array.from({ length: ADVERTISEMENT_COUNT }, getAdvertisement);
export {getNewAdvertisements};
