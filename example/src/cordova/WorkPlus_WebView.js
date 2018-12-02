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
    action: 'exit',
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
    action: 'exit',
    params: [{
      showBack: true,
      showClose: true,
    }],
    hook,
    hookInstance,
  },
}];

export default WorkPlus_WebView;
