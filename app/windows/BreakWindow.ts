import { BrowserWindow, screen } from 'electron';
import { EventEmitter } from 'events';

// TODO: emit type...
export enum BREAK_WINDOW {
  OPEN = 'open',
  CLOSE = 'close',
  SKIP = 'skip',
}

class BreakWindow extends EventEmitter {
  private _windows: Electron.BrowserWindow[] = [];

  open() {
    for (const display of screen.getAllDisplays()) {
      const windowName: string = !this._windows.length ? 'break' : 'overlay';
      const loadURL: string = `file://${__dirname}/window.html?window=${windowName}`;

      this._windows.push(BreakWindow._createWindow(loadURL, display));
    }

    this.emit(BREAK_WINDOW.OPEN);
  }

  async close() {
    for (const window of this._windows) {
      window.close();
      window.on('closed', () => {
        this._windows.pop();

        if (this._windows.length) return;

        this.emit(BREAK_WINDOW.CLOSE);
      });
    }
  }

  private static _createWindow(loadURL: string, display: Electron.Display) {
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

    window.loadURL(loadURL);
    window.once('ready-to-show', window.show);

    return window;
  }
}

export default BreakWindow;
