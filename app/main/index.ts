import { app } from 'electron';
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
