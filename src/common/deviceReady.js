'use strict';

export default function deviceReady(options = {}) {
  const { timeout = 5000, isMock = false } = options;

  return new Promise((resolve, reject) => {
    if (isMock) {
      console.warn('isMock属性将在下个版本弃用，改为使用mock属性')
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
