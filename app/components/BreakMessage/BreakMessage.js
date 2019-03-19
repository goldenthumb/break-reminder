import React from 'react';
import { remote } from 'electron';
import css from './BreakMessage.scss';

import Button from '../Button';

const { BrowserWindow } = remote;
const MAIN_WINDOW = 1;

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
          BrowserWindow
            .getAllWindows()
            .filter(({ id }) => id !== MAIN_WINDOW)
            .map(window => window.close());
        }}
      >
        skip
      </Button>
    </div>
  </div>
);

export default BreakMessage;