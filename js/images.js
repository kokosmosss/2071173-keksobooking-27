const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const DEFAULT_AVATAR = 'img/muffin-grey.svg';

const avatarChosen = document.querySelector('.ad-form-header__input');
const avatarPreview = document.querySelector('.ad-form-header__preview');
const photoChosen = document.querySelector('.ad-form__input');
const photoPreview = document.querySelector('.ad-form__photo');

const onImageChoose = (input, preview) => {
  const file = input.files[0];
  const fileName = file.name.toLowerCase();
  const img = preview.querySelector('img');

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    if (preview.contains(img)) {
      img.src = URL.createObjectURL(file);

    } else {
      const newImg = document.createElement('img');
      newImg.src = URL.createObjectURL(file);
      newImg.alt = 'Фото жилья';
      newImg.height = 68;
      newImg.width = 68;
      newImg.style.objectFit = 'contain';
      preview.append(newImg);
    }
  }
};

const setImgChooseEventListener = () => {
  avatarChosen.addEventListener('change', () => {
    onImageChoose(avatarChosen, avatarPreview);
  });

  photoChosen.addEventListener('change', () => {
    onImageChoose(photoChosen, photoPreview);
  });
};

const resetPrewiew = () => {
  const avatarDefaultImg = avatarPreview.querySelector('img');
  avatarDefaultImg.src = DEFAULT_AVATAR;
  photoPreview.innerHTML = '';
  avatarChosen.value = '';
  photoChosen.value = '';
};

export { setImgChooseEventListener, resetPrewiew };
