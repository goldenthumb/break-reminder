import { resolve } from 'path';
import { app, ipcMain, systemPreferences, BrowserWindow, Tray } from 'electron';
import { parseFile } from 'music-metadata';
import { store, Preferences } from './store';
import * as shortcuts from '../lib/shortcuts';
import { IPC_EVENT } from '../lib/enums';
import PowerMonitor from '../lib/PowerMonitor';
import Blocker, { BLOCKER_STATUS } from './Blocker';

const ASSETS_PATH = resolve(__dirname, '../assets/');

export default class MainWindow extends BrowserWindow {
  private _tray: Electron.Tray = new Tray(getTrayIconPath());
  private _blocker = new Blocker();
  private _powerMonitor = new PowerMonitor();

  constructor() {
    super({
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

    this.loadURL(`file://${__dirname}/window.html?window=main`);
    this.webContents.on('did-finish-load', shortcuts.start);
    this.on('closed', () => {
      shortcuts.stop();
      app.quit();
    });

    systemPreferences.subscribeNotification(
      'AppleInterfaceThemeChangedNotification',
      () => this._tray.setImage(getTrayIconPath())
    );

    this._powerMonitor.on(() => this.webContents.send(IPC_EVENT.POWER_MONITOR_ON));
    this._powerMonitor.off(() => this.webContents.send(IPC_EVENT.POWER_MONITOR_OFF));

    this._tray.on('right-click', this._toggleWindow);
    this._tray.on('click', this._toggleWindow);

    this._attachIpcEvents();
    this._attachBlockerEvents();
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
        const { format } = await parseFile(resolve(ASSETS_PATH, 'audio/alarm.mp3'));
        event.returnValue = format;
      }
    );

    ipcMain.on(IPC_EVENT.QUIT, app.quit);
  }

  private _attachBlockerEvents() {
    this._blocker.onOpen(() => {
      this.webContents.send(IPC_EVENT.BLOCKER, BLOCKER_STATUS.OPEN);
    });

    this._blocker.onClose(() => {
      this.webContents.send(IPC_EVENT.BLOCKER, BLOCKER_STATUS.CLOSE);
    });
  }

  private _toggleWindow = () => {
    if (this.isVisible()) {
      this.hide();
    } else {
      const { x, y } = this._getPosition();
      this.setPosition(x, y);
      this.show();
    }
  }

  private _getPosition() {
    const window = this.getBounds();
    const tray = this._tray.getBounds();
    const x = Math.round(tray.x + (tray.width / 2) - (window.width / 2));
    const y = Math.round(tray.y + tray.height + 4);

    return { x, y };
  }
}

function getTrayIconPath() {
  return resolve(
    ASSETS_PATH,
    `images/tray${systemPreferences.isDarkMode() ? '-white' : ''}.png`
  );
}
