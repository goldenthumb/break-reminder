import { remote } from 'electron';

const { BrowserWindow, screen } = remote;

export const openBlockWindow = (renderPath) => {
  const nextBlockWindows = {};

  for (const { id, size } of screen.getAllDisplays()) {
    const window = new BrowserWindow({
      resizable: false,
      show: false,
      ...size
    });

    window.loadURL(`${renderPath}?page=block`);
    window.once('ready-to-show', window.show);

    nextBlockWindows[id] = { id, window };
  }

  return nextBlockWindows;
};

export const closeBlockWindow = (blockWindows) => {
  Object.values(blockWindows).map(({ window }) => window.close());
};