import React from 'react';
const css = require('./Button.scss');

export interface ButtonProps {
  theme: string;
  action: () => void;
  children: React.ReactNode;
}

const Button = ({ theme, action, children }: ButtonProps) => (
  <button
    type='button'
    className={css[theme]}
    onClick={action}
  >
    {children}
  </button>
);

export default Button;
