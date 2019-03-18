import React from 'react';
import { IoIosPower, IoIosSettings } from 'react-icons/io';
import { ipcRenderer }from 'electron';
import css from './Header.scss';

import Button from '../Button';

const Header = () => (
  <div className={css['header']}>
    <Button theme='icon' action={() => {}}>
      <IoIosSettings />
    </Button>
    <div className={css['title']}>
      Break Reminder
    </div>
    <Button theme='quit-icon' action={() => ipcRenderer.send('quit')}>
      <IoIosPower />
    </Button>
  </div>
);

export default Header;