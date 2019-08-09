import { resolve } from 'path';
import { app, ipcMain, BrowserWindow } from 'electron';
import { parseFile } from 'music-metadata';
import { IPC_EVENT } from '../lib/enums';
import { store, Preferences } from './store';
import shortcuts from '../lib/shortcuts';

import Tray from './Tray';
import Blocker, { BLOCKER_STATUS } from './Blocker';
import PowerMonitor from '../lib/PowerMonitor';

export default function initializeApp() {
    const tray = new Tray();
    const main = new BrowserWindow({
        width: 300,
        height: 450,
        acceptFirstMouse: true,
        show: false,
        movable: false,
        frame: false,
        webPreferences: {
            devTools: process.env.NODE_ENV === 'development',
            nodeIntegration: true,
            autoplayPolicy: 'no-user-gesture-required'
        }
    });

    main.loadURL(`file://${__dirname}/window.html?window=main`);
    main.on('closed', app.quit);
    tray.attachDisplayWindow(main);

    attachIpcEvents();
    attachBlockerEvents(main.webContents);
    attachIpcPowerEvents(main.webContents);
}

function attachIpcEvents() {
    ipcMain.on(
        IPC_EVENT.GET_PREFERENCES,
        (event: Electron.IpcMessageEvent) => {
            event.returnValue = store.load();
        }
    );

    ipcMain.on(
        IPC_EVENT.SET_PREFERENCES,
        (event: Electron.IpcMessageEvent, preferences: Preferences) => {
            store.save(preferences);
        }
    );

    ipcMain.on(
        IPC_EVENT.GET_ALARM_INFO,
        async (event: Electron.IpcMessageEvent) => {
            const { format } = await parseFile(resolve(__dirname, '../assets/audio/alarm.mp3'));
            event.returnValue = format;
        }
    );

    ipcMain.on(IPC_EVENT.QUIT, app.quit);
}

function attachBlockerEvents(webContents: Electron.webContents) {
    const blocker = new Blocker();

    blocker.onOpen(() => {
        shortcuts.start();
        webContents.send(IPC_EVENT.BLOCKER, BLOCKER_STATUS.OPEN);
    });

    blocker.onClose(() => {
        shortcuts.stop();
        webContents.send(IPC_EVENT.BLOCKER, BLOCKER_STATUS.CLOSE);
    });
}

function attachIpcPowerEvents(webContents: Electron.webContents) {
    const power = new PowerMonitor();

    power.on(() => webContents.send(IPC_EVENT.POWER_ON));
    power.off(() => webContents.send(IPC_EVENT.POWER_OFF));
}
