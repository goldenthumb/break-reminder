import { resolve } from 'path';
import { app, ipcMain, BrowserWindow, Tray } from 'electron';
import { IPC_EVENT } from '../lib/enums';
import { store, Options } from '../store';
import BreakWindow, { BREAK_WINDOW } from './BreakWindow';

const TRAY_ICON_PATH = resolve(__dirname, '../assets/images/tray.png');

class MainWindow extends BrowserWindow {
  private _tray: Electron.Tray = new Tray(TRAY_ICON_PATH);
  private _breakWindow = new BreakWindow();

  constructor() {
    super({
      width: 300,
      height: 500,
      acceptFirstMouse: true,
      show: false,
      movable: false,
      frame: false,
      webPreferences: {
        nodeIntegration: true,
        autoplayPolicy: 'no-user-gesture-required'
      }
    });

    this.loadURL(`file://${__dirname}/window.html?window=main`);
    this.on('closed', app.quit);

    this._tray.on('right-click', this._toggleWindow);
    this._tray.on('click', this._toggleWindow);

    this._handleIpcEvents();
  }

  private _handleIpcEvents() {
    ipcMain.on(IPC_EVENT.PREFERENCES, (event: Electron.IpcMessageEvent) => {
      event.returnValue = store.all();
    });

    ipcMain.on(IPC_EVENT.REMINDER_INTERVAL, (event: Electron.IpcMessageEvent, ms: number) => {
      store.set('reminderInterval', ms);
      event.sender.send(IPC_EVENT.REMINDER_INTERVAL, ms);
    });

    ipcMain.on(IPC_EVENT.BREAK_DURATION, (event: Electron.IpcMessageEvent, ms: number) => {
      store.set('breakDuration', ms);
      event.sender.send(IPC_EVENT.BREAK_DURATION, ms);
    });

    ipcMain.on(IPC_EVENT.OPTION, (event: Electron.IpcMessageEvent, options: Options) => {
      store.set('options', {
        ...store.get('options'),
        ...options,
      });

      event.sender.send(IPC_EVENT.OPTION, store.get('options'));
    });

    ipcMain.on(IPC_EVENT.BREAK_WINDOW, (event: Electron.IpcMessageEvent, status: BREAK_WINDOW) => {
      // TODO: 수정해야함
      if (status === BREAK_WINDOW.OPEN) {
        this._breakWindow.once(BREAK_WINDOW.OPEN, () => {
          event.sender.send(
            IPC_EVENT.BREAK_WINDOW,
            BREAK_WINDOW.OPEN
          );
        });

        this._breakWindow.once(BREAK_WINDOW.CLOSE, () => {
          event.sender.send(
            IPC_EVENT.BREAK_WINDOW,
            BREAK_WINDOW.CLOSE
          );
        });

        this._breakWindow.open();
      }

      if (status === BREAK_WINDOW.CLOSE) {
        this._breakWindow.close();
      }
    });

    ipcMain.on('quit', app.quit);
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

export default MainWindow;
