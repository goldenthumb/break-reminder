import React from 'react';
const css = require('./TimeCounter.scss');

export interface TimeCounterProps {
  type: string;
  time: number | string;
  onIncrease: () => void;
  onDecrease: () => void;
}

const TimeCounter = ({ type, time, onIncrease, onDecrease }: TimeCounterProps) => {
  return (
    <div className={css['wrap']}>
      <button
        type="button"
        className={css['up']}
        onClick={onIncrease}
      >
        &#9650;
      </button>
      <span className={css[type]}>{time}</span>
      <button
        type="button"
        className={css['down']}
        onClick={onDecrease}
      >
        &#9660;
      </button>
      <span className={css['label']}>{type}</span>
    </div>
  );
};

export default TimeCounter;
