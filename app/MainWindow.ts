import { app, BrowserWindow, ipcMain } from 'electron';
import { IPC_EVENT, MILLISECOND } from './lib/constants';
import { renderPath, Preferences, store, loginSettings, BreakWindowEventMessage } from './main';
import BreakWindow from './BreakWindow';

class MainWindow extends BrowserWindow {
  private _reminderTimer: NodeJS.Timer;
  private _breakTimer: NodeJS.Timer;
  private _notificationTimer: NodeJS.Timer;
  private _breakWindows: [Electron.BrowserWindow?];

  constructor() {
    super({
      width: 300,
      height: 500,
      acceptFirstMouse: true,
      show: false,
      movable: false,
      frame: false,
      webPreferences: {
        backgroundThrottling: false,
        nodeIntegration: true
      }
    });

    this._breakWindows = [];
    this.loadURL(`${renderPath}?window=main`);

    ipcMain.on(IPC_EVENT.PREFERENCES, (event: Electron.IpcMessageEvent) => {
      event.returnValue = store.all();
    });

    ipcMain.on(IPC_EVENT.MAIN_WINDOW, (event: Electron.IpcMessageEvent) => {
      event.returnValue = this.id;
    });

    ipcMain.on(IPC_EVENT.REMINDER_INTERVAL, (event: Electron.IpcMessageEvent, ms: number) => {
      store.set('reminderInterval', ms);
      event.sender.send(IPC_EVENT.REMINDER_INTERVAL, ms);
    });

    ipcMain.on(IPC_EVENT.BREAK_DURATION, (event: Electron.IpcMessageEvent, ms: number) => {
      store.set('breakDuration', ms);
      event.sender.send(IPC_EVENT.BREAK_DURATION, ms);
    });

    ipcMain.on(IPC_EVENT.OPTION, (event: Electron.IpcMessageEvent, option: Preferences) => {
      if (option.hasOwnProperty('startAtLogin')) {
        app.setLoginItemSettings({
          ...loginSettings,
          openAtLogin: option['startAtLogin']
        });
      }

      const options = {
        ...store.get('options'),
        ...option,
      };

      store.set('options', options);
      event.sender.send(IPC_EVENT.OPTION, options);
    });

    ipcMain.on(IPC_EVENT.BREAK_WINDOW, (event: Electron.IpcMessageEvent, data: BreakWindowEventMessage) => {
      if (data.status === 'open') {
        clearTimeout(this._reminderTimer);
        clearTimeout(this._notificationTimer);

        if (data.delay - MILLISECOND.MIN > 0) {
          this._notificationTimer = global.setTimeout(() => {
            event.sender.send(IPC_EVENT.NOTIFICATION, {
              title: 'Preparing break ...',
              options: {
                body: 'Break will commence in 60 seconds.',
                silent: !store.get('options').sound
              }
            });
          }, data.delay - MILLISECOND.MIN);
        }

        this._reminderTimer = global.setTimeout(() => {
          this.createBreakWindows();

          this._breakWindows.forEach((browserWindow: Electron.BrowserWindow) => {
            browserWindow.on('closed', () => {
              this._breakWindows.pop();

              if (this._breakWindows.length) return;

              this._breakWindows = [];

              clearTimeout(this._breakTimer);

              event.sender.send(
                IPC_EVENT.BREAK_WINDOW,
                { status: 'close' }
              );
            });
          });

          event.sender.send(IPC_EVENT.BREAK_WINDOW, { status: 'open' });
        }, data.delay);
      }

      if (data.status === 'close') {
        clearTimeout(this._breakTimer);

        this._breakTimer = global.setTimeout(() => {
          this._breakWindows.forEach((browserWindow: Electron.BrowserWindow) => browserWindow.close());
        }, data.delay);
      }

      if (data.status === 'pause') {
        clearTimeout(this._reminderTimer);
      }

      if (data.status === 'skip') {
        this._breakWindows.forEach(browserWindow => browserWindow.close());
      }
    });

    ipcMain.on('quit', app.quit);
    this.on('closed', app.quit);
  }

  createBreakWindows() {
    const { screen } = require('electron');

    for (const display of screen.getAllDisplays()) {
      const windowName: string = !this._breakWindows.length ? 'break' : 'overlay';
      const window: Electron.BrowserWindow = new BreakWindow(`${renderPath}?window=${windowName}`, display);

      this._breakWindows.push(window);
    }
  }
}

export default MainWindow;