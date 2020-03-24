import wp from '../shared/cordova';

const hook = 'WorkPlus_BarcodeScanner';
const hookInstance = wp.addHook(hook);

const WorkPlus_BarcodeScanner = [{
  title: '扫描二维码',
  page: 'base',
  tips: '调用相机扫描二维码（实际接口只会返回扫码结果字符串，即demo返回的value）',
  options: {
    action: 'scanner',
    params: [],
    hook,
    hookInstance,
  },
}];

export default WorkPlus_BarcodeScanner;
