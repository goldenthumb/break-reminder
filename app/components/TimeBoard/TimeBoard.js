import React, { useEffect, useContext, useState } from 'react';
import { ipcRenderer } from 'electron';
import { IoIosPlay, IoIosPause } from 'react-icons/io';
import css from './TimeBoard.scss';

import { Context } from '../../contexts';
import { msToTime } from '../../lib/utils';
import { IPC_EVENT, MILLISECOND } from '../../lib/constants';

import Button from '../Button';
import TimeCounter from '../TimeCounter';

let timeLeftTimer = null;

const TimeBoard = () => {
  const { state: { reminderInterval, showBreakWindow } } = useContext(Context);
  const [timeLeft, setTimeLeft] = useState(reminderInterval);
  const [play, setPlay] = useState(true);
  const [hour, min] = msToTime(timeLeft);

  useEffect(() => {
    if (!showBreakWindow && timeLeft !== reminderInterval) {
      clearTimeout(timeLeftTimer);
      setTimeLeft(reminderInterval);
    }
  }, [showBreakWindow, reminderInterval]);

  useEffect(() => {
    if (!play) return;

    timeLeftTimer = setTimeout(() => {
      const nextTimeLeft = timeLeft - MILLISECOND.MIN;

      if (nextTimeLeft >= 0) {
        setTimeLeft(nextTimeLeft);
      }
    }, MILLISECOND.MIN);

    return () => clearTimeout(timeLeftTimer);
  }, [play, timeLeft]);

  const togglePlay = () => {
    if (showBreakWindow) return;

    const nextPlay = !play;

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

    setPlay(nextPlay);
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
          {play ? <IoIosPause /> : <IoIosPlay />}
        </Button>
      </div>
    </>
  );
};

export default TimeBoard;