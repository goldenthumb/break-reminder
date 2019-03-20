import React from 'react';
import { remote, ipcRenderer } from 'electron';
import { IPC_EVENT } from '../../lib/constants';
import css from './BreakMessage.scss';

import Button from '../Button';

const { BrowserWindow } = remote;

const BreakMessage = () => (
  <div className={css['message-wrap']}>
    <div className={css['content']}>
      <div className={css['title']}>
        Time For a Break
      </div>
      <div className={css['sub-title']}>
        {`You'll hear a sound when done`}
      </div>
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
);

export default BreakMessage;