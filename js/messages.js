import { isEscapeKey } from './util.js';

const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const successMessage = successTemplate.cloneNode(true);

const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const errorMessage = errorTemplate.cloneNode(true);


// как второй параметр назвать?
const renderMessage = (element) => {
  document.body.appendChild(element);

  element.addEventListener('click', () => {
    element.remove();
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      element.remove();
    }
  });
};


// const onSuccessMessageKeydown = (evt) => {
//   if (isEscapeKey(evt)) {
//     successMessage.remove();
//   }
// };

// const onErrorMessageKeydown = (evt) => {
//   if (isEscapeKey(evt)) {
//     errorMessage.remove();
//   }
// };

const showSuccessMessage = () => {
  renderMessage(successMessage);
};

const showErrorMessage = () => {
  renderMessage(errorMessage);
};

const showAlert = () => {
  const alertContainer = document.createElement('div');
  alertContainer.classList.add('server-request-error');
  alertContainer.innerHTML = '<p class="server-request-error__message">Не удалось получить данные с сервера. Пожалуйста, обновите страницу или попробуйте позже</p>';

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 5000);
};

export { showSuccessMessage, showErrorMessage, showAlert };

