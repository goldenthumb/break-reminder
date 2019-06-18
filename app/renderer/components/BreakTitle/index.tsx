import React from 'react';
const css = require('./BreakTitle.scss');

import { ipcRenderer } from 'electron';
import { IPC_EVENT } from '../../../lib/enums';

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
