import React from 'react';

import Body from '../components/Body';
import BreakTimePicker from '../components/BreakTimePicker';
import Header from '../components/Header';
import OptionList from '../components/OptionList';
import Timer from '../components/Timer';
import WorkTimePicker from '../components/WorkTimePicker';
import { Provider } from '../contexts';

export default function Main() {
    return (
        <Provider>
            <Header />
            <Body>
                <Timer />
                <WorkTimePicker />
                <BreakTimePicker />
                <OptionList />
            </Body>
        </Provider>
    );
}
