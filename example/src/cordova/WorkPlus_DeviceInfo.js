import wp from '../shared/cordova';

const hook = 'WorkPlus_DeviceInfo';
const hookInstance = wp.addHook(hook);

const WorkPlus_DeviceInfo = [{
  title: '获取IP地址',
  page: 'base',
  tips: '获取当前连接状态下的IP地址',
  options: {
    action: 'getIpAddress',
    params: [],
    hook,
    hookInstance,
  },
}, {
  title: '获取设备信息',
  page: 'base',
  tips: '获取当前设备和WorkPlus的一些信息',
  options: {
    action: 'getDeviceInfo',
    params: [],
    hook,
    hookInstance,
  },
}, {
  title: '获取设备的运动数据',
  page: 'base',
  tips: '获取设备当天凌晨0点至当前时间的运动数据 (从版本3.12.1起提供)',
  options: {
    action: 'getPedometerData',
    params: [],
    hook,
    hookInstance,
  },
}];

export default WorkPlus_DeviceInfo;
