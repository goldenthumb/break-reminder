import { remote, ipcRenderer } from 'electron';

const { BrowserWindow, screen } = remote;

class BreakWindow {
  constructor() {
    this._windows = {};
    this._loadUrl = null;
  }

  open() {
    if (!this._isEmpty()) return;

    if (!this._loadUrl) {
      const renderPath = ipcRenderer.sendSync('getRenderPath');
      this._loadUrl = `${renderPath}?window=break`;
    }

    for (const { id, size } of screen.getAllDisplays()) {
      const window = new BrowserWindow({
        resizable: false,
        show: false,
        ...size,
        opacity: 0.9,
        backgroundColor: '#505050'
      });

      this._windows[id] = { id, window };
      window.loadURL(this._loadUrl);
      window.once('ready-to-show', window.show);
    }
  }

  close() {
    if (this._isEmpty()) return;

    Object.values(this._windows).map(({ window }) => window.close());
    this._windows = {};
  }

  _isEmpty() {
    return Object.entries(this._windows).length === 0;
  }
}

const breakWindow = new BreakWindow();
export default breakWindow;