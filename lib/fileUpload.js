(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('invariant')) :
  typeof define === 'function' && define.amd ? define(['invariant'], factory) :
  (global.workplusfileUpload = factory(global.invariant));
}(this, (function (invariant) { 'use strict';

  invariant = invariant && invariant.hasOwnProperty('default') ? invariant['default'] : invariant;

  const toString = val => Object.prototype.toString.call(val);

  const isFunction = val => toString(val) === '[object Function]';

  /**
   * Creates an instance of FileUpload.
   * 
   * @param {object} options
   * @memberof FileUpload
   * 
   * {fileKey}: The name of the form element. Defaults to file. (DOMString)
   * {fileName}: The file name to use when saving the file on the server. Defaults to image.jpg. (DOMString)
   * {httpMethod}: The HTTP method to use - either PUT or POST. Defaults to POST. (DOMString)
   * {mimeType}: The mime type of the data to upload. Defaults to image/jpeg. (DOMString)
   * {params}: A set of optional key/value pairs to pass in the HTTP request. (Object, key/value - DOMString)
   * {chunkedMode}: Whether to upload the data in chunked streaming mode. Defaults to true. (Boolean)
   * {headers}: A map of header name/header values. Use a hash to specify one or more than one value. On iOS, FireOS, and Android, if a header named Content-Type is present, multipart form data will NOT be used. (Object)
   * 
   * https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-file-transfer/
   */
  class FileUpload {
    constructor(options) {
      this.fileTransferInstance = new FileTransfer();
      this.options = this.initFileUploadOptions(options);
    }

    initFileUploadOptions(options) {
      let opts = new FileUploadOptions();
      for (let key in options) {
        opts[key] = options[key];
      }
      return opts;
    }

    upload(fileURL, server, options) {
      return new Promise((resolve, reject) => {
        const success = (res) => {
          if (res.responseCode === 200) {
            if (options.success && isFunction(options.success)) options.success(res);
            return resolve(res);
          }
          return reject(res);
        };
        const failure = (err) => {
          if (options.error && isFunction(options.error)) {
            options.error(err);
          }
          reject(err);
        };
        this.fileTransferInstance.onprogress = (progressEvent) => {
          const { loaded, total } = progressEvent;
          if (options.progress && isFunction(options.progress)) {
            options.progress(loaded, total);
          }
        };

        this.fileTransferInstance.upload(
          fileURL, 
          encodeURI(server), 
          success,
          failure,
          this.options,
          trustAllHosts = !!options.trustAllHosts,
        );
      });
    }
    abort() {
      this.fileTransferInstance.abort();
    }
  }

  return FileUpload;

})));
