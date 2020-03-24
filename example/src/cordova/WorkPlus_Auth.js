import wp from '../shared/cordova';

const hook = 'WorkPlus_Auth';
const hookInstance = wp.addHook(hook);

const WorkPlus_Auth = [{
  title: '获取临时ticket接口',
  page: 'base',
  tips: '为当前登录用户获取一个临时性的ticket',
  options: {
    action: 'getUserTicket',
    params: [],
    hook,
    hookInstance,
  },
}, {
  title: '获取当前app请求后台api地址',
  page: 'base',
  tips: '通过在params中传入字段名，调用方法后，将会返回对应的字段值，例如获取管理后台的API地址等。',
  options: {
    action: 'getServerInfo',
    params: ['api_url'],
    hook,
    hookInstance,
  },
}, {
  title: '告诉WorkPlus当前的accessToken已过期',
  page: 'base',
  tips: '若调用该方法，App将会弹框请求退出重新登录',
  options: {
    action: 'onAccessTokenOverdue',
    params: [],
    hook,
    hookInstance,
  },
}, {
  title: '获取当前的租户id',
  page: 'base',
  tips: '租户id，即域id',
  options: {
    action: 'getTenantID',
    params: [],
    hook,
    hookInstance,
  },
}, {
  title: '获取当前登录用户最基本详情',
  page: 'base',
  tips: '获取当前登录用户最基本详情，包括token，用户信息',
  options: {
    action: 'getLoginUserInfo',
    params: [],
    hook,
    hookInstance,
  },
}];

export default WorkPlus_Auth;
