import React, { useState, useEffect } from 'react';
import { ipcRenderer } from 'electron';
import { IPC_EVENT } from '../../lib/constants';
import css from './BreakMessage.scss';

import BreakTitle from '../BreakTitle';
import Progress from '../Progress';
import Skip from '../Skip';
import Audio from '../Audio';

const BreakMessage = () => {
  const { breakDuration } = ipcRenderer.sendSync(IPC_EVENT.PREFERENCES);
  const breakTime = breakDuration - 2000;
  const [timeLeft, setTimeLeft] = useState(breakTime);
  const percent = parseInt((breakTime - timeLeft) / breakTime * 100);

  useEffect(() => {
    const timeLeftTimer = setTimeout(() => {
      const nextTimeLeft = timeLeft - 100;

      if (nextTimeLeft >= 0) {
        setTimeLeft(nextTimeLeft);
      }
    }, 100);

    return () => clearTimeout(timeLeftTimer);
  }, [timeLeft]);

  return (
    <div className={css['message-wrap']}>
      <div className={css['content']}>
        <BreakTitle />
        <Progress percent={percent} />
        <Skip />
        <Audio />
      </div>
    </div>
  );
};

export default BreakMessage;