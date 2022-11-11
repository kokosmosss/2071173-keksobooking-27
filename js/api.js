const ADVERTISEMENT_COUNT = 10;

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://27.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(onFail);
};

const getData = (onSuccess, onFail) => {
  fetch('https://27.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((ads) => {
      onSuccess(ads.slice(0, ADVERTISEMENT_COUNT));
    })
    .catch(onFail);
};

export { sendData, getData };
