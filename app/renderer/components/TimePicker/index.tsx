import React from 'react';
const css = require('./TimePicker.scss');

import ReactTimePicker from 'rc-time-picker';
import moment, { Moment } from 'moment';
import { MILLISECOND } from '../../../lib/enums';
import { msToTime } from '../../../lib/utils';

interface TimePickerProps {
  label: string;
  time: number;
  action: (ms: number) => void;
}

export default function TimePicker({ label, time, action }: TimePickerProps) {
  const [hour, min, sec] = msToTime(time);
  const t = moment({ h: hour, m: min, s: sec });

  return (
    <div className={css['time-picker-wrap']}>
      <span className={css['name']}>{label}</span>
      <span className={css['separate']}> : </span>
      <ReactTimePicker
        showSecond
        allowEmpty={false}
        defaultValue={t}
        onChange={(t: Moment) => {
          const { HOUR, MIN, SEC } = MILLISECOND;
          const ms = t.hours() * HOUR + t.minutes() * MIN + t.seconds() * SEC;
          action(ms);
        }}
      />
    </div>
  );
}
