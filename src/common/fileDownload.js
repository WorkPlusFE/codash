'use strict';

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

export default FileDownload;
