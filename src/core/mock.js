import invariant from 'invariant';
import { isFunction, isEmptyObject } from '../utils';

// mockData:
// {
//   'hook': {
//     'action': function(params) {
//       return { mock: true };
//     }
//   }
// }

export default function cordovaExecMock(config) {
  const { mockData } = config;
  invariant(!isEmptyObject(mockData), '[codash]: mockData can not be empty');
  const getMockDataByParams = (hook, action, params) => {
    const mockHook = mockData[hook];
    invariant(mockHook, `[codash]: '${hook}' not found. Please check the mock data.`);
    if (mockHook) {
      const mockAction = mockData[hook][action];
      invariant(mockAction, `[codash]: '${action}' not found. Please check the mock data.`);
      if (mockAction) {
        if (mockAction === null) return false;
        const isFn = isFunction(mockAction);
        invariant(isFn, `[codash]: '${hook} > ${action}' must be a function.`);
        if (isFn) {
          return mockAction;
        }
      }
    }
    return false;
  };

  return (success, error, hook, action, params) => {
    const mockAction = getMockDataByParams(hook, action, params);
    if (mockAction !== false) {
      success(mockAction(params));
    } else {
      error();
    }
  };
}