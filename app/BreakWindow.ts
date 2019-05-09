import { BrowserWindow } from 'electron';

class BreakWindow extends BrowserWindow {
  constructor(renderPath, display) {
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

    this.loadURL(renderPath);
    this.once('ready-to-show', this.show);
  }
}

export default BreakWindow;