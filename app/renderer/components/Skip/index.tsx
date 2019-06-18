import React from 'react';
const css = require('./Skip.scss');

import { ipcRenderer } from 'electron';
import { IPC_EVENT } from '../../../lib/enums';
import { BREAK_WINDOW } from '../../../windows/BreakWindow';

import Button from '../Button';

const Skip = () => (
  <div className={css['wrap']}>
    <Button
      theme='skip'
      action={() => {
        ipcRenderer.send(
          IPC_EVENT.BREAK_WINDOW,
          BREAK_WINDOW.CLOSE
        )
      }}
    >
      skip
    </Button>
  </div>
);

export default Skip;
