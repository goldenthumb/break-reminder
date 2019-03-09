import React from 'react';
import css from './IconButton.scss';

const IconButton = ({ action, children }) => (
  <button
    type='button'
    className={css['button']}
    onClick={action}
  >
    {children}
  </button>
);

export default IconButton;