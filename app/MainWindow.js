"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const constants_1 = require("./lib/constants");
const main_1 = require("./main");
const BreakWindow_1 = __importDefault(require("./BreakWindow"));
class MainWindow extends electron_1.BrowserWindow {
    constructor() {
        super({
            width: 300,
            height: 500,
            acceptFirstMouse: true,
            show: false,
            movable: false,
            frame: false,
            webPreferences: {
                backgroundThrottling: false,
                nodeIntegration: true,
                autoplayPolicy: 'no-user-gesture-required'
            }
        });
        this._reminderTimer = null;
        this._breakTimer = null;
        this._notificationTimer = null;
        this._breakWindows = [];
        this._closeBreakWindows = () => {
            for (const browserWindow of this._breakWindows) {
                browserWindow.close();
            }
        };
        this.loadURL(`${main_1.RENDER_PATH}?window=main`);
        electron_1.ipcMain.on(constants_1.IPC_EVENT.PREFERENCES, (event) => {
            event.returnValue = main_1.store.all();
        });
        electron_1.ipcMain.on(constants_1.IPC_EVENT.MAIN_WINDOW, (event) => {
            event.returnValue = this.id;
        });
        electron_1.ipcMain.on(constants_1.IPC_EVENT.REMINDER_INTERVAL, (event, ms) => {
            main_1.store.set('reminderInterval', ms);
            event.sender.send(constants_1.IPC_EVENT.REMINDER_INTERVAL, ms);
        });
        electron_1.ipcMain.on(constants_1.IPC_EVENT.BREAK_DURATION, (event, ms) => {
            main_1.store.set('breakDuration', ms);
            event.sender.send(constants_1.IPC_EVENT.BREAK_DURATION, ms);
        });
        electron_1.ipcMain.on(constants_1.IPC_EVENT.OPTION, (event, options) => {
            if (options.hasOwnProperty('startAtLogin')) {
                electron_1.app.setLoginItemSettings(Object.assign({}, main_1.loginSettings, { openAtLogin: options.startAtLogin }));
            }
            options = Object.assign({}, main_1.store.get('options'), options);
            main_1.store.set('options', options);
            event.sender.send(constants_1.IPC_EVENT.OPTION, options);
        });
        electron_1.ipcMain.on(constants_1.IPC_EVENT.BREAK_WINDOW, (event, data) => {
            if (data.status === 'open') {
                if (this._reminderTimer) {
                    global.clearTimeout(this._reminderTimer);
                }
                if (this._notificationTimer) {
                    global.clearTimeout(this._notificationTimer);
                }
                if (data.delay - constants_1.MILLISECOND.MIN > 0) {
                    const options = main_1.store.get('options');
                    if (!options.notification)
                        return;
                    const notification = {
                        title: 'Preparing break ...',
                        options: {
                            body: 'Break will commence in 60 seconds.',
                            silent: !options.sound
                        }
                    };
                    this._notificationTimer = global.setTimeout(() => {
                        event.sender.send(constants_1.IPC_EVENT.NOTIFICATION, notification);
                    }, data.delay - constants_1.MILLISECOND.MIN);
                }
                this._reminderTimer = global.setTimeout(() => {
                    this._createBreakWindows();
                    for (const browserWindow of this._breakWindows) {
                        browserWindow.on('closed', () => {
                            this._breakWindows.pop();
                            if (this._breakWindows.length)
                                return;
                            if (this._breakTimer) {
                                global.clearTimeout(this._breakTimer);
                            }
                            event.sender.send(constants_1.IPC_EVENT.BREAK_WINDOW, { status: 'close' });
                        });
                    }
                    event.sender.send(constants_1.IPC_EVENT.BREAK_WINDOW, { status: 'open' });
                }, data.delay);
            }
            if (data.status === 'close') {
                if (this._breakTimer) {
                    global.clearTimeout(this._breakTimer);
                }
                this._breakTimer = global.setTimeout(this._closeBreakWindows, data.delay);
            }
            if (data.status === 'pause') {
                if (this._reminderTimer) {
                    global.clearTimeout(this._reminderTimer);
                }
            }
            if (data.status === 'skip') {
                this._closeBreakWindows();
            }
        });
        electron_1.ipcMain.on('quit', electron_1.app.quit);
        this.on('closed', electron_1.app.quit);
    }
    _createBreakWindows() {
        for (const display of electron_1.screen.getAllDisplays()) {
            const windowName = !this._breakWindows.length ? 'break' : 'overlay';
            const loadURL = `${main_1.RENDER_PATH}?window=${windowName}`;
            const window = new BreakWindow_1.default(loadURL, display);
            this._breakWindows.push(window);
        }
    }
}
exports.default = MainWindow;
