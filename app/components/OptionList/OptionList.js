import React from 'react';
import css from './OptionList.scss';

import OptionItem from '../OptionItem';

const OptionList = () => {
  const options = [
    {
      id: 0,
      name: 'Start at login',
      action: () => {}
    },
    {
      id: 1,
      name: 'Notification',
      action: () => {}
    },
    {
      id: 2,
      name: 'Sound',
      action: () => {}
    }
  ];

  return (
    <div className={css['option-list']}>
      {options.map(({ id, name, action }) => (
        <OptionItem
          key={id}
          name={name}
          action={action}
        />
       ))}
    </div>
  );
};

export default OptionList;