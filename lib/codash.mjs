/*!
 * @w6s/codash.js v1.1.1
 * (c) 2020 WorkPlusFE
 * Released under the MIT License.
 * https://github.com/WorkPlusFE/codash#readme
 */

import invariant from 'invariant';
import deepmerge from 'deepmerge';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var toString = function toString(val) {
  return Object.prototype.toString.call(val);
};
var isArray = function isArray(val) {
  return toString(val) === '[object Array]';
};

var isFunction = function isFunction(val) {
  return toString(val) === '[object Function]';
};
var isString = function isString(val) {
  return toString(val) === '[object String]';
};
var isObject = function isObject(val) {
  return toString(val) === '[object Object]';
};
var isEmptyObject = function isEmptyObject(obj) {
  return isObject(obj) && Object.keys(obj).length === 0;
};

var hasCordova = function hasCordova() {
  return typeof cordova !== 'undefined';
};

var getFileName = function getFileName(fileURL) {
  return fileURL.substr(fileURL.lastIndexOf('/') + 1);
};

var each = function each(obj, fn) {
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') {
    obj = [obj];
  }

  if (isArray(obj)) {
    for (var i = 0, l = obj.length; i < l; i += 1) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
};

var stringToJson = function stringToJson(string) {
  try {
    return JSON.parse(string);
  } catch (e) {
    return string;
  }
};

var throwMsgWhenCordovaIsUndefined = function throwMsgWhenCordovaIsUndefined() {
  invariant(null, 'Make sure that cordova.js is properly introduced and that the <script type="text/javascript" src="applocal://www/cordova.min.js"></script> tag is added to the html page. And make sure to perform the cordova event after deviceReady.');
};

// mockData:
// {
//   'hook': {
//     'action': function(params) {
//       return { mock: true };
//     }
//   }
// }

function cordovaExecMock(config) {
  var mockData = config.mockData;

  invariant(!isEmptyObject(mockData), '[codash]: mockData can not be empty');
  var getMockDataByParams = function getMockDataByParams(hook, action, params) {
    var mockHook = mockData[hook];
    invariant(mockHook, '[codash]: \'' + hook + '\' not found. Please check the mock data.');
    if (mockHook) {
      var mockAction = mockData[hook][action];
      invariant(mockAction, '[codash]: \'' + action + '\' not found. Please check the mock data.');
      if (mockAction) {
        if (mockAction === null) return false;
        var isFn = isFunction(mockAction);
        invariant(isFn, '[codash]: \'' + hook + ' > ' + action + '\' must be a function.');
        if (isFn) {
          return mockAction;
        }
      }
    }
    return false;
  };

  return function (success, error, hook, action, params) {
    var mockAction = getMockDataByParams(hook, action, params);
    if (mockAction !== false) {
      success(mockAction(params));
    } else {
      error();
    }
  };
}

var createResponseData = function createResponseData(config, cordova) {
  return function (data) {
    var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var timeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var json = config.json;

    return {
      data: json ? stringToJson(data) : data,
      config: config,
      cordova: cordova,
      status: status,
      timeout: timeout
    };
  };
};

function dispatchCordovaEvent(config) {
  var responseFn = void 0;

  var mock = config.mock;

  if (!hasCordova() && !mock) {
    throwMsgWhenCordovaIsUndefined();
    responseFn = createResponseData(config, null);
    return Promise.resolve(responseFn(null, -1));
  }
  var _cordova = hasCordova() ? cordova : {};
  responseFn = createResponseData(config, _cordova);

  return new Promise(function (resolve, reject) {
    var hook = config.hook,
        action = config.action,
        params = config.params;
    var timeout = config.timeout,
        cache = config.cache;

    var execFn = mock ? cordovaExecMock(config) : cordova.exec;

    var done = false;
    execFn(function (data) {
      if (!done) {
        done = true;
        resolve(responseFn(data));
      }
    }, function (error) {
      done = true;
      resolve(responseFn(error, -1));
    }, hook, action, params || []);

    if (timeout > 0) {
      setTimeout(function () {
        if (!done) {
          done = true;
          resolve(responseFn(null, -1, true));
        }
      }, timeout);
    }
  });
}

var Interceptor = function () {
  function Interceptor() {
    classCallCheck(this, Interceptor);

    this.handlers = [];
  }

  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */


  createClass(Interceptor, [{
    key: 'use',
    value: function use(fulfilled, rejected) {
      this.handlers.push({
        fulfilled: fulfilled,
        rejected: rejected
      });
      return this.handlers.length - 1;
    }

    /**
     * Remove an interceptor from the stack
     *
     * @param {Number} id The ID that was returned by `use`
     */

  }, {
    key: 'eject',
    value: function eject(id) {
      if (this.handlers[id]) {
        this.handlers[id] = null;
      }
    }

    /**
     * Iterate over all the registered interceptors
     *
     * This method is particularly useful for skipping over any
     * interceptors that may have become `null` calling `eject`.
     *
     * @param {Function} fn The function to call for each interceptor
     */

  }, {
    key: 'forEach',
    value: function forEach(fn) {
      each(this.handlers, function (h) {
        if (h !== null) {
          fn(h);
        }
      });
    }
  }]);
  return Interceptor;
}();

var defaultConfig = {
  timeout: -1,
  json: true,
  mock: false,
  mockData: {}
};

var Cordova = function () {
  function Cordova() {
    var instanceConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, Cordova);

    this.defaultsConfig = deepmerge(defaultConfig, instanceConfig);
    this.interceptors = {
      before: new Interceptor(),
      after: new Interceptor()
    };
  }

  createClass(Cordova, [{
    key: 'handle',
    value: function handle(config) {
      var dispatchConfig = deepmerge(this.defaultsConfig, config);
      var chain = [dispatchCordovaEvent, undefined];
      var promise = Promise.resolve(dispatchConfig);

      this.interceptors.before.forEach(function (interceptor) {
        chain.unshift(interceptor.fulfilled, interceptor.rejected);
      });

      this.interceptors.after.forEach(function (interceptor) {
        chain.push(interceptor.fulfilled, interceptor.rejected);
      });

      while (chain.length) {
        promise = promise.then(chain.shift(), chain.shift());
      }

      return promise;
    }
  }, {
    key: 'create',
    value: function create(hook, action) {
      var _this = this;

      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      var extend = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      invariant(hook, 'Hook cannot be empty');
      invariant(action, 'Action cannot be empty');

      var options = deepmerge({ hook: hook, action: action, params: params }, extend);
      return function () {
        return _this.handle(options);
      };
    }
  }, {
    key: 'addHook',
    value: function addHook(hook) {
      invariant(hook, 'Hook cannot be empty');
      invariant(isString(hook), 'Hook must be a string');
      var self = this;
      return {
        create: function create(action) {
          var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
          var extend = arguments[2];

          return self.create(hook, action, params, extend);
        }
      };
    }
  }, {
    key: 'version',
    get: function get$$1() {
      return cordova ? cordova.version : -1;
    }
  }]);
  return Cordova;
}();

function deviceReady() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _options$timeout = options.timeout,
      timeout = _options$timeout === undefined ? 5000 : _options$timeout,
      _options$isMock = options.isMock,
      isMock = _options$isMock === undefined ? false : _options$isMock,
      _options$mock = options.mock,
      mock = _options$mock === undefined ? false : _options$mock;


  return new Promise(function (resolve, reject) {
    if (isMock || mock) {
      if (isMock) {
        console.warn('isMock 属性将在下个版本弃用，请使用 mock 属性进行设置');
      }
      console.log('[codash]: Mock device ready.');
      return resolve();
    }

    var ready = false;
    setTimeout(function () {
      if (!ready) reject({ status: -1, deviceready: false });
    }, timeout);

    document.addEventListener('deviceready', function () {
      ready = true;
      resolve();
    }, false);
  });
}

function bindBackEvent(backEvent) {
  var backButtonEvent = function backButtonEvent(channel) {
    if (channel.action === 'backbutton') {
      backEvent && backEvent();
    }
  };
  cordova.exec(null, null, "CoreAndroid", "overrideBackbutton", [true]);
  cordova.exec(backButtonEvent, null, "CoreAndroid", "messageChannel", []);
}

var FileDownload = function () {
  function FileDownload() {
    classCallCheck(this, FileDownload);

    this.fileTransfer = new FileTransfer();
  }

  createClass(FileDownload, [{
    key: 'download',
    value: function download(source, target) {
      var _this = this;

      var trustAllHosts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var options = arguments[3];

      return new Promise(function (resolve, reject) {
        var successCallback = function successCallback(entry) {
          return resolve(entry);
        };
        var errorCallback = function errorCallback(error) {
          return reject(error);
        };

        _this.fileTransfer.download(encodeURI(source), target, successCallback, errorCallback, trustAllHosts, options);
      });
    }
  }]);
  return FileDownload;
}();

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

var FileUpload = function () {
  function FileUpload(options) {
    classCallCheck(this, FileUpload);

    this.fileTransferInstance = new FileTransfer();
    this.options = this.initFileUploadOptions(options);
  }

  createClass(FileUpload, [{
    key: 'initFileUploadOptions',
    value: function initFileUploadOptions(options) {
      var opts = new FileUploadOptions();
      for (var key in options) {
        opts[key] = options[key];
      }
      return opts;
    }
  }, {
    key: 'upload',
    value: function upload(fileURL, server, options) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var success = function success(res) {
          if (res.responseCode === 200) {
            if (options.success && isFunction(options.success)) options.success(res);
            return resolve(res);
          }
          return reject(res);
        };
        var failure = function failure(err) {
          if (options.error && isFunction(options.error)) {
            options.error(err);
          }
          reject(err);
        };
        _this.fileTransferInstance.onprogress = function (progressEvent) {
          var loaded = progressEvent.loaded,
              total = progressEvent.total;

          if (options.progress && isFunction(options.progress)) {
            options.progress(loaded, total);
          }
        };

        _this.fileTransferInstance.upload(fileURL, encodeURI(server), success, failure, _this.options, trustAllHosts = !!options.trustAllHosts);
      });
    }
  }, {
    key: 'abort',
    value: function abort() {
      this.fileTransferInstance.abort();
    }
  }]);
  return FileUpload;
}();

function toBase64(path, success, error) {
	function resolveImgURI(fileUrl, callback) {
		if (cordova.platformId.toLowerCase() === 'android') {
			fileUrl = 'file://' + fileUrl;
		}
		window.resolveLocalFileSystemURL(fileUrl, function (fileEntry) {
			fileEntry.file(function (file) {
				readDataUrl(file, callback);
			}, fail);
		}, fail);
	}
	function readDataUrl(file, callback) {
		var reader = new FileReader();
		reader.onloadend = function (evt) {
			if (evt.target._result) {
				evt.target._result = evt.target._result.split(',')[1];
			}
			callback(evt);
		};
		reader.readAsDataURL(file);
	}
	function fail(evt) {
		error(evt);
	}
	resolveImgURI(path, success);
}

export { Cordova, deviceReady, bindBackEvent, FileDownload, FileUpload, toBase64, stringToJson, getFileName };
