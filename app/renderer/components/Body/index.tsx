import React from 'react';
const css = require('./Body.scss');

interface BodyProps {
  children: React.ReactNode;
}

export default function Body({ children }: BodyProps) {
  return (
    <div className={css['body']}>
      {children}
    </div>
  );
}

