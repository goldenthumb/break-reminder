import React from 'react';
import { IoIosArrowBack, IoIosSettings } from 'react-icons/io';
import css from './Header.scss';

import IconButton from '../IconButton';

const Header = () => (
  <div className={css['header']}>
    <IconButton action={() => {}}>
      <IoIosArrowBack />
    </IconButton>
    <div className={css['title']}>
      Break Reminder
    </div>
    <IconButton action={() => {}}>
      <IoIosSettings />
    </IconButton>
  </div>
);

export default Header;