import { BrowserWindow } from 'electron';

class BreakWindow extends BrowserWindow {
  constructor(loadURL: string, display: Electron.Display) {
    super({
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

    this.loadURL(loadURL);
    this.once('ready-to-show', this.show);
  }
}

export default BreakWindow;