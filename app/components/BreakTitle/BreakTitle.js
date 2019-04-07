import React from 'react';
import { ipcRenderer } from 'electron';
import { IPC_EVENT } from '../../lib/constants';
import css from './BreakTitle.scss';

const BreakTitle = () => {
  const { options } = ipcRenderer.sendSync(IPC_EVENT.PREFERENCES);

  return (
    <>
      <div className={css['title']}>
        Time For a Break
      </div>
      {options.sound && (
        <div className={css['sub-title']}>
          {`You'll hear a sound when done`}
        </div>
      )}
    </>
  );
};

export default BreakTitle;