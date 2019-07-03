import React, { useContext } from 'react';
const css = require('./BreakTimePicker.scss');

import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';

import { ipcRenderer } from 'electron';
import moment, { Moment } from 'moment';
import { IPC_EVENT, MILLISECOND } from '../../../lib/enums';
import { msToTime } from '../../../lib/utils';

import { Context } from '../../contexts';

const BreakTimePicker = () => {
  const { state: { breakDuration } } = useContext(Context);
  const [hour, min, sec] = msToTime(breakDuration);
  const time = moment({ h: hour, m: min, s: sec });

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
        onChange={(time: Moment) => {
          const { HOUR, MIN, SEC } = MILLISECOND;
          const ms = time.hours() * HOUR + time.minutes() * MIN + time.seconds() * SEC;
          ipcRenderer.send(IPC_EVENT.BREAK_DURATION, ms);
        }}
      />
    </div>
  );
};

export default BreakTimePicker;
