import React, { useEffect, useContext } from 'react';
import scheduler from '../../lib/scheduler';
import { Context, AppContext } from '../contexts';

import Header from '../components/Header';
import Body from '../components/Body';
import TimeBoard from '../components/TimeBoard';
import BreakTimePicker from '../components/BreakTimePicker';
import OptionList from '../components/OptionList';

const Main = () => {
  const { state } = useContext(Context) as AppContext;
  const { isWorkingDuration, reminderInterval, breakDuration } = state;

  useEffect(() => {
    if (!isWorkingDuration) return;

    scheduler.setWorkingDuration(reminderInterval);
    return () => scheduler.clearWorkingDuration();
  }, [isWorkingDuration, reminderInterval]);

  useEffect(() => {
    if (isWorkingDuration) return;

    scheduler.setBreakDuration(breakDuration);
    return () => scheduler.clearBreakDuration();
  }, [isWorkingDuration, breakDuration]);

  return <>
    <Header />
    <Body>
      <TimeBoard />
      <BreakTimePicker />
      <OptionList />
    </Body>
  </>;
};

export default Main;
