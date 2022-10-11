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
  cardElement.querySelector('.popup__avatar').src = popup.author.avatar;
  mapCanvas.appendChild(cardElement);
});


