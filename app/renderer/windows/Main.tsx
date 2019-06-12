import React, { useEffect, useContext } from 'react';
import { ipcRenderer } from 'electron';
import { IPC_EVENT } from '../../lib/enums';
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

    ipcRenderer.send(IPC_EVENT.BREAK_WINDOW, {
      status: 'open',
      delay: reminderInterval
    });

  }, [showBreakWindow, reminderInterval]);

  useEffect(() => {
    if (!showBreakWindow) return;

    ipcRenderer.send(IPC_EVENT.BREAK_WINDOW, {
      status: 'close',
      delay: breakDuration
    });

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
