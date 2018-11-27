import wp from '../shared/cordova';

const auth = wp.addHook('WorkPlus_Auth');

const getUserTicket = auth.create('getUserTicket');

const WorkPlus_Auth = {
  getUserTicket: {
    title: '获取临时ticket接口',
    page: '/base/WorkPlus_Auth/getUserTicket',
    tips: '',
    handle() {
      return getUserTicket();
    }
  }
}