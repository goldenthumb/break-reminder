import { remote } from 'electron';

const { BrowserWindow, screen } = remote;

class BreakWindow {
  constructor() {
    this._windows = {};
  }

  open({ loadUrl, isAll = true }) {
    for (const { id, size } of screen.getAllDisplays()) {
      const window = new BrowserWindow({
        resizable: false,
        show: false,
        ...size
      });

      window.loadURL(loadUrl);
      window.once('ready-to-show', window.show);
      this._windows[id] = { id, window };

      if (!isAll) return;
    }
  }

  close() {
    Object.values(this._windows).map(({ window }) => window.close());
    this._windows = {};
  }
}

const breakWindow = new BreakWindow();
export default breakWindow;