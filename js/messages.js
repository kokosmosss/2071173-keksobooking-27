import { isEscapeKey } from './util.js';

const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');


const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const renderMessage = (element) => {
  document.body.appendChild(element);
  // я конструкцию с удалением обработчика не до конца понимаю. как может функция внутри себя ссылаться на себя?))
  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      element.remove();
      document.removeEventListener('keydown', onDocumentKeydown);
    }
  };

  // тут ведь не нужно удалять обработчик, поскольку элемент удаляется из дома?
  element.addEventListener('click', () => {
    element.remove();
  });

  document.addEventListener('keydown', onDocumentKeydown);
};

const showSuccessMessage = () => {
  const successMessage = successTemplate.cloneNode(true);
  renderMessage(successMessage);
};

const showErrorMessage = () => {
  const errorMessage = errorTemplate.cloneNode(true);
  renderMessage(errorMessage);
};

const showAlert = () => {
  const alertContainer = document.createElement('div');
  const text = document.createElement('p');

  alertContainer.classList.add('server-request-error');
  text.classList.add('server-request-error__message');

  text.textContent = 'Не удалось получить данные с сервера. Пожалуйста, обновите страницу или попробуйте позже';

  alertContainer.append(text);
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 3000);
};

export { showSuccessMessage, showErrorMessage, showAlert };

