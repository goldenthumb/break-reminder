import React from 'react';
const css = require('./Body.scss');

const Body = ({ children }: BodyProps) => (
  <div className={css['body']}>
    {children}
  </div>
);

export default Body;
export type BodyProps = {
  children: React.ReactNode;
}
