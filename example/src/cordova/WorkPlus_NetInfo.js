import wp from '../shared/cordova';

const hook = 'WorkPlus_NetInfo';
const hookInstance = wp.addHook(hook);

const WorkPlus_NetInfo = [{
  title: '获取当前连接Wifi信息',
  page: 'base',
  tips: '获取当前连接Wifi信息, 包括 bssid, 名字等',
  options: {
    action: 'getWifiInfo',
    params: [],
    hook,
    hookInstance,
  },
}];

export default WorkPlus_NetInfo;
