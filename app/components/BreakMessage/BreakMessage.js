import React from 'react';
import css from './BreakMessage.scss';

const BreakMessage = () => (
  <div className={css['message-wrap']}>
    <div className={css['content']}>
      <div className={css['title']}>
        Time For a Break
      </div>
      <div className={css['sub-title']}>
        {`You'll hear a sound when done`}
      </div>
    </div>
  </div>
);

export default BreakMessage;