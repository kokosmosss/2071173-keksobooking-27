import { getNewAdvertisements } from './data.js';

const mapCanvas = document.querySelector('.map__canvas');
const cardTemplate = document.querySelector('#card')
  .content.
  querySelector('.popup');

const similarCards = getNewAdvertisements();

similarCards.forEach((popup) => {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = popup.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = popup.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${popup.offer.price} ₽/ночь`;

  const createAccomodationType = (type) => {
    switch (type) {
      case 'flat':
        return 'Квартира';
      case 'bungalow':
        return 'Бунгало';
      case 'house':
        return 'Дом';
      case 'palace':
        return 'Дворец';
      case 'hotel':
        return 'Отель';
      default:
        return '';
    }
  };

  cardElement.querySelector('.popup__type').textContent = createAccomodationType(popup.offer.type);
  cardElement.querySelector('.popup__text--capacity').textContent = `${popup.offer.rooms} комнаты для ${popup.offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${popup.offer.checkin}, выезд до ${popup.offer.checkout}`;
  cardElement.querySelector('.popup__features').textContent = popup.offer.features;
  cardElement.querySelector('.popup__description').textContent = popup.offer.description;

  const popupPhotosElement = cardElement.querySelector('.popup__photos');
  popupPhotosElement.innerHTML = '';

  popup.offer.photos.forEach((photo) => {
    const imageElement = document.createElement('img');
    imageElement.src = photo;
    imageElement.width = '45';
    imageElement.height = '40';
    imageElement.alt = 'Фотография жилья';
    popupPhotosElement.append(imageElement);
  });
  cardElement.querySelector('.popup__avatar').src = popup.author.avatar;
  mapCanvas.appendChild(cardElement);
});


