import { Cordova } from '../../../';

const defaultConfig = {
  timeout: -1,
  json: true,
  mock: false,
  mockData: {
    'WorkPlus_Auth': {
      'getUserTicket': function(params) {
        return { user_ticket: 'mock_ticket' };
      },
      'getAccessToken': function(params) {
        return { access_token: 'mock_token' };
      },
    },
    'WorkPlus_Image': {
      'selectImage': function(params) {
        return { image: 'xxxx' };
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
export const getAccessToken = wp.create('WorkPlus_Auth', 'getAccessToken');
export const getUserTicket = authHook.create('getUserTicket');
export const getCurrentUserInfo =  wp.create('WorkPlus_Contact', 'getCurrentUserInfo', [{ 'needEmpInfo': true }]);

export const selectImage = wp.create('WorkPlus_Image', 'selectImage');


export default wp; 
