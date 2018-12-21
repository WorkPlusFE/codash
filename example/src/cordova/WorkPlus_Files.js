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
}, {
  title: '获取 workplus 文件目录路径',
  page: 'base',
  tips: 'Workplus 3.1.4版本以上使用。',
  options: {
    action: 'getUserFilePath',
    params: [{ system: 'file' }],
    hook,
    hookInstance,
  },
}, {
  title: '打开文件详情 *',
  page: 'base',
  tips: '通过指定 mediaId, fileName 等参数, 打开文件详情界面',
  options: {
    action: 'showFile',
    params: [{
      "fileName": "xxx",
      "fileSize": "xxx",
      "mediaId" : "Z3JvdXAxL00wMC8wOS82RS9yQkFDLUZzV1EwMkFJblF5QUFDb293akxFYjQ5NjIuanBn",
      "isImage": false
    }],
    hook,
    hookInstance,
  },
}, {
  title: '本地打开文件 *',
  page: 'base',
  tips: '原生打开文件(pdf, excel, word, ppt 等)',
  options: {
    action: 'readFile',
    params: [{ path: 'xxx' }],
    hook,
    hookInstance,
  },
}, {
  title: '判断文件是否存在 *',
  page: 'base',
  tips: '判断指定路径的文件是否存在',
  options: {
    action: 'isFileExist',
    params: [{ path: 'xxx' }],
    hook,
    hookInstance,
  },
}];

export default WorkPlus_Files;
