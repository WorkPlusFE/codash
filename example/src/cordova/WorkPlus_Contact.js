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
}
, {
  title: '展示用户详情页面 *',
  page: 'base',
  tips: '通过用户username展示这个用户的详情页面',
  options: {
    action: 'showUserInfoByUsername',
    params: [{
      username: '请自行输入'
    }],
    hook,
    hookInstance,
  },
}, {
  title: '打开群组聊天页面 *',
  page: 'base',
  tips: '通过群组id打开该群组的聊天页面，并且可以自定义发送应用所支持的消息；WorkPlus版本3.1.4以上版本使用。',
  options: {
    action: 'openDiscussionById',
    params: [{
      "discussionId": "0629aad170784c9e810985c443fb0bd6",
      "body_type" : "SHARE",
      "body" : {
        "display_avatar": "***",
        "share_type": "LINK",
        "share_message": {
          "avatar":"http://www.icon",
          "digest":"这里显示摘要",
          "url":"www.baidu.com"
        }
      }
    }],
    hook,
    hookInstance,
  },
}, {
  title: '创建群组',
  page: 'base',
  tips: '通过调用原生选人界面，选择人员，创建群组，并且返回相关群组信息；WorkPlus版本3.1.4以上版本使用。',
  options: {
    action: 'createDiscussionChat',
    params: [],
    hook,
    hookInstance,
  },
}, {
  title: '打开应用聊天界面 *',
  page: 'base',
  tips: '通过应用id和orgId的，打开改组织下某个应用聊天界面；WorkPlus版本3.4.1以上版本使用。',
  options: {
    action: 'showAppChatView',
    params: [{
      "app_id": "eb66ba3d-1d83-4104-8119-c6fc3b12cdca",
      "domain_id": "atwork",
      "org_id":"37a2ef9f-8683-4369-ae7b-121cea149d05",
      "session_type":"service"
    }],
    hook,
    hookInstance,
  },
}, {
  title: '打开搜索页面',
  page: 'base',
  tips: 'WorkPlus版本3.4.1以上版本使用',
  options: {
    action: 'searchInApp',
    params: [],
    hook,
    hookInstance,
  },
}, {
  title: '打开App列表页面 *',
  page: 'base',
  tips: '根据组织id打开该组织下的应用列表页面；WorkPlus版本3.4.1以上版本使用',
  options: {
    action: 'showAppListById',
    params: [{ 
      "org_id": "37a2ef9f-8683-4369-ae7b-121cea149d05"
    }],
    hook,
    hookInstance,
  },
}, {
  title: '打开通用选择人员界面 *',
  page: 'base',
  tips: '区别于接口: 1. getContact 2. getContacts 3. getEmployeesFromCurrentOrg, 该接口打开通用的选择界面,此界面能选择组织内的雇员信息, 用户的星标联系人等；WorkPlus版本3.6.0以上版本使用',
  options: {
    action: 'selectContacts',
    params: [{
      maxCount: 10,
      filterSenior: 1,
    }],
    hook,
    hookInstance,
  },
}];

export default WorkPlus_Contact;