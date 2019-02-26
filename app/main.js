const { app, BrowserWindow } = require('electron');

let mainWindow = null;

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')();
}

app.on('ready', async () => {
  mainWindow = new BrowserWindow({
    show: false,
    width: 1000,
    height: 800
  });

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }
});