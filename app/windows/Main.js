import React, { useEffect, useContext } from 'react';

import breakPlanner from '../lib/breakPlanner';

import { Context } from '../contexts';

import Header from '../components/Header';
import TimeBoard from '../components/TimeBoard';
import OptionList from '../components/OptionList';

const Main = () => {
  const { state, actions } = useContext(Context);
  const { showBreakWindow, reminderInterval, breakDuration } = state;

  useEffect(() => {
    if (showBreakWindow) return;

    breakPlanner.startWorking(reminderInterval);

    breakPlanner.on('endWorking', () => {
      actions.showBreakWindow();
    });

    return () => breakPlanner.clearWorkingTimer();
  }, [showBreakWindow, reminderInterval]);

  useEffect(() => {
    if (!showBreakWindow) return;

    breakPlanner.startBreak(breakDuration);

    breakPlanner.on('endBreak', () => {
      actions.closeBreakWindow();
    });

    return () => breakPlanner.clearBreakTimer();
  }, [showBreakWindow, breakDuration]);

  return <>
    <Header />
    <TimeBoard />
    <OptionList />
  </>
};

export default Main;