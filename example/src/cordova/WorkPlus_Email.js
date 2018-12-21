import wp from '../shared/cordova';

const hook = 'WorkPlus_Email';
const hookInstance = wp.addHook(hook);

const WorkPlus_Email = [{
  title: '写邮件 *',
  page: 'base',
  tips: '跳转到写邮件的页面',
  options: {
    action: 'writeEmail',
    params: [{
      emails: 'xxx.foreverht.com',
    }],
    hook,
    hookInstance,
  },
}, {
  title: '打开邮箱',
  page: 'base',
  tips: '跳转到我的邮箱（未登陆就跳转到登陆页）',
  options: {
    action: 'openEmail',
    params: [],
    hook,
    hookInstance,
  },
}];

export default WorkPlus_Email;
