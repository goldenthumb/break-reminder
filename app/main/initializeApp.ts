import { app, BrowserWindow, ipcMain } from 'electron';
import { parseFile } from 'music-metadata';
import { resolve } from 'path';

import { IPC_EVENT } from '../lib/enums';
import PowerMonitor from '../lib/PowerMonitor';
import shortcuts from '../lib/shortcuts';
import Blocker, { BLOCKER_STATUS } from './Blocker';
import { Preferences, store } from './store';
import Tray from './Tray';

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
            autoplayPolicy: 'no-user-gesture-required',
        },
    });

    main.loadURL(`file://${__dirname}/window.html?window=main`);
    main.on('closed', app.quit);
    tray.attachDisplayWindow(main);

    attachIpcEvents();
    attachBlockerEvents(main);
    attachIpcPowerEvents(main);
}

function attachIpcEvents() {
    ipcMain.on(
        IPC_EVENT.GET_PREFERENCES,
        (event: Electron.IpcMainEvent) => {
            event.returnValue = store.load();
        },
    );

    ipcMain.on(
        IPC_EVENT.SET_PREFERENCES,
        (event: Electron.IpcMainEvent, preferences: Preferences) => {
            store.save(preferences);
        },
    );

    ipcMain.on(
        IPC_EVENT.GET_ALARM_INFO,
        async (event: Electron.IpcMainEvent) => {
            const { format } = await parseFile(resolve(__dirname, '../assets/audio/alarm.mp3'));
            event.returnValue = format;
        },
    );

    ipcMain.on(IPC_EVENT.QUIT, app.quit);
}

function attachBlockerEvents(main: Electron.BrowserWindow) {
    const blocker = new Blocker();

    blocker.onOpen(() => {
        shortcuts.start();
        main.webContents.send(IPC_EVENT.BLOCKER, BLOCKER_STATUS.OPEN);
        main.hide();
    });

    blocker.onClose(() => {
        shortcuts.stop();
        main.webContents.send(IPC_EVENT.BLOCKER, BLOCKER_STATUS.CLOSE);
        main.hide();
    });
}

function attachIpcPowerEvents(main: Electron.BrowserWindow) {
    const power = new PowerMonitor();

    power.on(() => main.webContents.send(IPC_EVENT.POWER_ON));
    power.off(() => main.webContents.send(IPC_EVENT.POWER_OFF));
}
