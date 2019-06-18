import React, { useEffect, useContext, useState } from 'react';
import { ipcRenderer } from 'electron';
import { IoIosPlay, IoIosPause } from 'react-icons/io';
const css = require('./TimeBoard.scss');

import { Context, AppContext } from '../../contexts';
import { IPC_EVENT, MILLISECOND } from '../../../lib/enums';
import { BREAK_WINDOW } from '../../../windows/BreakWindow';

import useTimer from '../../hooks/useTimer';

import Button from '../Button';
import TimeCounter from '../TimeCounter';
import scheduler, { SCHEDULER } from '../../../lib/scheduler';

const TimeBoard = () => {
  const { state: { reminderInterval, showBreakWindow } } = useContext(Context) as AppContext;
  const { timeLeft, play, pause, reset } = useTimer({ time: reminderInterval, interval: MILLISECOND.MIN });
  const [isPlay, setPlayStatus] = useState(true);

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

    setPlayStatus(!isPlay);

    if (isPlay) {
      scheduler.clearWorkingDuration();
      return;
    }

    scheduler.setWorkingDuration(timeLeft);
    scheduler.once(SCHEDULER.FINISH_WORKING, () => {
      // TODO: 수정해야함 두개 등록 되어 있어서 이벤트가 두번 발생함...
      ipcRenderer.send(
        IPC_EVENT.BREAK_WINDOW,
        BREAK_WINDOW.OPEN
      );
    });
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
