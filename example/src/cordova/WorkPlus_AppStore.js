import wp from '../shared/cordova';

const hook = 'WorkPlus_AppStore';
const hookInstance = wp.addHook(hook);

const WorkPlus_AppStore = [{
  title: '添加应用 *',
  page: 'base',
  tips: '添加应用',
  options: {
    action: 'installApp',
    params: [{"app_id": "应用id"}],
    hook,
    hookInstance,
  },
}];

export default WorkPlus_AppStore;

