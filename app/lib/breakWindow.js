import { remote, ipcRenderer } from 'electron';

const { BrowserWindow, screen } = remote;

const BREAK_WINDOW_STATUS = {
  OPEN: 'open',
  CLOSE: 'close'
};

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

    for (const { id, size, bounds } of screen.getAllDisplays()) {
      const window = new BrowserWindow({
        resizable: false,
        show: false,
        ...size,
        opacity: 0.95,
        x: bounds.x,
        y: bounds.y,
        backgroundColor: '#505050',
        frame: false
      });

      // TODO: add kiosk

      window.loadURL(this._loadUrl);
      window.once('ready-to-show', window.show);

      if (this._isEmpty()) {
        window.on('closed', () => {
          this._windows = {};
          ipcRenderer.send('breakWindow', { status: BREAK_WINDOW_STATUS.CLOSE });
        });
      }

      this._windows[id] = { id, window };
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
export { BREAK_WINDOW_STATUS };