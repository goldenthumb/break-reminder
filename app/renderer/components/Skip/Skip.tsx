import * as React from 'react';
import { ipcRenderer } from 'electron';
import { IPC_EVENT } from '../../../lib/constants';
const css = require('./Skip.scss');

import Button from '../Button';

const Skip = () => (
  <div className={css['wrap']}>
    <Button
      theme='skip'
      action={() => {
        ipcRenderer.send(IPC_EVENT.BREAK_WINDOW, {
          status: 'skip',
        });
      }}
    >
      skip
    </Button>
  </div>
);

export default Skip;