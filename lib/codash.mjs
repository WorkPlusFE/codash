/*!
 * codash.js v1.0.0
 * (c) 2018 Hejx <531601727@qq.com>
 * Released under the MIT License.
 * undefined
 */

var createResponseData = function createResponseData(config, cordova) {
  return function (data) {
    var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var timeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    return { config: config, cordova: cordova, data: data, status: status, timeout: timeout };
  };
};

function dispatchCordovaEvent(config) {
  var hook = config.hook,
      action = config.action,
      params = config.params,
      timeout = config.timeout;

  var TIME_OUT = timeout || 30 * 1000;

  return new Promise(function (resolve, reject) {
    var sdk = cordova;
    var responseFn = createResponseData(config, sdk);

    if (typeof cordova !== 'undefined') {
      var done = false;
      cordova.exec(function (data) {
        if (!done) {
          done = true;
          resolve(responseFn(data));
        }
      }, function (error) {
        done = true;
        resolve(responseFn(error, -1));
      }, hook, action, params || []);

      setTimeout(function () {
        if (!done) {
          done = true;
          resolve(responseFn(null, -1, true));
        }
      }, TIME_OUT);
    } else {
      resolve(responseFn(null, -1));
    }
  });
}

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







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

















var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

var isArray = function isArray(val) {
  return Object.prototype.toString.call(val) === '[object Array]';
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

var Cordova = function () {
  function Cordova(instanceConfig) {
    classCallCheck(this, Cordova);

    this.defaults = instanceConfig;
    this.interceptors = {
      before: new Interceptor(),
      after: new Interceptor()
    };
  }

  createClass(Cordova, [{
    key: 'handle',
    value: function handle(config) {
      var chain = [dispatchCordovaEvent, undefined];
      var promise = Promise.resolve(config);

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
    value: function create(config) {
      var _this = this;

      return function () {
        return _this.handle(config);
      };
    }
  }]);
  return Cordova;
}();

function deviceReady() {
  return new Promise(function (resolve) {
    document.addEventListener('deviceready', function () {
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

export { Cordova, deviceReady, bindBackEvent, stringToJson };
//# sourceMappingURL=codash.mjs.map
