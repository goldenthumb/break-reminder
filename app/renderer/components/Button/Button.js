import React from 'react';
import css from './Button.scss';

const Button = ({ theme, action, children }) => (
  <button
    type='button'
    className={css[theme]}
    onClick={action}
  >
    {children}
  </button>
);

export default Button;