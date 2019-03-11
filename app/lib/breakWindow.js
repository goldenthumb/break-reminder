import { remote, ipcRenderer } from 'electron';

const { BrowserWindow, screen } = remote;

class BreakWindow {
  constructor() {
    this._windows = {};
  }

  open({ isAll = true } = {}) {
    if (!this._isEmpty()) return;

    ipcRenderer.send('requestRenderPath');

    ipcRenderer.once('renderPath', (_, renderPath) => {
      for (const { id, size } of screen.getAllDisplays()) {
        const window = new BrowserWindow({
          resizable: false,
          show: false,
          ...size,
          opacity: 0.9,
          backgroundColor: '#505050'
        });

        window.loadURL(`${renderPath}?window=break`);
        window.once('ready-to-show', window.show);
        this._windows[id] = { id, window };

        if (!isAll) return;
      }
    });
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