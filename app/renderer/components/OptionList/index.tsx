import React, { useContext } from 'react';
const css = require('./OptionList.scss');

import { Context } from '../../contexts';
import OptionItem from '../OptionItem';

export default function OptionList() {
    const { state: { options }, actions } = useContext(Context);

    const optionList = [
        {
            id: 'option-01',
            name: 'Start at login',
            isChecked: options.startAtLogin,
            action: (checked: boolean) => {
                actions.setOptions({
                    ...options,
                    startAtLogin: checked
                });
            }
        },
        {
            id: 'option-02',
            name: 'Notification',
            isChecked: options.notification,
            action: (checked: boolean) => {
                actions.setOptions({
                    ...options,
                    notification: checked
                });
            }
        },
        {
            id: 'option-03',
            name: 'Sound',
            isChecked: options.sound,
            action: (checked: boolean) => {
                actions.setOptions({
                    ...options,
                    sound: checked
                });
            }
        }
    ];

    return (
        <div className={css.optionList}>
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
}
