import React, { useContext } from 'react';
const css = require('./TimeCounter.scss');

import { msToTime } from '../../../lib/utils';
import { increase, decrease, TimeType } from './timeConter';
import { Context } from '../../contexts';

enum timeKeyword {
  hour = 'h',
  minute = 'm'
}

export default function TimeCounter({ type, time }: TimeType) {
  const [hour, min] = msToTime(time);
  const { actions } = useContext(Context);

  return (
    <div className={css['wrap']}>
      <button
        type="button"
        className={css['up']}
        onClick={() => {
          const nextTime = increase({ type, time });

          if (nextTime) {
            actions.setReminderInterval(nextTime);
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
            actions.setReminderInterval(nextTime);
          }
        }}
      >
        &#9660;
      </button>
      <span className={css['label']}>{timeKeyword[type]}</span>
    </div>
  );
}
