import wp from '../shared/cordova';

const hook = 'WorkPlus_WebView';
const hookInstance = wp.addHook(hook);

const WorkPlus_WebView = [{
  title: '打开WorkPlus里已有的html *',
  page: 'base',
  tips: '传入相对地址，打开WorkPlus里已有的网页',
  options: {
    action: 'openLocalURL',
    params: [{ "localURL":"打开本地所在的html文件地址" }],
    hook,
    hookInstance,
  },
}, {
  title: '打开一个网页',
  page: 'base',
  tips: '传入地址，打开WorkPlus网页',
  options: {
    action: 'openWebView',
    params: [{
      url: 'https://workplus.io/', 
      title: '您专属的“微信”和移动应用门户',
    }],
    hook,
    hookInstance,
  },
}, {
  title: '锁定网页顶部栏',
  page: 'base',
  tips: '锁定顶部栏，使得顶部栏按钮无效，参数为字符串lock和unlock',
  options: {
    action: 'navigation',
    params: ['lock'],
    hook,
    hookInstance,
  },
}, {
  title: '更换左侧按钮动作 *',
  page: 'base',
  tips: '更换左侧的按钮动作',
  options: {
    action: 'leftButton',
    params: ["某个能在全局访问得了的js方法名"],
    hook,
    hookInstance,
  },
}, {
  title: '更换右侧按钮动作 *',
  page: 'base',
  tips: '更换右侧按钮动作',
  options: {
    action: 'rightButtons',
    params: [[{"icon": -1,"title": "完成", "action": "js", "value": "某个可在全局范围使用的js方法"}]],
    hook,
    hookInstance,
  },
}, {
  title: '更换头部title',
  page: 'base',
  tips: '更换头部title',
  options: {
    action: 'title',
    params: ["这是新的标题"],
    hook,
    hookInstance,
  },
}, {
  title: '清除左侧按钮',
  page: 'base',
  tips: '清除左侧按钮事件和显示',
  options: {
    action: 'clearLeftButton',
    params: [],
    hook,
    hookInstance,
  },
}, {
  title: '清除右侧按钮',
  page: 'base',
  tips: '清除右侧按钮事件和显示',
  options: {
    action: 'clearRightButtons',
    params: [],
    hook,
    hookInstance,
  },
}, {
  title: '退出webview',
  page: 'base',
  tips: '关闭整个webview',
  options: {
    action: 'exit',
    params: [],
    hook,
    hookInstance,
  },
}, {
  title: '弹出分享对话框',
  page: 'base',
  tips: '弹出分享对话框，跳转分享',
  options: {
    action: 'share',
    params: [{ "url": "http://www.baidu.com", "title":"百度一下", "cover_media_id": "" }],
    hook,
    hookInstance,
  },
}, {
  title: '跳转到workkplus特定页面 *',
  page: 'base',
  tips:  `跳转到workkplus特定页面`,
  options: {
    action: 'toActivity',
    params: [{
      "activity": "toMain",
      "client_id": "用户id",
      "next_url": "www.baidu.com",
      "access_token": "123456789",
      "username": "用户注册username",
      "name": "用户名字"
    }],
    hook,
    hookInstance,
  },
}, {
  title: '是否隐藏或显示左侧的按钮和关闭字样',
  page: 'base',
  tips:  `是否隐藏或显示左侧的按钮和关闭字样`,
  options: {
    action: 'visibleLeftButton',
    params: [{
      showBack: true,
      showClose: true,
    }],
    hook,
    hookInstance,
  },
}, {
  title: '更换左侧侧按钮和定义动作 *',
  page: 'base',
  tips:  `更换左侧的按钮动作，在workplus3.1.3版本之后新增disable参数`,
  options: {
    action: 'changeLeftButton',
    params: [[{
      "disable": "false",
      "icon": -1,
      "title": "标题",
      "action": "js",
      "value": ""
    }]],
    hook,
    hookInstance,
  },
}, {
  title: '控制屏幕旋转',
  page: 'base',
  tips:  `根据参数控制屏幕横屏显示或者竖屏显示；WorkPlus版本3.1.3以上版本使用。`,
  options: {
    action: 'changeOrientation',
    params: [{
      landscape: true,
      lock: false,
    }],
    hook,
    hookInstance,
  },
}, {
  title: '添加水印',
  page: 'base',
  tips:  `给页面添加水印`,
  options: {
    action: 'addWaterMask',
    params: [{
      "textColor" : "#000000",
      "alpha": 1.0,
      "verticalPadding": 40,
      "fontSize": 16
    }],
    hook,
    hookInstance,
  },
}, {
  title: '移除水印',
  page: 'base',
  tips:  `给页面移除水印`,
  options: {
    action: 'removeWaterMask',
    params: [],
    hook,
    hookInstance,
  },
}, {
  title: '注册摇一摇',
  page: 'base',
  tips:  `前端需要实现onWorkplusShake()方法, 在该处执行自己的业务, 摇一摇后将在该方法回调.`,
  options: {
    action: 'registerShakeListener',
    params: [],
    hook,
    hookInstance,
  },
}, {
  title: '注销摇一摇',
  page: 'base',
  tips:  `注销摇一摇监听`,
  options: {
    action: 'unregisterShakeListener',
    params: [],
    hook,
    hookInstance,
  },
}, {
  title: '微信分享(会话/朋友圈) *',
  page: 'base',
  tips:  `根据接口直接调起微信分享页面`,
  options: {
    action: 'wxShare',
    params: [{
      "title": "这是一个标题",
      "type"  : "webpage",
      "description": "这是概要，你信不信",
      "thumb": "base64://xxxxx==",
      "scene": 0,
      "data"  : { "url" : "https://www.baidu.com" }
    }],
    hook,
    hookInstance,
  },
}];

export default WorkPlus_WebView;
