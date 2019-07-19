import React from 'react';
const css = require('./Button.scss');

interface ButtonProps {
  theme: string;
  action: () => void;
  children: React.ReactNode;
}

export default function Button({ theme, action, children }: ButtonProps) {
  return (
    <button
      type='button'
      className={css[theme]}
      onClick={action}
    >
      {children}
    </button>
  );
}

