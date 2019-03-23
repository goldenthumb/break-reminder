import React from 'react';
import css from './Body.scss';

const Body = ({ children }) => (
  <div className={css['body']}>
    {children}
  </div>
);

export default Body;