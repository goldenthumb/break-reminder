import React, { useEffect, useContext, useState } from 'react';
import { ipcRenderer } from 'electron';
import { IoIosPlay, IoIosPause } from 'react-icons/io';
import css from './TimeBoard.scss';

import { Context } from '../../contexts';
import { msToTime } from '../../lib/utils';
import { IPC_EVENT, MILLISECOND } from '../../lib/constants';

import Button from '../Button';

let timeLeftTimer = null;

const TimeBoard = () => {
  const { state: { reminderInterval, showBreakWindow, options } } = useContext(Context);
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

    if (timeLeft === MILLISECOND.MIN && options.notification) {
      new Notification('Preparing break ...', {
        body: 'Break will commence in 60 seconds.',
        silent: !options.sound
      });
    }

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
        <div className={css['timer-wrap']}>
          <button
            type="button"
            className={css['time-up']}
            onClick={() => {
              const [hour] = msToTime(timeLeft);

              if (hour >= 23) return;

              ipcRenderer.send(
                IPC_EVENT.REMINDER_INTERVAL,
                timeLeft + MILLISECOND.HOUR
              );
            }}
          >
            &#9650;
          </button>
          <span className={css['hour']}>{hour}</span>
          <button
            type="button"
            className={css['time-down']}
            onClick={() => {
              const [hour] = msToTime(timeLeft);

              if (hour <= 0) return;

              ipcRenderer.send(
                IPC_EVENT.REMINDER_INTERVAL,
                timeLeft - MILLISECOND.HOUR
              );
            }}
          >
            &#9660;
          </button>
          <span className={css['time-label']}>h</span>
        </div>
        <div className={css['timer-wrap']}>
          <button
            type="button"
            className={css['time-up']}
            onClick={() => {
              const [,min] = msToTime(timeLeft);

              if (min >= 59) return;

              ipcRenderer.send(
                IPC_EVENT.REMINDER_INTERVAL,
                timeLeft + MILLISECOND.MIN
              );
            }}
          >
            &#9650;
          </button>
          <span className={css['min']}>{min.toString().padStart(2, '0')}</span>
          <button
            type="button"
            className={css['time-down']}
            onClick={() => {
              const [,min] = msToTime(timeLeft);

              if (min <= 1) return;

              ipcRenderer.send(
                IPC_EVENT.REMINDER_INTERVAL,
                timeLeft - MILLISECOND.MIN
              );
            }}
          >
            &#9660;
          </button>
          <span className={css['time-label']}>m</span>
        </div>
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