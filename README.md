# Codash <a href="https://www.npmjs.com/package/@workplus/codash"><img alt="npm" src="https://img.shields.io/npm/v/@workplus/codash.svg?style=flat-square"></a>

* 可配置，易用，轻松实现cordova promisify;
* 可添加拦截器，处理流程更方便；
* 接口可模拟，无需写两套同名方法；
* 提供常用方法，如绑定物理返回按钮，文件上传下载等。

使用 WorkPlus 扫一扫，查看在线 demo.

<img src="https://github.com/WorkPlusFE/codash/blob/master/design/qr-code.png" width="150" height="150" alt="demo-link" />

> [WorkPlus Cordova API 官方说明文档](https://workplusfe.github.io/cordova-docs/)

## Docs

* [创建 promisify-corodva 方法](https://github.com/WorkPlusFE/codash/blob/master/docs/core.md#cordova--constructor)
* [添加接口拦截功能](https://github.com/WorkPlusFE/codash/blob/master/docs/core.md#%E6%B7%BB%E5%8A%A0%E6%8B%A6%E6%88%AA%E5%99%A8)
* [开启模拟模式及设置模拟数据](https://github.com/WorkPlusFE/codash/blob/master/docs/core.md#%E6%8E%A5%E5%8F%A3%E6%A8%A1%E6%8B%9F)
* [监听设备加载完毕](https://github.com/WorkPlusFE/codash/blob/master/docs/base.md#deviceready)
* [绑定安卓机物理返回按钮的返回事件](https://github.com/WorkPlusFE/codash/blob/master/docs/base.md#bindbackevent)
* [文件下载](https://github.com/WorkPlusFE/codash/blob/master/docs/base.md#filedownload) / [文件上传](https://github.com/WorkPlusFE/codash/blob/master/docs/file.md#fileupload)
* [图片转base64](https://github.com/WorkPlusFE/codash/blob/master/docs/file.md#tobase64)

## Install

```bash
npm install @workplus/codash --save 
```

## Usage

```js
import { Cordova, deviceReady } from '@workplus/codash';

// 实例化，相关可用配置属性，请查看文档
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

// deviceReady 同样可以配置，具体请查看文档
deviceReady({ isMock: false })
  .then(() => Promise.all([getUserTicket(), getAccessToken()]))
  .then((res) => {})
  .catch((err) => {});

```

## Author

Hejx
