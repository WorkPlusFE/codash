import wp from '../shared/cordova';

const hook = 'WorkPlus_Location';
const hookInstance = wp.addHook(hook);

const WorkPlus_Location = [{
  title: '获取定位信息',
  page: 'base',
  tips: '返回地理位置信息',
  options: {
    action: 'getLocation',
    params: [],
    hook,
    hookInstance,
  },
}];

export default WorkPlus_Location;
