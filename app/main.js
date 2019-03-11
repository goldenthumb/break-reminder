const { app, BrowserWindow, Tray, ipcMain } = require('electron');
const path = require('path');

const renderPath = `file://${__dirname}/index.html`;
let mainWindow = null;
let tray = null;

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

  ipcMain.on('requestInitInfo', (event) => {
    event.sender.send('initInfo', { renderPath })
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