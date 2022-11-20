const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const avatarChoosen = document.querySelector('.ad-form-header__input');
const avatarPreview = document.querySelector('.ad-form-header__preview');
const photoChoosen = document.querySelector('.ad-form__input');
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
      newImg.height = '68';
      newImg.width = '68';
      newImg.style.objectFit = 'contain';
      preview.append(newImg);
    }
  }
};

const setImgChooseEventListener = () => {
  avatarChoosen.addEventListener('change', () => {
    onImageChoose(avatarChoosen, avatarPreview);
  });

  photoChoosen.addEventListener('change', () => {
    onImageChoose(photoChoosen, photoPreview);
  });
};

const previewReset = () => {
  const avatarDefaultImg = avatarPreview.querySelector('img');
  avatarDefaultImg.src = 'img/muffin-grey.svg';
  photoPreview.innerHTML = '';
  avatarChoosen.value = '';
  photoChoosen.value = '';
};

setImgChooseEventListener();
export { setImgChooseEventListener, previewReset };
