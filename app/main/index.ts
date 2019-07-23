import { app } from 'electron';
import { setAutoLaunch } from './autoLaunch';
import MainApp from './MainApp';

let mainApp: MainApp;

app.once('ready', () => {
  mainApp = new MainApp();
});

app.on('activate', (event, hasVisibleWindows) => {
  if (!hasVisibleWindows) {
    mainApp = new MainApp();
  }
});

app.dock.hide();
setAutoLaunch();
