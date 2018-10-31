'use strict';

import cordovaExecMock from './mock';
import { 
  throwMsgWhenCordovaIsUndefined, 
  stringToJson, 
  hasCordova,
  isEmptyObject,
} from '../utils';

const createResponseData = (config, cordova) => (data, status = 0, timeout = false) => {
  const { json } = config;
  return { 
    data: json ? stringToJson(data) : data, 
    config, 
    cordova, 
    status,
    timeout,
  };
};

export default function dispatchCordovaEvent(config) {
  let responseFn;

  const { mock } = config;
  if (!hasCordova() && !mock) {
    throwMsgWhenCordovaIsUndefined();
    responseFn = createResponseData(config, null);
    return Promise.resolve(responseFn(null, -1));
  }
  const _cordova = hasCordova() ? cordova : {};
  responseFn = createResponseData(config, _cordova);

  return new Promise((resolve, reject) => {
    const { hook, action, params } = config;
    const { timeout, cache } = config;
    const execFn = mock ? cordovaExecMock(config) : cordova.exec;
    
    let done = false;
    execFn((data) => {
      if (!done) {
        done = true;
        resolve(responseFn(data));
      }
    }, (error) => {
      done = true;
      resolve(responseFn(error, -1));
    }, hook, action, params || []);

    if (timeout > 0) {
      setTimeout(() => {
        if (!done) {
          done = true;
          resolve(responseFn(null, -1, true));
        }
      }, timeout);
    }
  });
}
