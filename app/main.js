const { app, BrowserWindow, Tray } = require('electron');
const path = require('path');

let mainWindow = null;
let tray = null;

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')();
}

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
    width: 400,
    height: 400,
    x: Math.round(bounds.x + (bounds.width / 2) - 200),
    y: bounds.y - 400 - 10,
    acceptFirstMouse: true,
    show: false,
    movable: false,
    frame: false,
  });

  mainWindow.loadURL(`file://${__dirname}/index.html?page=main`);

  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

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