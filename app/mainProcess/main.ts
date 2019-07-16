import { app, globalShortcut } from 'electron';
import { store } from './store';
import MainWindow from './MainWindow';

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
  globalShortcut.register('CommandOrControl+R', () => false);
  globalShortcut.register('CommandOrControl+Shift+R', () => false);
  globalShortcut.register('F5', () => false);

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
