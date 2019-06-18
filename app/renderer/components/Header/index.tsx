import React from 'react';
const css = require('./Header.scss');

import { ipcRenderer }from 'electron';
import { IoIosPower } from 'react-icons/io';

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
