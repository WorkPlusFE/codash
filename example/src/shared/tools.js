import accordions from '../pages/Home/accordions';

export const getEventDetailByHookAndAction = (hook, action) => {
  let detail;
  accordions.some((acd) => {
    /*eslint array-callback-return: 0 */
    if (acd.hook === hook) {
      acd.items.some((item) => {
        if (item.options.action === action) {
          detail = item;
          return true;
        }
      });
      return true;
    }
  });
  return detail;
};