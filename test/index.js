import test from 'ava';
import execMock from './execMock';
import { Cordova } from '../lib/codash';

test('Some thing', t => {
  global.cordova = {
    exec: execMock(),
  };
  const instance = new Cordova();
  instance.interceptors.before.use((config) => {
    return config;
  }, err => {});
  instance.interceptors.after.use((result) => {
    result.data = 'success!'
    return result;
  }, err => {});

  const fn = instance.create('hook', 'action');
  return fn().then((res) => {
    t.deepEqual(res.data, 'success!');
  });
});
