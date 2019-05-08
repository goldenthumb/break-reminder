import { app, BrowserWindow, Tray, ipcMain } from 'electron';
import * as path from 'path';
import Store from './Store';
import { IPC_EVENT, MILLISECOND } from './lib/constants';

const renderPath = `file://${__dirname}/index.html`;

interface Preferences {
  reminderInterval: number;
  breakDuration: number;
  options: {
    startAtLogin: boolean;
    notification: boolean;
    sound: boolean;
  };
}

interface BreakWindowEventMessage {
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

const store = new Store({
  configName: 'preferences',
  defaults: defaultPreferences
});

const loginSettings = {
  openAtLogin: store.get('startAtLogin'),
  openAsHidden: true,
};

let tray = null;
let mainWindow = null;
let breakWindows = [];
let reminderTimer = null;
let breakTimer = null;
let notificationTimer = null;

app.dock.hide();

app.commandLine.appendSwitch(
  'autoplay-policy',
  'no-user-gesture-required'
);

app.setLoginItemSettings(loginSettings);

app.on('ready', () => {
  createTray();
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createTray();
    createWindow();
  }
});

const createTray = () => {
  tray = new Tray(path.resolve(__dirname, './images/tray.png'));
  tray.on('right-click', toggleWindow);
  tray.on('double-click', toggleWindow);
  tray.on('click', toggleWindow);
};

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 300,
    height: 500,
    acceptFirstMouse: true,
    show: false,
    movable: false,
    frame: false,
    webPreferences: {
      backgroundThrottling: false,
      nodeIntegration: true
    }
  });

  mainWindow.loadURL(`${renderPath}?window=main`);

  ipcMain.on(IPC_EVENT.PREFERENCES, (event: Electron.IpcMessageEvent) => {
    event.returnValue = store.all();
  });

  ipcMain.on(IPC_EVENT.MAIN_WINDOW, (event: Electron.IpcMessageEvent) => {
    event.returnValue = mainWindow.id;
  });

  ipcMain.on(IPC_EVENT.REMINDER_INTERVAL, (event: Electron.IpcMessageEvent, ms: number) => {
    store.set('reminderInterval', ms);
    event.sender.send(IPC_EVENT.REMINDER_INTERVAL, ms);
  });

  ipcMain.on(IPC_EVENT.BREAK_DURATION, (event: Electron.IpcMessageEvent, ms: number) => {
    store.set('breakDuration', ms);
    event.sender.send(IPC_EVENT.BREAK_DURATION, ms);
  });

  ipcMain.on(IPC_EVENT.OPTION, (event: Electron.IpcMessageEvent, option: Preferences) => {
    if (option.hasOwnProperty('startAtLogin')) {
      app.setLoginItemSettings({
        ...loginSettings,
        openAtLogin: option['startAtLogin']
      });
    }

    const options = {
      ...store.get('options'),
      ...option,
    };

    store.set('options', options);
    event.sender.send(IPC_EVENT.OPTION, options);
  });

  ipcMain.on(IPC_EVENT.BREAK_WINDOW, (event: Electron.IpcMessageEvent, data: BreakWindowEventMessage) => {
    if (data.status === 'open') {
      clearTimeout(reminderTimer);
      clearTimeout(notificationTimer);

      notificationTimer = setTimeout(() => {
        event.sender.send(IPC_EVENT.NOTIFICATION, {
          title: 'Preparing break ...',
          options: {
            body: 'Break will commence in 60 seconds.',
            silent: !store.get('options').sound
          }
        });
      }, data.delay - MILLISECOND.MIN);

      reminderTimer = setTimeout(() => {
        createBreakWindows();

        breakWindows.forEach((window) => {
          window.on('closed', () => {
            const windows = BrowserWindow.getAllWindows()
              .filter(window => window.id !== mainWindow.id);

            if (windows.length) return;

            breakWindows = [];
            clearTimeout(breakTimer);

            event.sender.send(
              IPC_EVENT.BREAK_WINDOW,
              { status: 'close' }
            );

          });
        });

        event.sender.send(IPC_EVENT.BREAK_WINDOW, { status: 'open' });
      }, data.delay);
    }

    if (data.status === 'close') {
      clearTimeout(breakTimer);

      breakTimer = setTimeout(() => {
        breakWindows.forEach(window => window.close());
      }, data.delay);
    }

    if (data.status === 'pause') {
      clearTimeout(reminderTimer);
    }

    if (data.status === 'skip') {
      BrowserWindow.getAllWindows()
        .filter(({ id }) => id !== mainWindow.id)
        .forEach(window => window.close());
    }
  });

  ipcMain.on('quit', app.quit);
  mainWindow.on('closed', app.quit);
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

const createBreakWindows = () => {
  const { screen } = require('electron');

  for (const { size, bounds } of screen.getAllDisplays()) {
    const windowName = !breakWindows.length ? 'break' : 'overlay';
    const window = new BrowserWindow({
      resizable: false,
      show: false,
      ...size,
      opacity: 0.96,
      x: bounds.x,
      y: bounds.y,
      backgroundColor: '#939393',
      frame: false,
      webPreferences: {
        nodeIntegration: true
      }
    });

    window.loadURL(`${renderPath}?window=${windowName}`);
    window.once('ready-to-show', window.show);
    breakWindows.push(window);
  }
};