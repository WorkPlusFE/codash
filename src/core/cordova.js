'use strict';

import invariant from 'invariant';
import dispatchCordovaEvent from './dispatch';
import Interceptor from './interceptor';
import defaultConfig from '../defaultConfig';
import { merge, deepMerge } from '../utils';

class Cordova {
  constructor(instanceConfig) {
    this.defaults = merge(defaultConfig, instanceConfig);
    this.interceptors = {
      before: new Interceptor(),
      after: new Interceptor(),
    };
  }

  get version() {
    return cordova ? cordova.version : -1;
  }

  handle(config) {
    const dispatchConfig = merge(this.defaults, config);
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

  create(hook, action, params = []) {
    invariant(hook, 'Hook cannot be empty');
    invariant(action, 'Action cannot be empty');

    const options = deepMerge(this.defaults, { hook, action, params });
    return () => this.handle(options);
  }
}

export default Cordova;
