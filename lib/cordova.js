(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('invariant'), require('deepmerge')) :
  typeof define === 'function' && define.amd ? define(['invariant', 'deepmerge'], factory) :
  (global.workplusCordova = factory(global.invariant,global.deepmerge));
}(this, (function (invariant,deepmerge) { 'use strict';

  invariant = invariant && invariant.hasOwnProperty('default') ? invariant['default'] : invariant;
  deepmerge = deepmerge && deepmerge.hasOwnProperty('default') ? deepmerge['default'] : deepmerge;

  const toString = val => Object.prototype.toString.call(val);
  const isArray = val => toString(val) === '[object Array]';

  const isFunction = val => toString(val) === '[object Function]';
  const isString = val => toString(val) === '[object String]';
  const isObject = val => toString(val) === '[object Object]';
  const isEmptyObject = obj => (isObject(obj) && Object.keys(obj).length === 0);

  const hasCordova = () => typeof cordova !== 'undefined';

  const each = (obj, fn) => {
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

  const stringToJson = (string) => {
    try {
      return JSON.parse(string);
    } catch (e) {
      return string;
    }
  };

  const throwMsgWhenCordovaIsUndefined = () => {
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
    const { mockData } = config;
    invariant(!isEmptyObject(mockData), '[codash]: mockData can not be empty');
    const getMockDataByParams = (hook, action, params) => {
      const mockHook = mockData[hook];
      invariant(mockHook, `[codash]: '${hook}' not found. Please check the mock data.`);
      if (mockHook) {
        const mockAction = mockData[hook][action];
        invariant(mockAction, `[codash]: '${action}' not found. Please check the mock data.`);
        if (mockAction) {
          if (mockAction === null) return false;
          const isFn = isFunction(mockAction);
          invariant(isFn, `[codash]: '${hook} > ${action}' must be a function.`);
          if (isFn) {
            return mockAction;
          }
        }
      }
      return false;
    };

    return (success, error, hook, action, params) => {
      const mockAction = getMockDataByParams(hook, action, params);
      if (mockAction !== false) {
        success(mockAction(params));
      } else {
        error();
      }
    };
  }

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

  function dispatchCordovaEvent(config) {
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

  class Interceptor {
    constructor() {
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
    use(fulfilled, rejected) {
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
    eject(id) {
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
    forEach(fn) {
      each(this.handlers, (h) => {
        if (h !== null) {
          fn(h);
        }
      });
    }
  }

  var defaultConfig = {
    timeout: -1,
    json: true,
    mock: false,
    mockData: {},
  };

  class Cordova {
    constructor(instanceConfig = {}) {
      this.defaultsConfig = deepmerge(defaultConfig, instanceConfig);
      this.interceptors = {
        before: new Interceptor(),
        after: new Interceptor(),
      };
    }

    get version() {
      return cordova ? cordova.version : -1;
    }

    handle(config) {
      const dispatchConfig = deepmerge(this.defaultsConfig, config);
      const chain = [dispatchCordovaEvent, undefined];
      let promise = Promise.resolve(dispatchConfig);

      this.interceptors.before.forEach((interceptor) => {
        chain.unshift(interceptor.fulfilled, interceptor.rejected);
      });

      this.interceptors.after.forEach((interceptor) => {
        chain.push(interceptor.fulfilled, interceptor.rejected);
      });

      while (chain.length) {
        promise = promise.then(chain.shift(), chain.shift());
      }

      return promise;
    }

    create(hook, action, params = [], extend = {}) {
      invariant(hook, 'Hook cannot be empty');
      invariant(action, 'Action cannot be empty');

      const options = deepmerge({ hook, action, params }, extend);
      return () => this.handle(options);
    }

    addHook(hook) {
      invariant(hook, 'Hook cannot be empty');
      invariant(isString(hook), 'Hook must be a string');
      const self = this;
      return {
        create(action, params = [], extend) {
          return self.create(hook, action, params, extend);
        },
      };
    }
  }

  return Cordova;

})));
