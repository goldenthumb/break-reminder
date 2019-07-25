import { resolve } from 'path';
import { app, ipcMain, BrowserWindow } from 'electron';
import { parseFile } from 'music-metadata';
import { IPC_EVENT } from '../lib/enums';
import { store, Preferences } from './store';
import { setAutoLaunch } from './autoLaunch';
import { setShortcuts } from '../lib/shortcuts';

import Tray from './Tray';
import Blocker, { BLOCKER_STATUS } from './Blocker';
import PowerMonitor from '../lib/PowerMonitor';

export default class MainApp {
  readonly tray: Tray;
  readonly window: Electron.BrowserWindow;
  readonly blocker = new Blocker();
  readonly powerMonitor = new PowerMonitor();

  constructor() {
    this.window = createWindow();
    this.window.loadURL(`file://${__dirname}/window.html?window=main`);
    this.window.on('closed', app.quit);

    this.tray = new Tray();
    this.tray.attachDisplayWindow(this.window);

    this.powerMonitor.on(() => this.window.webContents.send(IPC_EVENT.ACTIVE_POWER, true));
    this.powerMonitor.off(() => this.window.webContents.send(IPC_EVENT.ACTIVE_POWER, false));

    this._attachIpcEvents();
    this._attachBlockerEvents();

    initializeApp();
  }

  private _attachIpcEvents() {
    ipcMain.on(
      IPC_EVENT.GET_PREFERENCES,
      (event: Electron.IpcMessageEvent) => {
        event.returnValue = store.load();
      }
    );

    ipcMain.on(
      IPC_EVENT.SET_PREFERENCES,
      (event: Electron.IpcMessageEvent, preferences: Preferences) => {
        store.save(preferences);
      }
    );

    ipcMain.on(
      IPC_EVENT.GET_Alarm_INFO,
      async (event: Electron.IpcMessageEvent) => {
        const { format } = await parseFile(resolve(__dirname, '../assets/audio/alarm.mp3'));
        event.returnValue = format;
      }
    );

    ipcMain.on(IPC_EVENT.QUIT, app.quit);
  }

  private _attachBlockerEvents() {
    this.blocker.onOpen(() => {
      this.window.webContents.send(IPC_EVENT.BLOCKER, BLOCKER_STATUS.OPEN);
    });

    this.blocker.onClose(() => {
      this.window.webContents.send(IPC_EVENT.BLOCKER, BLOCKER_STATUS.CLOSE);
    });
  }
}

function createWindow() {
  return new BrowserWindow({
    width: 300,
    height: 500,
    acceptFirstMouse: true,
    show: false,
    movable: false,
    frame: false,
    webPreferences: {
      devTools: process.env.NODE_ENV === 'development',
      nodeIntegration: true,
      autoplayPolicy: 'no-user-gesture-required'
    }
  });
}

function initializeApp() {
  if (app.dock) {
    app.dock.hide();
  }

  setShortcuts();
  setAutoLaunch();
}
