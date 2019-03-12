import React, { useContext } from 'react';
import { ipcRenderer }from 'electron';
import css from './OptionList.scss';

import OptionItem from '../OptionItem';
import { Context } from '../../contexts';

const OptionList = () => {
  const { state: { config } } = useContext(Context);

  const optionList = [
    {
      id: 0,
      name: 'Start at login',
      isChecked: config.startAtLogin,
      action: (checked) => {
        ipcRenderer.send('setConfig', { startAtLogin: checked });
      }
    },
    {
      id: 1,
      name: 'Notification',
      isChecked: config.notification,
      action: (checked) => {
        ipcRenderer.send('setConfig', { notification: checked });
      }
    },
    {
      id: 2,
      name: 'Sound',
      isChecked: config.sound,
      action: (checked) => {
        ipcRenderer.send('setConfig', { sound: checked });
      }
    }
  ];

  return (
    <div className={css['option-list']}>
      {optionList.map(({ id, name, isChecked, action }) => (
        <OptionItem
          key={id}
          name={name}
          isChecked={isChecked}
          action={action}
        />
      ))}
    </div>
  );
};

export default OptionList;