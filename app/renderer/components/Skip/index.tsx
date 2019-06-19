import React from 'react';
const css = require('./Skip.scss');

import { ipcRenderer } from 'electron';
import { IPC_EVENT } from '../../../lib/enums';
import { BLOCKER_STATUS } from '../../../mainProcess/Blocker';

import Button from '../Button';

const Skip = () => (
  <div className={css['wrap']}>
    <Button
      theme='skip'
      action={() => {
        ipcRenderer.send(
          IPC_EVENT.BLOCKER,
          BLOCKER_STATUS.CLOSE
        )
      }}
    >
      skip
    </Button>
  </div>
);

export default Skip;
