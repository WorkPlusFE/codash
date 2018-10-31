'use strict';

import invariant from 'invariant';
import dispatchCordovaEvent from './dispatch';
import Interceptor from './interceptor';
import defaultConfig from '../defaultConfig';
import { merge, deepMerge, isString } from '../utils';

class Cordova {
  constructor(instanceConfig = {}) {
    this.defaultsConfig = merge(defaultConfig, instanceConfig);
    this.interceptors = {
      before: new Interceptor(),
      after: new Interceptor(),
    };
  }

  get version() {
    return cordova ? cordova.version : -1;
  }

  handle(config) {
    const dispatchConfig = merge(this.defaultsConfig, config);
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

    const options = deepMerge(this.defaultsConfig, { hook, action, params }, extend);
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

export default Cordova;