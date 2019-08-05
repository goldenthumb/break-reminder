import { app } from 'electron';
import App from './App';
import shortcuts from '../lib/shortcuts';
import { setLoginSetting } from './autoLaunch';

if (app.dock) {
  app.dock.hide();
}

app.once('ready', () => new App());
app.on('browser-window-focus', shortcuts.start);
app.on('browser-window-blur', shortcuts.stop);
app.on('before-quit', setLoginSetting);

setLoginSetting();
