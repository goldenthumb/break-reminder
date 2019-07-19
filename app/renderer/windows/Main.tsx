import React, { useEffect, useContext } from 'react';
import { Context } from '../contexts';

import Header from '../components/Header';
import Body from '../components/Body';
import TimeBoard from '../components/TimeBoard';
import BreakTimePicker from '../components/BreakTimePicker';
import OptionList from '../components/OptionList';

export default function Main() {
  const { state, services: { blockerOpenScheduler } } = useContext(Context);
  const { isWorkingDuration, reminderInterval } = state;

  useEffect(() => {
    if (!isWorkingDuration) return;

    blockerOpenScheduler.setDuration(reminderInterval);
    return () => blockerOpenScheduler.clearDuration();
  }, [isWorkingDuration, reminderInterval]);

  return <>
    <Header />
    <Body>
      <TimeBoard />
      <BreakTimePicker />
      <OptionList />
    </Body>
  </>;
}
