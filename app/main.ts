import { app } from 'electron';
import { store } from './store';
import MainWindow from './windows/MainWindow';

interface LoginSettings {
  openAtLogin: boolean;
  openAsHidden: boolean;
}

const loginSettings: LoginSettings = {
  openAtLogin: store.get('options').startAtLogin,
  openAsHidden: true
};

let mainWindow: Electron.BrowserWindow;

app.dock.hide();

app.setLoginItemSettings(loginSettings);

app.once('ready', () => {
  mainWindow = new MainWindow();
});

app.on('activate', (event, hasVisibleWindows) => {
  if (!hasVisibleWindows) {
    mainWindow = new MainWindow();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
