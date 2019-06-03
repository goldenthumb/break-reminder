"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = require("path");
const Store_1 = __importDefault(require("./Store"));
const MainWindow_1 = __importDefault(require("./MainWindow"));
const defaultPreferences = {
    reminderInterval: 30 * 60 * 1000,
    breakDuration: 20 * 1000,
    options: {
        startAtLogin: false,
        notification: true,
        sound: true
    }
};
exports.RENDER_PATH = `file://${__dirname}/index.html`;
exports.store = new Store_1.default({
    configName: 'preferences',
    defaults: defaultPreferences
});
exports.loginSettings = {
    openAtLogin: exports.store.get('options').startAtLogin,
    openAsHidden: true
};
let tray;
let mainWindow;
electron_1.app.dock.hide();
electron_1.app.setLoginItemSettings(exports.loginSettings);
electron_1.app.on('ready', () => {
    createTray();
    createMainWindow();
});
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', () => {
    if (mainWindow === null) {
        createTray();
        createMainWindow();
    }
});
const createMainWindow = () => {
    mainWindow = new MainWindow_1.default();
};
const createTray = () => {
    tray = new electron_1.Tray(path_1.resolve(__dirname, './images/tray.png'));
    tray.on('right-click', toggleWindow);
    tray.on('double-click', toggleWindow);
    tray.on('click', toggleWindow);
};
const toggleWindow = () => {
    if (mainWindow.isVisible()) {
        mainWindow.hide();
    }
    else {
        const { x, y } = getMainWindowPosition();
        mainWindow.setPosition(x, y);
        mainWindow.show();
    }
};
const getMainWindowPosition = () => {
    const windowBounds = mainWindow.getBounds();
    const trayBounds = tray.getBounds();
    const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2));
    const y = Math.round(trayBounds.y + trayBounds.height + 4);
    return { x, y };
};
