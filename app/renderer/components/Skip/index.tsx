import React from 'react';
import { ipcRenderer } from 'electron';
import { IPC_EVENT } from '../../../lib/enums';
import { BREAK_WINDOW } from '../../../windows/BreakWindow';
const css = require('./Skip.scss');

import Button from '../Button';

const Skip = () => (
  <div className={css['wrap']}>
    <Button
      theme='skip'
      action={() => {
        ipcRenderer.send(
          IPC_EVENT.BREAK_WINDOW,
          BREAK_WINDOW.SKIP
        )
      }}
      // TODO: ....
      // action={() => ipcRenderer.send(
      //   IPC_EVENT.BREAK_WINDOW,
      //   BREAK_WINDOW.SKIP
      // )}
    >
      skip
    </Button>
  </div>
);

export default Skip;
