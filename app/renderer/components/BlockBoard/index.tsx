import React, { useEffect } from 'react';
import { ipcRenderer } from 'electron';

import { IPC_EVENT } from '../../../lib/enums';
import { BLOCKER_STATUS } from '../../../main/Blocker';
import useTimer from '../../hooks/useTimer';
import Audio from '../Audio';
import BlockTitle from '../BlockTitle';
import Progress from '../Progress';
import Skip from '../Skip';

const css = require('./BlockBoard.scss');

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
