import React, { useContext } from 'react';

import { Context } from '../../contexts';
import TimePicker from '../TimePicker';

export default function WorkTimePicker() {
    const { state: { reminderInterval }, actions } = useContext(Context);

    return (
        <TimePicker
            label="Work Time"
            time={reminderInterval}
            action={actions.setReminderInterval}
        />
    );
}
