(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.workplusfileDownload = factory());
}(this, (function () { 'use strict';

  class FileDownload {
    constructor() {
      this.fileTransfer = new FileTransfer();
    }
    download(source, target, trustAllHosts = false, options) {
      return new Promise((resolve, reject) => {
        const successCallback = entry => resolve(entry);
        const errorCallback = error => reject(error);

        this.fileTransfer.download(
          encodeURI(source),
          target,
          successCallback,
          errorCallback,
          trustAllHosts,
          options,
        );
      });
    }
  }

  return FileDownload;

})));
