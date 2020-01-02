import React from 'react';

import { ipcRenderer } from 'electron';
import { IPC_EVENT } from '../../../lib/enums';

const css = require('./BlockTitle.scss');

export default function BreakTitle() {
    const { options } = ipcRenderer.sendSync(IPC_EVENT.GET_PREFERENCES);

    return <>
        <div className={css.title}>
            Time For a Break
        </div>
        {options.sound && (
            <div className={css.subTitle}>
                You'll hear a sound when done
            </div>
        )}
    </>;
}
