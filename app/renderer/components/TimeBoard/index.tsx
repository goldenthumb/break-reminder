import React from 'react';

import { msToTime } from '../../../lib/utils';
import TimeLabel from '../TimeLabel';

const css = require('./TimeBoard.scss');

interface TimeBoardProps {
    time: number;
}

export default function TimeBoard({ time }: TimeBoardProps) {
    const [hour, minute, second] = msToTime(time);

    return (
        <div className={css.timeBoard}>
            <TimeLabel type="hour" time={String(hour)} />
            <TimeLabel type="minute" time={String(minute).padStart(2, '0')} />
            <TimeLabel type="second" time={String(second).padStart(2, '0')} />
        </div>
    );
}
