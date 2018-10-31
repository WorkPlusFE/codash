'use strict';

export default function deviceReady(options = {}) {
  const { timeout = 5000 } = options;

  return new Promise((resolve, reject) => {
    let ready = false;
    setTimeout(() => {
      if (!ready) resolve({ status: -1, deviceready: false });
    }, timeout);

    document.addEventListener('deviceready', () => {
      ready = true;
      resolve();
    }, false);
  });
}
