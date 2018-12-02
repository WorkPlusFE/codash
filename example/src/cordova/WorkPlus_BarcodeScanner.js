import wp from '../shared/cordova';

const hook = 'WorkPlus_BarcodeScanner';
const hookInstance = wp.addHook(hook);

const WorkPlus_BarcodeScanner = [{
  title: '扫描二维码',
  page: 'base',
  tips: '调用相机扫描二维码',
  options: {
    action: 'scanner',
    params: [],
    hook,
    hookInstance,
  },
}];

export default WorkPlus_BarcodeScanner;
