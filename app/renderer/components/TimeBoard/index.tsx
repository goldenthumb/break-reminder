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
    ipcRenderer.on(IPC_EVENT.ACTIVE_POWER, listener);

    return () => {
      ipcRenderer.removeListener(IPC_EVENT.ACTIVE_POWER, listener);
    };

    function listener(active: boolean) {
      if (!isPlay) return;

      if (active) {
        blockerOpenScheduler.setDuration(timeLeft);
        play();
      } else {
        blockerOpenScheduler.clearDuration();
        pause();
      }
    }
  }, [isPlay, timeLeft]);

  function togglePlay() {
    const nextPlay = !isPlay;
    setPlayStatus(nextPlay);

    if (nextPlay) {
      blockerOpenScheduler.setDuration(timeLeft);
      play();
    } else {
      blockerOpenScheduler.clearDuration();
      pause();
    }
  }

  return <>
    <div className={css['time-board']}>
      <TimeCounter type='hour' time={timeLeft} />
      <TimeCounter type='minute' time={timeLeft} />
    </div>
    <div className={css['pause-btn-wrap']}>
      <Button
        theme='round-red'
        action={togglePlay}
        disabled={!isWorkingDuration}
        children={isPlay ? <IoIosPause /> : <IoIosPlay />}
      />
    </div>
  </>;
};
