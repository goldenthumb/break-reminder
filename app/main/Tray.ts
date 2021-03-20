import { nativeTheme, screen, systemPreferences, Tray } from 'electron';
import { resolve } from 'path';

import { __MACOS__, __WINDOW__ } from '../lib/platfrom';

export default class extends Tray {
    constructor() {
        super(getTrayIconPath());
        this._changeTheme();
    }

    attachDisplayWindow(window: Electron.BrowserWindow) {
        this.on('right-click', () => this._toggle(window));
        this.on('click', () => this._toggle(window));
    }

    private _toggle(window: Electron.BrowserWindow) {
        if (window.isVisible()) {
            window.hide();
        } else {
            const { x, y } = getAppPosition(window.getBounds(), this.getBounds());
            window.setPosition(x, y);
            window.show();
        }
    }

    private _changeTheme() {
        if (!__MACOS__) return;

        systemPreferences.subscribeNotification(
            'AppleInterfaceThemeChangedNotification',
            () => this.setImage(getTrayIconPath()),
        );
    }
}

function getTrayIconPath() {
    return resolve(
        __dirname,
        `../assets/images/tray${nativeTheme.shouldUseDarkColors || __WINDOW__ ? '-white' : ''}.png`,
    );
}

function getAppPosition(windowBounds: Electron.Rectangle, trayBounds: Electron.Rectangle) {
    const screenBounds = screen.getPrimaryDisplay().bounds;

    if (__MACOS__) {
        return {
            x: Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2)),
            y: Math.round(trayBounds.y + trayBounds.height + 4),
        };
    }

    return {
        x: Math.round(screenBounds.x + ((screenBounds.width / 2) - (windowBounds.width / 2))),
        y: Math.round(((screenBounds.height + screenBounds.y) / 2) - (windowBounds.height / 2)),
    };
}
