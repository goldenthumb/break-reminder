const { app, BrowserWindow, Tray, ipcMain } = require('electron');
const path = require('path');
const Store = require('./Store');

const renderPath = `file://${__dirname}/index.html`;
const { IPC_EVENT } = require('./lib/constants');

const store = new Store({
  configName: 'preferences',
  defaults: {
    reminderInterval: 30 * 60 * 1000,
    breakDuration: 20 * 1000,
    options: {
      startAtLogin: false,
      notification: true,
      sound: true,
    }
  }
});

let tray = null;
let mainWindow = null;
let breakWindows = [];
let reminderTimer = null;
let breakTimer = null;

const createWindow = () => {
  tray = new Tray(path.resolve(__dirname, './images/tray.png'));

  tray.on('click', () => {
    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      mainWindow.show();
    }
  });

  const bounds = tray.getBounds();

  mainWindow = new BrowserWindow({
    width: 300,
    height: 500,
    x: Math.round(bounds.x - ((bounds.width / 2) + 150)),
    y: bounds.y - 500 - 10,
    acceptFirstMouse: true,
    show: false,
    movable: false,
    frame: false,
  });

  mainWindow.loadURL(`${renderPath}?window=main`);

  ipcMain.on(IPC_EVENT.INITIAL_STATE, (event) => {
    event.returnValue = store.all();
  });

  ipcMain.on(IPC_EVENT.MAIN_WINDOW, (event) => {
    event.returnValue = mainWindow.id;
  });

  ipcMain.on(IPC_EVENT.REMINDER_INTERVAL, (event, ms) => {
    store.set('reminderInterval', ms);
    event.sender.send(IPC_EVENT.REMINDER_INTERVAL, ms);
  });

  ipcMain.on(IPC_EVENT.BREAK_DURATION, (event, ms) => {
    store.set('breakDuration', ms);
    event.sender.send(IPC_EVENT.BREAK_DURATION, ms);
  });

  ipcMain.on(IPC_EVENT.OPTION, (event, option) => {
    const options = {
      ...store.get('options'),
      ...option,
    };

    store.set('options', options);
    event.sender.send(IPC_EVENT.OPTION, options);
  });

  ipcMain.on(IPC_EVENT.BREAK_WINDOW, (event, data) => {
    if (data.status === 'open') {
      const { screen } = require('electron');

      clearTimeout(reminderTimer);

      reminderTimer = setTimeout(() => {
        for (const { size, bounds } of screen.getAllDisplays()) {
          const window = new BrowserWindow({
            resizable: false,
            show: false,
            ...size,
            opacity: 0.96,
            x: bounds.x,
            y: bounds.y,
            backgroundColor: '#939393',
            frame: false
          });

          window.loadURL(`${renderPath}?window=break`);
          window.once('ready-to-show', window.show);

          // TODO: 수정해야함.
          // break windows 가 전부 닫혔는지 체크하는 로직인데
          // 현재는 첫번째 window 가 닫혔는지로 판단하고 있음. 나중에 고쳐야함.
          if (!breakWindows.length) {
            window.on('closed', () => {
              clearTimeout(breakTimer);
              breakWindows = [];
              event.sender.send(IPC_EVENT.BREAK_WINDOW, {
                status: 'close'
              });
            });
          }

          breakWindows.push(window);
        }

        event.sender.send(IPC_EVENT.BREAK_WINDOW, {
          status: 'open'
        });
      }, data.delay);
    }

    if (data.status === 'close') {
      clearTimeout(breakTimer);

      breakTimer = setTimeout(() => {
        breakWindows.map(window => window.close());
      }, data.delay)
    }

    if (data.status === 'pause') {
      clearTimeout(reminderTimer);
    }
  });

  ipcMain.on('quit', () => {
    app.quit();
  });

  mainWindow.on('closed', () => {
    app.quit();
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});