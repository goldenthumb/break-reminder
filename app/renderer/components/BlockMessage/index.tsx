import React from 'react';
const css = require('./BlockMessage.scss');

import { ipcRenderer } from 'electron';
import { IPC_EVENT } from '../../../lib/enums';

import useTimer from '../../hooks/useTimer';

import BlockTitle from '../BlockTitle';
import Progress from '../Progress';
import Skip from '../Skip';
import Audio from '../Audio';

const BlockMessage = () => {
  const { breakDuration } = ipcRenderer.sendSync(IPC_EVENT.PREFERENCES);
  const breakTime = breakDuration - 2000;
  const { percent } = useTimer({ time: breakTime, interval: 100 });

  return (
    <div className={css['message-wrap']}>
      <div className={css['content']}>
        <BlockTitle />
        <Progress percent={percent} />
        <Skip />
        <Audio />
      </div>
    </div>
  );
};

export default BlockMessage;
