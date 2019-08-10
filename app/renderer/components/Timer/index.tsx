import React, { useEffect, useContext } from 'react';
const css = require('./Timer.scss');

import { ipcRenderer } from 'electron';
import { IoIosPlay, IoIosPause } from 'react-icons/io';
import { IPC_EVENT, MILLISECOND } from '../../../lib/enums';

import { Context } from '../../contexts';
import useTimer from '../../hooks/useTimer';

import Button from '../Button';
import TimeBoard from '../TimeBoard';

export default function Timer() {
    const { state: { reminderInterval, isWorkingMode }, services: { blockerOpenScheduler } } = useContext(Context);
    const { isPlay, leftTime, play, pause, reset, toggle } = useTimer({
        time: reminderInterval,
        interval: MILLISECOND.SEC
    });

    useEffect(() => {
        ipcRenderer.on(IPC_EVENT.POWER_ON, play);
        ipcRenderer.on(IPC_EVENT.POWER_OFF, pause);
        document.addEventListener('visibilitychange', visibilityListener);

        return () => {
            ipcRenderer.removeListener(IPC_EVENT.POWER_ON, play);
            ipcRenderer.removeListener(IPC_EVENT.POWER_OFF, pause);
            document.removeEventListener('visibilitychange', visibilityListener);
        };

        function visibilityListener() {
            if (document.visibilityState === 'visible') {
                reset(blockerOpenScheduler.getLeftDuration());
            }
        }
    }, []);

    useEffect(() => {
        if (isWorkingMode) {
            blockerOpenScheduler.setDuration(reminderInterval);
            reset(reminderInterval);
        }

        return () => blockerOpenScheduler.clearDuration();
    }, [isWorkingMode, reminderInterval]);

    useEffect(() => {
        if (!isPlay) {
            blockerOpenScheduler.pause();
        } else {
            blockerOpenScheduler.resume(leftTime);
        }
    }, [isPlay, leftTime]);

    return <>
        <TimeBoard time={leftTime} />
        <div className={css.pauseBtnWrap}>
            <Button
                theme='round-red'
                action={() => toggle()}
                disabled={!isWorkingMode}
                children={isPlay ? <IoIosPause /> : <IoIosPlay />}
            />
        </div>
    </>;
}
