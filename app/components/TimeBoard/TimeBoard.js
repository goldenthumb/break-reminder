import React, { useEffect, useContext, useState } from 'react';
import { IoIosSquare } from 'react-icons/io';
import delay from 'delay';
import css from './TimeBoard.scss';

import { Context } from '../../contexts';
import { msToTime } from '../../lib/utils';

import Button from '../Button';

const MINUTE = 60 * 1000;

const TimeBoard = () => {
  const { state: { breakInterval } } = useContext(Context);
  const [timeLeft, setTimeLeft] = useState(breakInterval);
  const [hour, min] = msToTime(timeLeft);

  const setTimer = async () => {
    const timer = await delay(MINUTE);
    const nextTimeLeft = timeLeft - MINUTE;

    setTimeLeft(nextTimeLeft);

    return () => timer.clear();
  };

  useEffect(() => {
    setTimer();
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