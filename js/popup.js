import { getNewAdvertisements } from './data.js';

const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const similarCards = getNewAdvertisements();

const offerTypeDictionary = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const createAccomodationType = (type) => offerTypeDictionary[type];

const renderPhotos = (block, photos) => {
  photos.forEach((photo) => {
    const imageElement = document.createElement('img');
    imageElement.src = photo;
    imageElement.width = 45;
    imageElement.height = 40;
    imageElement.alt = 'Фотография жилья';
    block.append(imageElement);
  });
};

const renderPopup = (popup) => {
  const cardElement = cardTemplate.cloneNode(true);
  const {
    author: { avatar },
    offer: {
      title,
      address,
      price,
      type,
      rooms,
      guests,
      checkin,
      checkout,
      features,
      description,
      photos
    }
  } = popup;
  cardElement.querySelector('.popup__title').textContent = title;
  cardElement.querySelector('.popup__text--address').textContent = address;
  cardElement.querySelector('.popup__text--price').textContent = `${price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = createAccomodationType(type);
  cardElement.querySelector('.popup__text--capacity').textContent = `${rooms} комнаты для ${guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  cardElement.querySelector('.popup__features').textContent = features;
  cardElement.querySelector('.popup__description').textContent = description;

  const popupPhotosElement = cardElement.querySelector('.popup__photos');
  popupPhotosElement.innerHTML = '';

  renderPhotos(popupPhotosElement, photos);

  cardElement.querySelector('.popup__avatar').src = avatar;

  return cardElement;

  // const cardChildren = cardElement.children;

  // for (let i = 0; i < cardChildren.length; i++) {
  //   if (cardChildren[i].innerHTML === '') {
  //     cardChildren[i].remove();
  //   }
  // }
};

const card = renderPopup(similarCards[0]);
export { card };
