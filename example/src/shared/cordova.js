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

wp.interceptors.before.use((config) => {
  console.log(config);
  return config;
}, err => console.log(err));

wp.interceptors.after.use((response) => {
  console.log(response);
  return response;
}, err => console.log(err));

export const selectImage = wp.create('WorkPlus_Image', 'selectImage');
export const changeTitle = title => {
  const fn = wp.create('WorkPlus_WebView', 'title', [title]);
  return fn();
};

export default wp; 
