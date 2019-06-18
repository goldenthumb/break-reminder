import React from 'react';
const css = require('./TimeCounter.scss');

import { ipcRenderer } from 'electron';
import { IPC_EVENT } from '../../../lib/enums';
import { msToTime } from '../../../lib/utils';
import { increase, decrease, TimeType } from './timeConter';

enum timeKeyword {
  hour = 'h',
  minute = 'm'
}

const TimeCounter = ({ type, time }: TimeCounterProps) => {
  const [hour, min] = msToTime(time);

  return (
    <div className={css['wrap']}>
      <button
        type="button"
        className={css['up']}
        onClick={() => {
          const nextTime = increase({ type, time });

          if (nextTime) {
            ipcRenderer.send(IPC_EVENT.REMINDER_INTERVAL, nextTime);
          }
        }}
      >
        &#9650;
      </button>
      <span className={css[type]}>
        {type === 'minute' ? min.toString().padStart(2, '0') : hour}
      </span>
      <button
        type="button"
        className={css['down']}
        onClick={() => {
          const nextTime = decrease({ type, time });

          if (nextTime) {
            ipcRenderer.send(IPC_EVENT.REMINDER_INTERVAL, nextTime);
          }
        }}
      >
        &#9660;
      </button>
      <span className={css['label']}>{timeKeyword[type]}</span>
    </div>
  );
};

export default TimeCounter;
export type TimeCounterProps = TimeType;
