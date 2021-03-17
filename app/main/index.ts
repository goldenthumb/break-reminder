import { app } from 'electron';

import { __MACOS__ } from '../lib/platfrom';
import shortcuts from '../lib/shortcuts';
import initializeApp from './initializeApp';
import registerAutoLaunch from './registerAutoLaunch';

if (app.dock) {
    app.dock.hide();
}

app.once('ready', initializeApp);

app.on('browser-window-focus', shortcuts.start);

app.on('browser-window-blur', shortcuts.stop);

app.on('activate', (event, hasVisibleWindows) => {
    if (!hasVisibleWindows) initializeApp();
});

app.on('window-all-closed', () => {
    if (!__MACOS__) app.quit();
});

app.on('before-quit', registerAutoLaunch);
