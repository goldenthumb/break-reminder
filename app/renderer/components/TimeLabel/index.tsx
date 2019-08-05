import React from 'react';
const css = require('./TimeLabel.scss');

enum timeKeyword {
  hour = 'h',
  minute = 'm',
  second = ''
}

interface TimeLabelProps {
  type: 'hour' | 'minute' | 'second';
  time: string;
}

export default function TimeLabel({ type, time }: TimeLabelProps) {
  return (
    <div className={css['wrap']}>
      <span className={css[type]}>{time}</span>
      <span className={css['label']}>{timeKeyword[type]}</span>
    </div>
  );
}
