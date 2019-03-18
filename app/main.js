const { app, BrowserWindow, Tray, ipcMain } = require('electron');
const path = require('path');
const Store = require('./Store');

let mainWindow = null;
let tray = null;

const renderPath = `file://${__dirname}/index.html`;

const store = new Store({
  configName: 'preferences',
  defaults: {
    reminderInterval: 20 * 60 * 1000,
    breakDuration: 20 * 1000,
    options: {
      startAtLogin: false,
      notification: true,
      sound: true,
    }
  }
});

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
    height: 430,
    x: Math.round(bounds.x - ((bounds.width / 2) + 150)),
    y: bounds.y - 430 - 10,
    acceptFirstMouse: true,
    show: false,
    movable: false,
    frame: false,
  });

  mainWindow.loadURL(`${renderPath}?window=main`);

  ipcMain.on('getInitialState', (event) => {
    event.returnValue = {
      reminderInterval: 20 * 60 * 1000,
      breakDuration: 20 * 1000,
      options: store.get('options'),
    }
  });

  ipcMain.on('getRenderPath', (event) => {
    event.returnValue = renderPath;
  });

  ipcMain.on('setOption', (event, option) => {
    store.set('options', {
      ...store.get('options'),
      ...option,
    });

    event.sender.send('updateOptions', { ...store.get('options') })
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