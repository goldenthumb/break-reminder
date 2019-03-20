import React, { useContext } from 'react';
import { ipcRenderer } from 'electron';
import { IPC_EVENT } from '../../lib/constants';
import css from './OptionList.scss';

import OptionItem from '../OptionItem';
import { Context } from '../../contexts';

const OptionList = () => {
  const { state: { options } } = useContext(Context);

  const optionList = [
    {
      id: 0,
      name: 'Start at login',
      isChecked: options.startAtLogin,
      action: (checked) => {
        ipcRenderer.send(IPC_EVENT.OPTION, {
          startAtLogin: checked
        });
      }
    },
    {
      id: 1,
      name: 'Notification',
      isChecked: options.notification,
      action: (checked) => {
        ipcRenderer.send(IPC_EVENT.OPTION, {
          notification: checked
        });
      }
    },
    {
      id: 2,
      name: 'Sound',
      isChecked: options.sound,
      action: (checked) => {
        ipcRenderer.send(IPC_EVENT.OPTION, {
          sound: checked
        });
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