import React from 'react';
import { IoIosPower, IoIosSettings } from 'react-icons/io';
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
    <Button theme='icon' action={() => {}}>
      <IoIosPower />
    </Button>
  </div>
);

export default Header;