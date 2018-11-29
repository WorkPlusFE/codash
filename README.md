# Codash <a href="https://www.npmjs.com/package/@workplus/codash"><img alt="npm" src="https://img.shields.io/npm/v/@workplus/codash.svg?style=flat-square"></a>

* 可配置，易用，轻松实现cordova的promisify;
* 可添加拦截器，处理流程更方便；
* 接口可模拟，无需写两套同名方法；
* 提供常用方法，如绑定物理返回按钮，文件上传下载等。

## Docs

* [cordova-promisify](https://github.com/WorkPlusFE/codash/blob/master/docs/core.md)
* [deviceReady](https://github.com/WorkPlusFE/codash/blob/master/docs/base.md#deviceready)
* [bindBackEvent](https://github.com/WorkPlusFE/codash/blob/master/docs/base.md#bindbackevent)
* [FileDownload](https://github.com/WorkPlusFE/codash/blob/master/docs/base.md#bindbackevent)
* [FileUpload](https://github.com/WorkPlusFE/codash/blob/master/docs/file.md#fileupload)
* [toBase64](https://github.com/WorkPlusFE/codash/blob/master/docs/file.md#tobase64)

## Install

```bash
npm install @workplus/codash --save 
```

## Usage

```js
import { Cordova, deviceReady } from '@workplus/codash';

// 实例化
const wp = new Cordova();

// 设置拦截器
wp.interceptors.before.use((config) => {
  return config;
}, err => console.log(err));
wp.interceptors.after.use((response) => {
  return response;
}, err => console.log(err));

// 创建promisify的cordova方法
const authHook = wp.addHook('WorkPlus_Auth');
const getUserTicket = authHook.create('getUserTicket');

const getAccessToken = wp.create('WorkPlus_Auth', 'getAccessToken');

// 调用
deviceReady()
  .then(() => Promise.all([getUserTicket(), getAccessToken()]))
  .then((res) => {})
  .catch((err) => {});

```

## Author

Hejx
