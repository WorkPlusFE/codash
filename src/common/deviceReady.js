'use strict';

export default function deviceReady() {
  return new Promise((resolve) => {
    document.addEventListener('deviceready', () => {
      resolve();
    }, false);
  });
}
