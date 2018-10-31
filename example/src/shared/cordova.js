import Cordova from '@workplus/codash/cordova';

const defaultConfig = {
  timeout: -1,
  json: true,
  mock: true,
  mockData: {
    'WorkPlus_Auth': {
      'getUserTicket': function(params) {
        return { user_ticket: 'mock_ticket' };
      },
      'getAccessToken': function(params) {
        return { access_token: 'mock_token' };
      },
    }
  }
};
const wp = new Cordova(defaultConfig);
const authHook = wp.addHook('WorkPlus_Auth');

wp.interceptors.before.use((config) => {
  console.log(config);
  return config;
}, err => console.log(err));

wp.interceptors.after.use((response) => {
  console.log(response);
  return response;
}, err => console.log(err));

const customOptions = {
  mock: true, 
  mockData: {
    'WorkPlus_Auth': {
      'getAccessToken': function(params) {
        return { access_token: 'mock_token_custom' };
      },
    }
  },
  timeout: 1000,
}
export const getAccessToken = wp.create('WorkPlus_Auth', 'getAccessToken', false, customOptions);
export const getUserTicket = authHook.create('getUserTicket');

export const selectImage = wp.create('WorkPlus_Image', 'selectImage', false, { mock: false });
