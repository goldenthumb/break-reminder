import { app, globalShortcut } from 'electron';

export function setShortcuts() {
  app.on('browser-window-focus', start);
  app.on('browser-window-blur', stop);
}

function start() {
  globalShortcut.unregisterAll();

  if (process.env.NODE_ENV !== 'development') {
    globalShortcut.register('CommandOrControl+R', () => false);
    globalShortcut.register('CommandOrControl+Shift+R', () => false);
    globalShortcut.register('F5', () => false);
  }
}

function stop() {
  globalShortcut.unregisterAll();
}
