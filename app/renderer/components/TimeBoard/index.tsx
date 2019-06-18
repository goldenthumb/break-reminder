import React, { useEffect, useContext, useState } from 'react';
const css = require('./TimeBoard.scss');

import { IoIosPlay, IoIosPause } from 'react-icons/io';
import { MILLISECOND } from '../../../lib/enums';
import scheduler from '../../../lib/scheduler';

import { Context, AppContext } from '../../contexts';
import useTimer from '../../hooks/useTimer';

import Button from '../Button';
import TimeCounter from '../TimeCounter';

const TimeBoard = () => {
  const { state } = useContext(Context) as AppContext;
  const { reminderInterval, showBreakWindow } = state;
  const [isPlay, setPlayStatus] = useState(true);
  const { timeLeft, play, pause, reset } = useTimer({
    time: reminderInterval,
    interval: MILLISECOND.MIN
  });

  useEffect(() => {
    if (!showBreakWindow && timeLeft !== reminderInterval) {
      reset(reminderInterval);
    }
  }, [showBreakWindow, reminderInterval]);

  useEffect(() => {
    isPlay ? play() : pause();
  }, [isPlay]);

  const togglePlay = () => {
    if (showBreakWindow) return;

    const nextPlay = !isPlay;
    setPlayStatus(nextPlay);

    if (nextPlay) {
      scheduler.setWorkingDuration(timeLeft);
    } else {
      scheduler.clearWorkingDuration();
    }
  };

  return (
    <>
      <div className={css['time-board']}>
        <TimeCounter type='hour' time={timeLeft} />
        <TimeCounter type='minute' time={timeLeft} />
      </div>
      <div className={css['pause-btn-wrap']}>
        <Button theme='round-red' action={togglePlay}>
          {isPlay ? <IoIosPause /> : <IoIosPlay />}
        </Button>
      </div>
    </>
  );
};

export default TimeBoard;
