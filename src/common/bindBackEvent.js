'use strict';

export default function bindBackEvent(backEvent) {
  const backButtonEvent = (channel) => {
    if (channel.action === 'backbutton') {
      backEvent && backEvent();
    }
  };
  cordova.exec(null, null, "CoreAndroid", "overrideBackbutton", [true]);
  cordova.exec(backButtonEvent, null, "CoreAndroid", "messageChannel", []);
}
