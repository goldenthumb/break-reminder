import React, { useEffect, useContext, useState } from 'react';
const css = require('./TimeBoard.scss');
import { ipcRenderer } from 'electron';

import { IoIosPlay, IoIosPause } from 'react-icons/io';
import { IPC_EVENT, MILLISECOND } from '../../../lib/enums';

import { Context } from '../../contexts';
import useTimer from '../../hooks/useTimer';

import Button from '../Button';
import TimeCounter from '../TimeCounter';
import { BLOCKER_STATUS } from '../../../main/Blocker';

export default function TimeBoard() {
  const { state, services: { notifier } } = useContext(Context);
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
    if (timeLeft === MILLISECOND.MIN) {
      notifier.run();
    }

    if (timeLeft === 0) {
      ipcRenderer.send(IPC_EVENT.BLOCKER, BLOCKER_STATUS.OPEN);
    }

    ipcRenderer.on(IPC_EVENT.ACTIVE_POWER, listener);

    return () => {
      ipcRenderer.removeListener(IPC_EVENT.ACTIVE_POWER, listener);
    };

    function listener(active: boolean) {
      if (!isPlay) return;
      active ? play() : pause();
    }
  }, [isPlay, timeLeft]);

  function togglePlay() {
    const nextPlay = !isPlay;
    setPlayStatus(nextPlay);
    nextPlay ? play() : pause();
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
}
