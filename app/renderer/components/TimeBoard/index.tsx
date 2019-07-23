import React, { useEffect, useContext, useState } from 'react';
const css = require('./TimeBoard.scss');
import { ipcRenderer } from 'electron';

import { IoIosPlay, IoIosPause } from 'react-icons/io';
import { IPC_EVENT, MILLISECOND } from '../../../lib/enums';

import { Context } from '../../contexts';
import useTimer from '../../hooks/useTimer';

import Button from '../Button';
import TimeCounter from '../TimeCounter';

export default function TimeBoard() {
  const { state, services: { blockerOpenScheduler } } = useContext(Context);
  const { reminderInterval, isWorkingDuration } = state;
  const [isPlay, setPlayStatus] = useState(true);
  const { timeLeft, play, pause, reset } = useTimer({
    time: reminderInterval,
    interval: MILLISECOND.MIN
  });

  useEffect(() => {
    if (isWorkingDuration && timeLeft !== reminderInterval) {
      reset(reminderInterval);
    }
  }, [isWorkingDuration, reminderInterval]);

  useEffect(() => {
    isPlay ? play() : pause();

    ipcRenderer.on(IPC_EVENT.POWER_MONITOR_ON, onListener);
    ipcRenderer.on(IPC_EVENT.POWER_MONITOR_OFF, offListener);

    return () => {
      ipcRenderer.removeListener(IPC_EVENT.POWER_MONITOR_ON, onListener);
      ipcRenderer.removeListener(IPC_EVENT.POWER_MONITOR_OFF, offListener);
    };

    function onListener() {
      if (!isPlay) return;
      blockerOpenScheduler.setDuration(timeLeft);
    }

    function offListener() {
      if (!isPlay) return;
      blockerOpenScheduler.clearDuration();
    }
  }, [isPlay]);

  const togglePlay = () => {
    const nextPlay = !isPlay;
    setPlayStatus(nextPlay);

    if (nextPlay) {
      blockerOpenScheduler.setDuration(timeLeft);
    } else {
      blockerOpenScheduler.clearDuration();
    }
  };

  return <>
    <div className={css['time-board']}>
      <TimeCounter type='hour' time={timeLeft} />
      <TimeCounter type='minute' time={timeLeft} />
    </div>
    <div className={css['pause-btn-wrap']}>
      <Button theme='round-red' action={togglePlay} disabled={!isWorkingDuration}>
        {isPlay ? <IoIosPause /> : <IoIosPlay />}
      </Button>
    </div>
  </>;
};
