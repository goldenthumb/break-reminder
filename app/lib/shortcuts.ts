import { globalShortcut } from 'electron';

const shortcuts = {
    start() {
        globalShortcut.unregisterAll();

        if (process.env.NODE_ENV !== 'development') {
            globalShortcut.register('CommandOrControl+R', () => false);
            globalShortcut.register('CommandOrControl+Shift+R', () => false);
            globalShortcut.register('F5', () => false);
        }
    },
    stop() {
        globalShortcut.unregisterAll();
    }
};

export default shortcuts;
