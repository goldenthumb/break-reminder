import { BrowserWindow, ipcMain, screen } from 'electron';
import { EventEmitter } from 'events';
import { IPC_EVENT } from '../lib/enums';

export enum BLOCKER_STATUS {
  OPEN = 'open',
  CLOSE = 'close',
}

type Listener = () => void;

class Blocker extends EventEmitter {
  private _windows: Electron.BrowserWindow[] = [];

  constructor() {
    super();
    this._attachEvent();
  }

  onOpen(fn: Listener) {
    this.on(BLOCKER_STATUS.OPEN, fn);
  }

  onClose(fn: Listener) {
    this.on(BLOCKER_STATUS.CLOSE, fn);
  }

  private _attachEvent() {
    ipcMain.on(IPC_EVENT.BLOCKER, (event: Electron.IpcMessageEvent, status: BLOCKER_STATUS) => {
      if (status === BLOCKER_STATUS.OPEN) {
        for (const display of screen.getAllDisplays()) {
          const windowName: string = !this._windows.length ? 'block' : 'overlay';
          this._windows.push(Blocker._createWindow(windowName, display));
        }

        this.emit(BLOCKER_STATUS.OPEN);
      }

      if (status === BLOCKER_STATUS.CLOSE) {
        if (!this._windows.length) return;

        for (const window of this._windows) {
          window.close();
        }

        this._windows = [];
        this.emit(BLOCKER_STATUS.CLOSE);
      }
    });
  }

  private static _createWindow(windowName: string, display: Electron.Display) {
    const window = new BrowserWindow({
      resizable: false,
      show: false,
      ...display.size,
      opacity: 0.96,
      x: display.bounds.x,
      y: display.bounds.y,
      backgroundColor: '#939393',
      frame: false,
      webPreferences: {
        nodeIntegration: true,
        autoplayPolicy: 'no-user-gesture-required'
      }
    });

    window.loadURL(`file://${__dirname}/window.html?window=${windowName}`);
    window.once('ready-to-show', window.show);

    return window;
  }
}

export default Blocker;
