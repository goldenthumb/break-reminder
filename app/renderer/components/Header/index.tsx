import React from 'react';
import { IoIosPower } from 'react-icons/io';
import { ipcRenderer }from 'electron';
const css = require('./Header.scss');

import Button from '../Button';

const Header = () => (
  <div className={css['header']}>
    <div className={css['title']}>
      Break Reminder
    </div>
    <div className={css['button-wrap']}>
      <Button theme='quit-icon' action={() => ipcRenderer.send('quit')}>
        <IoIosPower />
      </Button>
    </div>
  </div>
);

export default Header;
