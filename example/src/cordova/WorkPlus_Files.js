import wp from '../shared/cordova';

const hook = 'WorkPlus_Files';
const hookInstance = wp.addHook(hook);

const WorkPlus_Files = [{
  title: '单选文件',
  page: 'base',
  tips: '打开WorkPlus文件选择管理器，选择单个文件返回',
  options: {
    action: 'selectFile',
    params: [],
    hook,
    hookInstance,
  },
}, {
  title: '多选文件',
  page: 'base',
  tips: '打开WorkPlus文件选择管理器，选择多个文件返回',
  options: {
    action: 'selectFiles',
    params: [],
    hook,
    hookInstance,
  },
}, {
  title: '打开邮件附件 *',
  page: 'base',
  tips: '打开指定路径的文件, 并预览',
  options: {
    action: 'openEmailAttachment',
    params: [{"uri":"xx", "type":"xxx"}],
    hook,
    hookInstance,
  },
}, {
  title: '获取邮件附件目录',
  page: 'base',
  tips: '获取当前登录帐号的邮件附件目录',
  options: {
    action: 'getEmailAttachmentDir',
    params: [],
    hook,
    hookInstance,
  },
}, {
  title: '文件选择接口(带mediaId)',
  page: 'base',
  tips: '打开WorkPlus文件选择管理器，根据参数状态决定单选或多选文件，并上传该文件到后台，返回值带mediaId 请求调用示例:',
  options: {
    action: 'chooseFiles',
    params: [{ multiple: true }],
    hook,
    hookInstance,
  },
}];

export default WorkPlus_Files;
