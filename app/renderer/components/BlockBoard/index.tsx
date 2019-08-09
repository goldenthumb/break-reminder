import React, { useEffect } from 'react';

const css = require('./BlockBoard.scss');
import { ipcRenderer } from 'electron';
import { IPC_EVENT } from '../../../lib/enums';
import { BLOCKER_STATUS } from '../../../main/Blocker';

import useTimer from '../../hooks/useTimer';
import BlockTitle from '../BlockTitle';
import Progress from '../Progress';
import Skip from '../Skip';
import Audio from '../Audio';

export default function BlockBoard() {
    const { breakDuration, options } = ipcRenderer.sendSync(IPC_EVENT.GET_PREFERENCES);
    const { percent } = useTimer({ time: breakDuration, interval: 100 });

    useEffect(() => {
        if (percent === 100) {
            ipcRenderer.send(IPC_EVENT.BLOCKER, BLOCKER_STATUS.CLOSE);
        }
    }, [percent]);

    return (
        <div className={css.messageWrap}>
            <div className={css.content}>
                <BlockTitle />
                <Progress percent={percent} />
                <Skip />
                {options.sound && <Audio />}
            </div>
        </div>
    );
}
