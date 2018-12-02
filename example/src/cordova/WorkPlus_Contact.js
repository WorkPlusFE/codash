import wp from '../shared/cordova';

const hook = 'WorkPlus_Contact';
const hookInstance = wp.addHook(hook);

const WorkPlus_Contact = [{
  title: '单选联系人',
  page: 'base',
  tips: '打开当前组织的联系人列表，单选一个联系人(兼容2.0数据)',
  options: {
    action: 'getContact',
    params: [{ hideMe: true }],
    hook,
    hookInstance,
  },
}, {
  title: '多选联系人列表',
  page: 'base',
  tips: '打开当前组织的联系人列表，选择多个联系人(兼容2.0数据)',
  options: {
    action: 'getContacts',
    params: [{ hideMe: true }],
    hook,
    hookInstance,
  },
}, {
  title: '多选当前组织的雇员列表',
  page: 'base',
  tips: '打开当前组织的联系人列表，选择多个联系人',
  options: {
    action: 'getEmployeesFromCurrentOrg',
    params: [{ hideMe: true }],
    hook,
    hookInstance,
  },
}, {
  title: '单选联系人(2.0接口, 3.0做了兼容)',
  page: 'base',
  tips: '打开当前组织的联系人列表，单选一个联系人(兼容2.0数据)',
  options: {
    action: 'getContact',
    params: [{ hideMe: true }],
    hook,
    hookInstance,
  },
}, {
  title: '获取当前登录用户详情',
  page: 'base',
  tips: '获取当前登录用户详细信息(包括某个组织下的雇员信息, 开发者传参决定)',
  options: {
    action: 'getCurrentUserInfo',
    params: [{ needEmpInfo: true }],
    hook,
    hookInstance,
  },
}, {
  title: '返回当前用户的雇员信息',
  page: 'base',
  tips: '获取当前登录用户的某个组织里的雇员信息， 默认返回当前组织的雇员，可以指定orgCode。',
  options: {
    action: 'getCurrentEmployeeInfo',
    params: [],
    hook,
    hookInstance,
  },
}, {
  title: '显示与该用户的聊天页面 *',
  page: 'base',
  tips: '轻应用输入userId，domianId, 跳转到workplus与该用户的聊天页面',
  options: {
    action: 'showUserChatViewByUser',
    params: [{
      userId: '请自行输入',
      domainId: '请自行输入'
    }],
    hook,
    hookInstance,
  },
} , {
  title: '获取手机通讯录里面的联系人列表',
  page: 'base',
  tips: '获取手机通讯录联系人的列表',
  options: {
    action: 'getMobileContacts',
    params: [],
    hook,
    hookInstance,
  },
}, {
  title: '根据用户id获取用户信息 *',
  page: 'base',
  tips: '通过用户域id和用户id获取这个用户的详细信息',
  options: {
    action: 'getUserInfoByUserId',
    params: [{
      user_id: '请自行输入',
      domain_id: '请自行输入'
    }],
    hook,
    hookInstance,
  },
}];

export default WorkPlus_Contact;