## Cordova  Constructor

new Cordova(config)

```js
import { Cordova } from '@workplus/codash';

// 默认配置
const config = {
  timeout: -1, // 当值大于-1的时候，开启定时器，例如 timeout=5000， 5秒后，若接口没有返回，将超时并返回 status: -1
  json: true, // json化返回结果
  mock: false, // 开启mock
  mockData: {}, // mock的数据
}

const wp = new Cordova(config);
const getUserTicket = wp.create('WorkPlus_Auth', 'getUserTicket');

getUserTicket()
  .then((res) => {})
  .catch((err) => {});
```

### 实例方法

1、wp.create(hook, action[, params[, options]])

* *params* 为数组，如 "[{ title: 'demo title' }]"，具体看cordova接口定义；
* 通过 *options*，可以单独给某个cordova方法设置参数，将会覆盖默认配置。

```js
const getApiConfig = wp.create('WorkPlus_LightApp', 'getConfig', ['_AdminUrl'], { timeout: 1000 });
```

2、wp.addHook(hook).create(action[, params[, options]])

通常，类似功能的方法, 它们的*hook*基本一样，例如设置用户头像功能，hook都是‘userAvatar‘。通过该方法，可以避免多次设置 hook 参数：

```js
const userAvatar = wp.addHook('userAvatar');
const changeAvatarByPhotoAlbum = userAvatar.create('changeAvatarByPhotoAlbum');
const changeAvatarByTakePhoto = userAvatar.create('changeAvatarByTakePhoto');
```

### 添加拦截器

通过下面2个方法，可以给接口执行前和执行后添加拦截：

wp.interceptors.before.use(resolve, reject);

wp.interceptors.after.use(resolve, reject);

```js
wp.interceptors.before.use((config) => {
  return config;
}, (err) => {
  return Promise.reject(err);
});

wp.interceptors.after.use((response) => {
  return response;
}, (err) => {
  return Promise.reject(err);
});
```

添加拦截器后，一个正常的cordova方法执行，会是这样的执行顺序：

> interceptors.before => cordova event => interceptors.after

通过拦截器，可以做一些信息打印或记录，统一错误提醒，甚至是给接口数据添加缓存。

### 接口模拟

通过把配置中的mock设置为true，并且传入对应的mockData，即可开启接口模拟。除了全局开启外，还可以单独给某个方法单独设置。全局mock开启后，每个方法都应该对应有mockData的设置，否则，当在调用某个不存在mockData的接口时，将会给出错误提示。

> mock模式，只是对cordova的exec方法进行了模拟，也就是说，其他的设置还是照样生效。

mockData的数据结构如下：

```js
mockData: {
  'WorkPlus_Auth': {
    'getAccessToken': function(params) {
      // 返回数据可按条件设置
      return { access_token: 'mock_token_custom' };
    },
  },
},
```

> 注意：action 必需为一个方法，若该cordova是带参数的，参数将会被传入，相关的返回逻辑，可在函数内自行实现。

为了方便控制mock的开和关，可在开发过程中，利用*process.env*来进行控制，例如:

```js
const openMock = process.env.WEB_VIEW_ENV === 'workplus' ? false : true; 
```

