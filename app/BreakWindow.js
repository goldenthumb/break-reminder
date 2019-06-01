"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
class BreakWindow extends electron_1.BrowserWindow {
    constructor(loadURL, display) {
        super(Object.assign({ resizable: false, show: false }, display.size, { opacity: 0.96, x: display.bounds.x, y: display.bounds.y, backgroundColor: '#939393', frame: false, webPreferences: {
                nodeIntegration: true,
                autoplayPolicy: 'no-user-gesture-required'
            } }));
        this.loadURL(loadURL);
        this.once('ready-to-show', this.show);
    }
}
exports.default = BreakWindow;
