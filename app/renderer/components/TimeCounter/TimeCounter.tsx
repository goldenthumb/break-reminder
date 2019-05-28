import * as React from 'react';
import { ipcRenderer } from 'electron';
const css = require('./TimeCounter.scss');

import { msToTime } from '../../../lib/utils';
import { IPC_EVENT, MILLISECOND } from '../../../lib/constants';

export interface TimeCounterProps {
  type: string;
  time: number | string;
  timeLeft: number;
}

const TimeCounter = ({ type, time, timeLeft }: TimeCounterProps) => {
  const [hour, min] = msToTime(timeLeft);

  const increaseHour = () => {
    if (hour >= 23) return;

    ipcRenderer.send(
      IPC_EVENT.REMINDER_INTERVAL,
      ((hour + 1) * MILLISECOND.HOUR) + (min * MILLISECOND.MIN)
    );
  };

  const decreaseHour = () => {
    if (hour < 0) return;

    ipcRenderer.send(
      IPC_EVENT.REMINDER_INTERVAL,
      (hour === 0 ? 0 : ((hour - 1) * MILLISECOND.HOUR)) + (min * MILLISECOND.MIN)
    );
  };

  const increaseMinute = () => {
    if (min >= 59) return;

    ipcRenderer.send(
      IPC_EVENT.REMINDER_INTERVAL,
      (hour * MILLISECOND.HOUR) + ((min + 1) * MILLISECOND.MIN)
    );
  };

  const decreaseMinute = () => {
    if (hour === 0 && min <= 1) return;

    ipcRenderer.send(
      IPC_EVENT.REMINDER_INTERVAL,
      (hour * MILLISECOND.HOUR) + (min === 0 ? 0 : ((min - 1) * MILLISECOND.MIN))
    );
  };

  const increase = type === 'h' ? increaseHour : increaseMinute;
  const decrease = type === 'h' ? decreaseHour : decreaseMinute;

  return (
    <div className={css['wrap']}>
      <button
        type="button"
        className={css['up']}
        onClick={increase}
      >
        &#9650;
      </button>
      <span className={css[type]}>{time}</span>
      <button
        type="button"
        className={css['down']}
        onClick={decrease}
      >
        &#9660;
      </button>
      <span className={css['label']}>{type}</span>
    </div>
  );
};

export default TimeCounter;