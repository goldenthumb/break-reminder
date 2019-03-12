const { app, BrowserWindow, Tray, ipcMain } = require('electron');
const path = require('path');
const Store = require('./Store');

let mainWindow = null;
let tray = null;

const renderPath = `file://${__dirname}/index.html`;

const store = new Store({
  configName: 'preferences',
  defaults: {
    breakInterval: 20 * 60 * 1000,
    breakDuration: 20 * 1000,
    config: {
      startAtLogin: false,
      notification: true,
      sound: true,
    }
  }
});

const createWindow = () => {
  tray = new Tray(path.resolve(__dirname, '../resources/tray.png'));

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
      breakInterval: store.get('breakInterval'),
      breakDuration: store.get('breakDuration'),
      config: store.get('config'),
    }
  });

  ipcMain.on('getRenderPath', (event) => {
    event.returnValue = renderPath;
  });

  ipcMain.on('setConfig', (event, config) => {
    store.set('config', {
      ...store.get('config'),
      ...config,
    });

    event.sender.send('config', { ...store.get('config') })
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