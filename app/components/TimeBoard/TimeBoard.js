import React, { useEffect, useContext, useState } from 'react';
import { ipcRenderer } from 'electron';
import { IoIosPlay, IoIosPause } from 'react-icons/io';
import css from './TimeBoard.scss';

import { Context } from '../../contexts';
import { msToTime } from '../../lib/utils';
import { IPC_EVENT, MILLISECOND } from '../../lib/constants';

import useTimer from '../../hooks/useTimer';

import Button from '../Button';
import TimeCounter from '../TimeCounter';

const TimeBoard = () => {
  const { state: { reminderInterval, showBreakWindow } } = useContext(Context);
  const { timeLeft, play, pause, reset } = useTimer({ time: reminderInterval, interval: MILLISECOND.MIN });
  const [isPlay, setPlayStatus] = useState(true);
  const [hour, min] = msToTime(timeLeft);

  useEffect(() => {
    if (!showBreakWindow && timeLeft !== reminderInterval) {
      reset(reminderInterval);
    }
  }, [showBreakWindow, reminderInterval]);

  useEffect(() => {
    isPlay ? play() : pause();
  }, [isPlay]);

  const togglePlay = () => {
    if (showBreakWindow) return;

    const nextPlay = !isPlay;

    if (nextPlay) {
      ipcRenderer.send(IPC_EVENT.BREAK_WINDOW, {
        status: 'open',
        delay: timeLeft
      });
    } else {
      ipcRenderer.send(IPC_EVENT.BREAK_WINDOW, {
        status: 'pause'
      });
    }

    setPlayStatus(nextPlay);
  };

  return (
    <>
      <div className={css['time-board']}>
        <TimeCounter
          type='h'
          time={hour}
          timeLeft={timeLeft}
        />
        <TimeCounter
          type='m'
          time={min.toString().padStart(2, '0')}
          timeLeft={timeLeft}
        />
      </div>
      <div className={css['pause-btn-wrap']}>
        <Button theme='round-red' action={togglePlay}>
          {isPlay ? <IoIosPause /> : <IoIosPlay />}
        </Button>
      </div>
    </>
  );
};

export default TimeBoard;