import React from 'react';

import { ipcRenderer } from 'electron';
import { IPC_EVENT } from '../../../lib/enums';
import { BLOCKER_STATUS } from '../../../main/Blocker';

import Button from '../Button';

const css = require('./Skip.scss');

export default function Skip() {
    return (
        <div className={css.wrap}>
            <Button
                theme="skip"
                action={() => {
                    ipcRenderer.send(
                        IPC_EVENT.BLOCKER,
                        BLOCKER_STATUS.CLOSE,
                    );
                }}
            >
                skip
            </Button>
        </div>
    );
}
