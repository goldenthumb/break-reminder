import { globalShortcut } from 'electron';

export function start() {
  globalShortcut.unregisterAll();

  if (process.env.NODE_ENV !== 'development') {
    globalShortcut.register('CommandOrControl+R', () => false);
    globalShortcut.register('CommandOrControl+Shift+R', () => false);
    globalShortcut.register('F5', () => false);
  }
}

export function stop() {
  globalShortcut.unregisterAll();
}
