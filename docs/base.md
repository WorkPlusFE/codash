### deviceReady

该方法同样也是promisify的，支持mock和超时设置:

```js
import { deviceReady } from '@w6s/codash';

// 默认配置，非必须
const config = {
  timeout: 5000, // 默认是5秒后超时，会被reject掉；该错误可以在catch中捕捉到
  mock: false, // 若设置为 true，方法执行时会马上成功返回
};

deviceReady(config)
  .then(() => {
    // do something here.
  });
```

注意，因为 deviceReady 方法并没有拦截功能，所以当超时时，会直接 Promise.reject({ status: -1, deviceready: false })。同样，对于 mock 的设置，可以参考 Cordova mock模式 的设置方式，利用 process.env 进行控制。

### bindBackEvent

该方法主要用于绑定安卓机物理返回按钮的返回事件，若是旧版的，直接绑定'backbutton'事件即可。

```js
import { bindBackEvent } from '@workplus/codash';

const handle = () => {
  window.history.go(-1);
};
bindBackEvent(handle);
```

注意，一旦使用 bindBackEvent 方法绑定成功，即点击物理返回按钮，将不会有任何反应，也就是说，页面的返回逻辑，需要自己去处理。若在webview中，页面还是会退出或返回上一页，即代表绑定失败。

