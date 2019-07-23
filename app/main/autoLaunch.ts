import { app } from 'electron';
import { store } from './store';

export function setAutoLaunch() {
  setLoginSetting();
  app.on('before-quit', setLoginSetting);
}

function setLoginSetting() {
  app.setLoginItemSettings({
    openAsHidden: true,
    openAtLogin: isOpenAtLoginOption(),
  });
}

function isOpenAtLoginOption() {
  return (
    process.env.NODE_ENV !== 'development' &&
    store.get('options').startAtLogin
  );
}
