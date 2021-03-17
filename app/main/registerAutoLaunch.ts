import { app } from 'electron';
import { basename } from 'path';

import { store } from './store';

export default function registerAutoLaunch() {
    app.setLoginItemSettings({
        openAsHidden: true,
        openAtLogin: isOpenAtLoginOption(),
        path: app.getPath('exe'),
        args: [
            '--processStart', `"${basename(process.execPath)}"`,
            '--process-start-args', '"--hidden"',
        ],
    });
}

function isOpenAtLoginOption() {
    return (
        process.env.NODE_ENV !== 'development'
        && store.get('options').startAtLogin
    );
}
