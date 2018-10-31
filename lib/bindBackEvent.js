(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.workplusbindBackEvent = factory());
}(this, (function () { 'use strict';

  function bindBackEvent(backEvent) {
    const backButtonEvent = (channel) => {
      if (channel.action === 'backbutton') {
        backEvent && backEvent();
      }
    };
    cordova.exec(null, null, "CoreAndroid", "overrideBackbutton", [true]);
    cordova.exec(backButtonEvent, null, "CoreAndroid", "messageChannel", []);
  }

  return bindBackEvent;

})));
