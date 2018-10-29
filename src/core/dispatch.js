'use strict';

import { throwMsgWhenCordovaIsUndefined, stringToJson } from '../utils';

const createResponseData = (config, cordova = null) => (data, status = 0, timeout = false) => {
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
  const responseFn = createResponseData(config, cordova);
  
  if (typeof cordova === 'undefined') {
    throwMsgWhenCordovaIsUndefined();
    return Promise.resolve(responseFn(null, -1));
  }

  return new Promise((resolve, reject) => {
    const { hook, action, params } = config;
    const { timeout, cache } = config;
    
    let done = false;
    cordova.exec((data) => {
      if (!done) {
        done = true;
        resolve(responseFn(data);
      }
    }, (error) => {
      done = true;
      resolve(responseFn(error, -1));
    }, hook, action, params || []);

    setTimeout(() => {
      if (!done) {
        done = true;
        resolve(responseFn(null, -1, true));
      }
    }, timeout);
  });
}
