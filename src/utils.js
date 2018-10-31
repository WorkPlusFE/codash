import invariant from 'invariant';

const toString = val => Object.prototype.toString.call(val);
const isArray = val => toString(val) === '[object Array]';

export const isFunction = val => toString(val) === '[object Function]';
export const isString = val => toString(val) === '[object String]';
export const isObject = val => toString(val) === '[object Object]';
export const isEmptyObject = obj => (isObject(obj) && Object.keys(obj).length === 0);

export const hasCordova = () => typeof cordova !== 'undefined';

export const getFileName = fileURL => fileURL.substr(fileURL.lastIndexOf('/') + 1);

export const each = (obj, fn) => {
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  if (typeof obj !== 'object') {
    obj = [obj];
  }

  if (isArray(obj)) {
    for (let i = 0, l = obj.length; i < l; i += 1) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    for (let key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
};

export const stringToJson = (string) => {
  try {
    return JSON.parse(string);
  } catch (e) {
    return string;
  }
};

export const throwMsgWhenCordovaIsUndefined = () => {
  invariant(null, 'Make sure that cordova.js is properly introduced and that the <script type="text/javascript" src="applocal://www/cordova.min.js"></script> tag is added to the html page. And make sure to perform the cordova event after deviceReady.');
};

export const merge = function() {
  const result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }
  for (let i = 0, l = arguments.length; i < l; i += 1) {
    each(arguments[i], assignValue);
  }
  return result;
}

export const deepMerge = function() {
  const result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }

  for (let i = 0, l = arguments.length; i < l; i += 1) {
    each(arguments[i], assignValue);
  }
  return result;
};
