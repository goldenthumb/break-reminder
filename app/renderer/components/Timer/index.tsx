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

    return () => {
      ipcRenderer.removeListener(IPC_EVENT.POWER_ON, play);
      ipcRenderer.removeListener(IPC_EVENT.POWER_OFF, pause);
    };
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
      blockerOpenScheduler.pause(leftTime);
    } else {
      blockerOpenScheduler.resume();
    }
  }, [isPlay]);

  return <>
    <TimeBoard time={leftTime} />
    <div className={css['pause-btn-wrap']}>
      <Button
        theme='round-red'
        action={() => toggle()}
        disabled={!isWorkingMode}
        children={isPlay ? <IoIosPause /> : <IoIosPlay />}
      />
    </div>
  </>;
}
