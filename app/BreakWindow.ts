import { BrowserWindow } from 'electron';

export interface BreakWindowEventMessage {
  status: string;
  delay: number;
}

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
        nodeIntegration: true
      }
    });

    this.loadURL(loadURL);
    this.once('ready-to-show', this.show);
  }
}

export default BreakWindow;