import React, { useContext } from 'react';
import { ipcRenderer } from 'electron';
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import css from './BreakTimePicker.scss';

import { Context } from '../../contexts';
import { IPC_EVENT, MILLISECOND } from '../../lib/constants';
import { msToTime } from '../../lib/utils';

const time = moment();

const BreakTimePicker = () => {
  const { state: { breakDuration } } = useContext(Context);
  const [hour, min, sec] = msToTime(breakDuration);
  time.set({ h: hour, m: min, s: sec });

  return (
    <div className={css['time-picker-wrap']}>
      <span>
          break time :
      </span>
      <TimePicker
        className={css['break-time-picker']}
        showSecond
        allowEmpty={false}
        defaultValue={time}
        onChange={(time) => {
          const { HOUR, MIN, SEC } = MILLISECOND;
          const ms = time.hours() * HOUR + time.minutes() * MIN + time.seconds() * SEC;

          ipcRenderer.send(IPC_EVENT.BREAK_DURATION, ms);
        }}
      />
    </div>
  );
};

export default BreakTimePicker;