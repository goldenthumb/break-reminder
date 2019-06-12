import { resolve } from 'path';
import { app, screen, BrowserWindow, ipcMain, Tray } from 'electron';
import { IPC_EVENT, MILLISECOND } from '../lib/enums';
import { store, Options } from '../store';
import BreakWindow from './BreakWindow';

export interface BreakWindowMessage {
  status: string;
  delay: number;
}

export interface Notification {
  title: string;
  options: NotificationOptions;
}

interface NotificationOptions {
  body: string;
  silent: boolean;
}

class MainWindow extends BrowserWindow {
  private _reminderTimer: NodeJS.Timeout | null = null;
  private _breakTimer: NodeJS.Timeout | null = null;
  private _notificationTimer: NodeJS.Timeout | null = null;
  private _tray: Electron.Tray = new Tray(resolve(__dirname, '../assets/images/tray.png'));
  private _breakWindows: Electron.BrowserWindow[] = [];

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

    ipcMain.on(IPC_EVENT.BREAK_WINDOW, (event: Electron.IpcMessageEvent, data: BreakWindowMessage) => {
      if (data.status === 'open') {
        if (this._reminderTimer) {
          global.clearTimeout(this._reminderTimer);
        }

        if (this._notificationTimer) {
          global.clearTimeout(this._notificationTimer);
        }

        if (data.delay - MILLISECOND.MIN > 0) {
          const options = store.get('options');

          if (!options.notification) return;

          const notification: Notification = {
            title: 'Preparing break ...',
            options: {
              body: 'Break will commence in 60 seconds.',
              silent: !options.sound
            }
          };

          this._notificationTimer = global.setTimeout(() => {
            event.sender.send(IPC_EVENT.NOTIFICATION, notification);
          }, data.delay - MILLISECOND.MIN);
        }

        this._reminderTimer = global.setTimeout(() => {
          this._createBreakWindows();

          for (const browserWindow of this._breakWindows) {
            browserWindow.on('closed', () => {
              this._breakWindows.pop();

              if (this._breakWindows.length) return;

              if (this._breakTimer) {
                global.clearTimeout(this._breakTimer);
              }

              event.sender.send(IPC_EVENT.BREAK_WINDOW, {status: 'close'});
            });
          }

          event.sender.send(IPC_EVENT.BREAK_WINDOW, {status: 'open'});
        }, data.delay);
      }

      if (data.status === 'close') {
        if (this._breakTimer) {
          global.clearTimeout(this._breakTimer);
        }

        this._breakTimer = global.setTimeout(this._closeBreakWindows, data.delay);
      }

      if (data.status === 'pause') {
        if (this._reminderTimer) {
          global.clearTimeout(this._reminderTimer);
        }
      }

      if (data.status === 'skip') {
        this._closeBreakWindows();
      }
    });

    ipcMain.on('quit', app.quit);
  }

  private _createBreakWindows() {
    for (const display of screen.getAllDisplays()) {
      const windowName: string = !this._breakWindows.length ? 'break' : 'overlay';
      const loadURL: string = `file://${__dirname}/window.html?window=${windowName}`;
      const window = new BreakWindow(loadURL, display);

      this._breakWindows.push(window);
    }
  }

  private _closeBreakWindows = () => {
    for (const browserWindow of this._breakWindows) {
      browserWindow.close();
    }
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
