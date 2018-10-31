const path = require('path');

module.exports = {
  bindBackEvent: path.resolve(__dirname, '../src/common/bindBackEvent.js'),
  deviceReady: path.resolve(__dirname, '../src/common/deviceReady.js'),
  fileUpload: path.resolve(__dirname, '../src/common/fileUpload.js'),
  fileDownload: path.resolve(__dirname, '../src/common/fileDownload.js'),
  toBase64: path.resolve(__dirname, '../src/common/toBase64.js'),
};
