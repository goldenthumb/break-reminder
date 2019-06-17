import React, { useEffect, useContext } from 'react';
import { ipcRenderer } from 'electron';
import { IPC_EVENT } from '../../lib/enums';
import { BREAK_WINDOW } from '../../windows/BreakWindow';
import scheduler, { SCHEDULER } from '../../lib/scheduler';
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
    scheduler.once(SCHEDULER.FINISH_WORKING, () => {
      ipcRenderer.send(
        IPC_EVENT.BREAK_WINDOW,
        BREAK_WINDOW.OPEN
      );
    });

    return () => {
      scheduler.clearWorkingDuration();
    }
  }, [showBreakWindow, reminderInterval]);

  useEffect(() => {
    if (!showBreakWindow) return;

    scheduler.setBreakDuration(breakDuration);
    scheduler.once(SCHEDULER.FINISH_BREAK, () => {
      ipcRenderer.send(
        IPC_EVENT.BREAK_WINDOW,
        BREAK_WINDOW.CLOSE
      );
    });

    return () => {
      scheduler.clearBreakDuration();
    }
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
