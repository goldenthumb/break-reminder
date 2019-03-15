import React, { useEffect, useContext, useState } from 'react';
import { IoIosSquare } from 'react-icons/io';
import css from './TimeBoard.scss';

import timerStore from '../../lib/timerStore';

import { Context } from '../../contexts';
import { msToTime } from '../../lib/utils';

import Button from '../Button';

const MINUTE = 60 * 1000;

const TimeBoard = () => {
  const { state: { reminderInterval, showBreakWindow } } = useContext(Context);
  const [timeLeft, setTimeLeft] = useState(reminderInterval);
  const [hour, min] = msToTime(timeLeft);

  useEffect(() => {
    if (!showBreakWindow && timeLeft !== reminderInterval) {
      timerStore.clear('timeLeft');
      setTimeLeft(reminderInterval);
    }
  }, [showBreakWindow]);

  useEffect(() => {
    const timer = setTimeout(() => {
      timerStore.set('timeLeft', timer);
      setTimeLeft(timeLeft - MINUTE);
    }, MINUTE);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  return (
    <div className={css['time-board']}>
      <div>
        {`${hour}:${min}`}
      </div>
      <Button theme='round-red' action={() => {}}>
        <IoIosSquare />
      </Button>
    </div>
  );
};

export default TimeBoard;