import wp from '../shared/cordova';

const hook = 'WorkPlus_PublicClound';
const hookInstance = wp.addHook(hook);

const WorkPlus_PublicClound = [{
  title: '跳转到个人详情页面 *',
  page: 'base',
  tips: '通过轻应用数据，跳转到个人详情页面',
  options: {
    action: 'installApp',
    params: [{
      "finish_view":false,
      "user_id": "用户id",
      "username": "用户username",
      "mobile": "用户手机",
      "domain_id": "用户域id"
    }],
    hook,
    hookInstance,
  },
}];

export default WorkPlus_PublicClound;

