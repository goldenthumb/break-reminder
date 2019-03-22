import React, { useState, useEffect } from 'react';
import { remote, ipcRenderer } from 'electron';
import { Line } from 'rc-progress';
import css from './BreakMessage.scss';

import { IPC_EVENT, MILLISECOND } from '../../lib/constants';
import Button from '../Button';

const { BrowserWindow } = remote;

const BreakMessage = () => {
  const { breakDuration } = ipcRenderer.sendSync(IPC_EVENT.INITIAL_STATE);
  const [timeLeft, setTimeLeft] = useState(breakDuration);
  const percent = parseInt((breakDuration - timeLeft) / breakDuration * 100);

  useEffect(() => {
    const timeLeftTimer = setTimeout(() => {
      const nextTimeLeft = timeLeft - MILLISECOND.SEC;

      if (nextTimeLeft >= 0) {
        setTimeLeft(nextTimeLeft);
      }
    }, MILLISECOND.SEC);

    return () => clearTimeout(timeLeftTimer);
  }, [timeLeft]);

  return (
    <div className={css['message-wrap']}>
      <div className={css['content']}>
        <div className={css['title']}>
          Time For a Break
        </div>
        <div className={css['sub-title']}>
          {`You'll hear a sound when done`}
        </div>
        <div className={css['progress']}>
          <Line
            percent={percent}
            strokeWidth="3"
            trailWidth="2"
            strokeColor="#457ab1"
            trailColor="#3a3a3a"
          />
        </div>
        <div className={css['button-wrap']}>
          <Button
            theme='skip'
            action={() => {
              const mainWindowId = ipcRenderer.sendSync(IPC_EVENT.MAIN_WINDOW);

              BrowserWindow.getAllWindows()
                .filter(({ id }) => id !== mainWindowId)
                .map(window => window.close());
            }}
          >
            skip
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BreakMessage;