import * as React from 'react';
const css = require('./Body.scss');

interface BodyProps {
  children: React.ReactNode;
}

const Body = ({ children }: BodyProps) => (
  <div className={css['body']}>
    {children}
  </div>
);

export default Body;