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
  const { showBreakWindow, reminderInterval, breakDuration } = state;

  useEffect(() => {
    if (showBreakWindow) return;

    scheduler.setWorkingDuration(reminderInterval);
    return () => scheduler.clearWorkingDuration();
  }, [showBreakWindow, reminderInterval]);

  useEffect(() => {
    if (!showBreakWindow) return;

    scheduler.setBreakDuration(breakDuration);
    return () => scheduler.clearBreakDuration();
  }, [showBreakWindow, breakDuration]);

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
