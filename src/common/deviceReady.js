'use strict';

export default function deviceReady(options = {}) {
  const { timeout = 5000, isMock = false, mock = false } = options;

  return new Promise((resolve, reject) => {
    if (isMock || mock) {
      if (isMock) {
        console.warn('isMock 属性将在下个版本弃用，请使用 mock 属性进行设置');
      }
      console.log('[codash]: Mock device ready.');
      return resolve();
    }

    let ready = false;
    setTimeout(() => {
      if (!ready) reject({ status: -1, deviceready: false });
    }, timeout);

    document.addEventListener('deviceready', () => {
      ready = true;
      resolve();
    }, false);
  });
}
