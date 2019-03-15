import React, { useEffect, useContext, useState } from 'react';
import { IoIosPlay, IoIosPause } from 'react-icons/io';
import css from './TimeBoard.scss';

import timerStore from '../../lib/timerStore';
import breakPlanner from '../../lib/breakPlanner';

import { Context } from '../../contexts';
import { msToTime } from '../../lib/utils';

import Button from '../Button';

const MINUTE = 60 * 1000;

const TimeBoard = () => {
  const { state: { reminderInterval, showBreakWindow }, actions } = useContext(Context);
  const [timeLeft, setTimeLeft] = useState(reminderInterval);
  const [play, setPlay] = useState(true);
  const [hour, min] = msToTime(timeLeft);

  useEffect(() => {
    if (!showBreakWindow && timeLeft !== reminderInterval) {
      timerStore.clear('timeLeft');
      setTimeLeft(reminderInterval);
    }
  }, [showBreakWindow]);

  useEffect(() => {
    if (!play) return;

    const timer = setTimeout(() => {
      const nextTimeLeft = timeLeft - MINUTE;

      if (nextTimeLeft >= 0) {
        setTimeLeft(nextTimeLeft);
      }
    }, MINUTE);

    timerStore.set('timeLeft', timer);

    return () => clearTimeout(timer);
  }, [play, timeLeft]);

  const togglePlay = () => {
    if (showBreakWindow) return;

    const nextPlay = !play;

    if (nextPlay) {
      breakPlanner.startWorking(timeLeft);

      breakPlanner.on('endWorking', () => {
        actions.showBreakWindow();
      });
    } else {
      breakPlanner.clearWorkingTimer();
    }

    setPlay(nextPlay);
  };

  return (
    <div className={css['time-board']}>
      <div>
        {`${hour}:${min}`}
      </div>
      <Button theme='round-red' action={togglePlay}>
        {play ? <IoIosPause /> : <IoIosPlay />}
      </Button>
    </div>
  );
};

export default TimeBoard;