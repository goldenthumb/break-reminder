import { BrowserWindow, ipcMain, screen } from 'electron';
import { EventEmitter } from 'events';
import { IPC_EVENT } from '../lib/enums';
import { Listener } from '../lib/types';

export enum BLOCKER_STATUS {
  OPEN = 'open',
  CLOSE = 'close',
}

export default class Blocker {
  private _emitter: EventEmitter;
  private _windows: Electron.BrowserWindow[] = [];
  private _status: BLOCKER_STATUS = BLOCKER_STATUS.CLOSE;

  constructor() {
    this._emitter = new EventEmitter();
    this._attachEvent();
  }

  onOpen(fn: Listener) {
    this._emitter.on(BLOCKER_STATUS.OPEN, fn);
  }

  onClose(fn: Listener) {
    this._emitter.on(BLOCKER_STATUS.CLOSE, fn);
  }

  private _attachEvent() {
    ipcMain.on(
      IPC_EVENT.BLOCKER,
      (event: Electron.IpcMessageEvent, status: BLOCKER_STATUS) => {
        switch (status) {
          case BLOCKER_STATUS.OPEN: this._open(); break;
          case BLOCKER_STATUS.CLOSE: this._close(); break;
        }
      }
    );
  }

  private async _open() {
    for (const display of screen.getAllDisplays()) {
      const windowName = !this._windows.length ? 'block' : 'overlay';
      this._windows.push(await createBlockWindow(windowName, display));
    }

    this._emitter.emit(this._status = BLOCKER_STATUS.OPEN);
  }

  private _close() {
    if (this._status === BLOCKER_STATUS.CLOSE) return;

    for (const window of this._windows) {
      window && window.close();
    }

    this._windows = [];
    this._emitter.emit(this._status = BLOCKER_STATUS.CLOSE);
  }
}

const createBlockWindow = (windowName: string, display: Electron.Display) => {
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
      devTools: process.env.NODE_ENV === 'development',
      nodeIntegration: true,
      autoplayPolicy: 'no-user-gesture-required'
    }
  });

  window.loadURL(`file://${__dirname}/window.html?window=${windowName}`);

  return new Promise<BrowserWindow>((resolve) => {
    window.on('ready-to-show', () => {
      window.show();
      resolve(window);
    });
  });
};
