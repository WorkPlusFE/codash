# Codash <a href="https://www.npmjs.com/package/@workplus/codash"><img alt="npm" src="https://img.shields.io/npm/v/@workplus/codash.svg?style=flat-square"></a>

* 可配置，易用，轻松实现cordova promisify;
* 可添加拦截器，处理流程更方便；
* 接口可模拟，无需写两套同名方法；
* 提供常用方法，如绑定物理返回按钮，文件上传下载等。

## Docs

* [创建 promisify-corodva 方法](https://github.com/WorkPlusFE/codash/blob/master/docs/core.md)
* [监听设备加载完毕](https://github.com/WorkPlusFE/codash/blob/master/docs/base.md#deviceready)
* [绑定安卓机物理返回按钮的返回事件](https://github.com/WorkPlusFE/codash/blob/master/docs/base.md#bindbackevent)
* [文件下载](https://github.com/WorkPlusFE/codash/blob/master/docs/base.md#filedownload) / [文件上传](https://github.com/WorkPlusFE/codash/blob/master/docs/file.md#fileupload)
* [图片转base64](https://github.com/WorkPlusFE/codash/blob/master/docs/file.md#tobase64)

> [WorkPlus Cordova API 官方说明文档](https://cordova-apidocs3.workplus.io/)

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
