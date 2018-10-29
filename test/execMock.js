'use strict';

const execMock = (time = 200, error = false) => (resolve, reject) => {
  setTimeout(() => {
    if (error) return reject('error');
    resolve('success');
  }, time);
}

module.exports = execMock;
