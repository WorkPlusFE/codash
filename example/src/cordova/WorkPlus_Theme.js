import wp from '../shared/cordova';

const hook = 'WorkPlus_Theme';
const hookInstance = wp.addHook(hook);

const WorkPlus_Theme = [{
  title: '更新皮肤 *',
  page: 'base',
  tips: '更新对应组织的皮肤包,若该组织是当前组织,则马上显示更换效果',
  options: {
    action: 'changeTheme',
    params: [{
      "orgCode": "组织id", 
      "theme": "主题名称",
    }],
    hook,
    hookInstance,
  },
}];

export default WorkPlus_Theme;

