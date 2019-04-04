import React from 'react';
import { remote, ipcRenderer } from 'electron';
import { IPC_EVENT } from '../../lib/constants';
import css from './Skip.scss';

import Button from '../Button';

const Skip = () => (
  <div className={css['wrap']}>
    <Button
      theme='skip'
      action={() => {
        const mainWindowId = ipcRenderer.sendSync(IPC_EVENT.MAIN_WINDOW);

        remote.BrowserWindow.getAllWindows()
          .filter(({ id }) => id !== mainWindowId)
          .forEach(window => window.close());
      }}
    >
      skip
    </Button>
  </div>
);

export default Skip;