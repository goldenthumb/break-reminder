import React, { useContext } from 'react';

import { Context } from '../../contexts';
import TimePicker from '../TimePicker';

export default function WorkTimePicker() {
    const { state: { breakDuration }, actions } = useContext(Context);

    return (
        <TimePicker
            label='Break Time'
            time={breakDuration}
            action={actions.setBreakDuration}
        />
    );
}
