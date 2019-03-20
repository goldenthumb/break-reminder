import React, { useEffect, useContext, useState } from 'react';
import { ipcRenderer } from 'electron';
import { IoIosPlay, IoIosPause } from 'react-icons/io';
import css from './TimeBoard.scss';

import { Context } from '../../contexts';
import { msToTime } from '../../lib/utils';
import { IPC_EVENT } from '../../lib/constants';

import Button from '../Button';

const MINUTE = 60 * 1000;
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
  }, [showBreakWindow]);

  useEffect(() => {
    if (!play) return;

    timeLeftTimer = setTimeout(() => {
      const nextTimeLeft = timeLeft - MINUTE;

      if (nextTimeLeft >= 0) {
        setTimeLeft(nextTimeLeft);
      }
    }, MINUTE);

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
    <div className={css['time-board']}>
      <div>
        {`${hour}:${min}`}
      </div>
      <Button theme='round-red' action={togglePlay}>
        {play ? <IoIosPause /> : <IoIosPlay />}
      </Button>
    </div>
  );
};

export default TimeBoard;