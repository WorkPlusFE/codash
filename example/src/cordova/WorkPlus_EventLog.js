import wp from '../shared/cordova';

const hook = 'WorkPlus_EventLog';
const hookInstance = wp.addHook(hook);

const WorkPlus_EventLog = [{
  title: '获取当前登陆用户今天在线时长',
  page: 'base',
  tips: '获取当前登陆用户今天在线时长',
  options: {
    action: 'getTodayUseDuration',
    params: [],
    hook,
    hookInstance,
  },
}, {
  title: '获取事件日志数据',
  page: 'base',
  tips: '根据传参条件, 返回对应的事件日志数据.',
  options: {
    action: 'getEventLogs',
    params: [{
      "type": "LOCAL_EMAIL_LOGIN_CLICK",
    }],
    hook,
    hookInstance,
  },
}];

export default WorkPlus_EventLog;
