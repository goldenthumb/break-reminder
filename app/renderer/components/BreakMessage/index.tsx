import React from 'react';
import { ipcRenderer } from 'electron';
import { IPC_EVENT } from '../../../lib/enums';
const css = require('./BreakMessage.scss');

import useTimer from '../../hooks/useTimer';
import BreakTitle from '../BreakTitle';
import Progress from '../Progress';
import Skip from '../Skip';
import Audio from '../Audio';

const BreakMessage = () => {
  const { breakDuration } = ipcRenderer.sendSync(IPC_EVENT.PREFERENCES);
  const breakTime = breakDuration - 2000;
  const { percent } = useTimer({ time: breakTime, interval: 100 });

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
