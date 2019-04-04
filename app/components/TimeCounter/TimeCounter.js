import React from 'react';
import { ipcRenderer } from 'electron';
import css from './TimeCounter.scss';

import { msToTime } from '../../lib/utils';
import { IPC_EVENT, MILLISECOND } from '../../lib/constants';

const TimeCounter = ({ type, time, timeLeft }) => {
  const actions = {
    h: {
      up: () => {
        const [hour] = msToTime(timeLeft);
        if (hour >= 23) return;

        ipcRenderer.send(
          IPC_EVENT.REMINDER_INTERVAL,
          timeLeft + MILLISECOND.HOUR
        );
      },
      down: () => {
        const [hour] = msToTime(timeLeft);
        if (hour <= 0) return;

        ipcRenderer.send(
          IPC_EVENT.REMINDER_INTERVAL,
          timeLeft - MILLISECOND.HOUR
        );
      }
    },
    m: {
      up: () => {
        const [,min] = msToTime(timeLeft);
        if (min >= 59) return;

        ipcRenderer.send(
          IPC_EVENT.REMINDER_INTERVAL,
          timeLeft + MILLISECOND.MIN
        );
      },
      down: () => {
        const [,min] = msToTime(timeLeft);
        if (min <= 1) return;

        ipcRenderer.send(
          IPC_EVENT.REMINDER_INTERVAL,
          timeLeft - MILLISECOND.MIN
        );
      }
    }
  }[type];

  return (
    <div className={css['wrap']}>
      <button
        type="button"
        className={css['up']}
        onClick={actions.up}
      >
        &#9650;
      </button>
      <span className={css[type]}>{time}</span>
      <button
        type="button"
        className={css['down']}
        onClick={actions.down}
      >
        &#9660;
      </button>
      <span className={css['label']}>{type}</span>
    </div>
  );
};

export default TimeCounter;