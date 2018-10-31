'use strict';

import Cordova from './core/cordova';
import deviceReady from './common/deviceReady';
import bindBackEvent from './common/bindBackEvent';
import FileDownload from './common/fileDownload';
import FileUpload from './common/fileUpload';
import toBase64 from './common/toBase64';
import { stringToJson, getFileName } from './utils';

export {
  Cordova,
  deviceReady,
  bindBackEvent,
  FileDownload,
  FileUpload,
  toBase64,

  stringToJson,
  getFileName,
};
