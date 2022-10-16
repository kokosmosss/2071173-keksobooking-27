const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const offerTypeDictionary = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const renderPhotos = (block, photos, template) => {
  if (photos.length !== 0) {
    photos.forEach((photo) => {
      const imageElement = template.cloneNode(true);
      imageElement.src = photo;
      block.append(imageElement);
    });
  } else {
    block.remove();
  }
};

const renderFeatures = (featureList, featuresArray, featuresListParent) => {
  if (featuresArray.length !== 0) {
    featureList.forEach((featureListItem) => {
      const isNecessary = featuresArray.some((feature) => featureListItem.classList.contains(`popup__feature--${feature}`));

      if (!isNecessary) {
        featureListItem.remove();
      }
    });
  } else {
    featuresListParent.remove();
  }
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

  cardElement.querySelector('.popup__avatar').src = avatar;
  cardElement.querySelector('.popup__title').textContent = title;
  cardElement.querySelector('.popup__text--address').textContent = address;
  cardElement.querySelector('.popup__text--price').textContent = `${price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = offerTypeDictionary[type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${rooms} комнаты для ${guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;

  const featuresListParent = cardElement.querySelector('.popup__features');
  const featureList = featuresListParent.querySelectorAll('.popup__feature');
  const popupPhotosElement = cardElement.querySelector('.popup__photos');
  const popupPhotoTemplate = popupPhotosElement.querySelector('.popup__photo');
  const descriptionItem = cardElement.querySelector('.popup__description');

  if (description.length !== 0) {
    descriptionItem.textContent = description;
  } else {
    descriptionItem.remove();
  }

  renderFeatures(featureList, features, featuresListParent);

  popupPhotosElement.innerHTML = '';
  renderPhotos(popupPhotosElement, photos, popupPhotoTemplate);

  return cardElement;
};

export { renderPopup };
