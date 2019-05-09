import { app, Tray } from 'electron';
import * as path from 'path';
import Store from './Store';
import MainWindow from './MainWindow';

export const renderPath = `file://${__dirname}/index.html`;

export interface Preferences {
  reminderInterval: number;
  breakDuration: number;
  options: {
    startAtLogin: boolean;
    notification: boolean;
    sound: boolean;
  };
}

export interface BreakWindowEventMessage {
  status: string;
  delay?: number;
}

const defaultPreferences: Preferences = {
  reminderInterval: 30 * 60 * 1000,
  breakDuration: 20 * 1000,
  options: {
    startAtLogin: false,
    notification: true,
    sound: true,
  }
};

export const store = new Store({
  configName: 'preferences',
  defaults: defaultPreferences
});

export const loginSettings = {
  openAtLogin: store.get('startAtLogin'),
  openAsHidden: true,
};

let tray = null;
let mainWindow: Electron.BrowserWindow = null;

app.dock.hide();

app.commandLine.appendSwitch(
  'autoplay-policy',
  'no-user-gesture-required'
);

app.setLoginItemSettings(loginSettings);

app.on('ready', () => {
  createTray();
  mainWindow = new MainWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createTray();
    mainWindow = new MainWindow();
  }
});

const createTray = () => {
  tray = new Tray(path.resolve(__dirname, './images/tray.png'));
  tray.on('right-click', toggleWindow);
  tray.on('double-click', toggleWindow);
  tray.on('click', toggleWindow);
};

const toggleWindow = () => {
  if (mainWindow.isVisible()) {
    mainWindow.hide();
  } else {
    const { x, y } = getMainWindowPosition();
    mainWindow.setPosition(x, y);
    mainWindow.show();
  }
};

const getMainWindowPosition = () => {
  const windowBounds = mainWindow.getBounds();
  const trayBounds = tray.getBounds();
  const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2));
  const y = Math.round(trayBounds.y + trayBounds.height + 4);

  return { x, y };
};