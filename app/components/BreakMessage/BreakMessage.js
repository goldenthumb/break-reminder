import React, { useRef, useState, useEffect } from 'react';
import { remote, ipcRenderer } from 'electron';
import { Line } from 'rc-progress';
import css from './BreakMessage.scss';

import { IPC_EVENT } from '../../lib/constants';
import Button from '../Button';

const { BrowserWindow } = remote;

const BreakMessage = () => {
  const audio = useRef(null);
  const { breakDuration, options } = ipcRenderer.sendSync(IPC_EVENT.INITIAL_STATE);
  const breakTime = breakDuration - 2000;
  const [timeLeft, setTimeLeft] = useState(breakTime);
  const percent = parseInt((breakTime - timeLeft) / breakTime * 100);

  useEffect(() => {
    const endTimer = setTimeout(() => {
      if (options.sound) {
        audio.current.play();
      }
    }, breakTime);

    return () => clearTimeout(endTimer);
  }, []);

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
        <div className={css['title']}>
          Time For a Break
        </div>
        {options.sound && (
          <div className={css['sub-title']}>
            {`You'll hear a sound when done`}
          </div>
        )}
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
        <audio ref={audio}>
          <source type="audio/mp3" src='./audio/alarm.wav' />
        </audio>
      </div>
    </div>
  );
};

export default BreakMessage;