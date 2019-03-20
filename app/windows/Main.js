import React, { useEffect, useContext } from 'react';
import { ipcRenderer } from 'electron';
import { IPC_EVENT } from '../lib/constants';
import { Context } from '../contexts';

import Header from '../components/Header';
import TimeBoard from '../components/TimeBoard';
import OptionList from '../components/OptionList';

const Main = () => {
  const { state } = useContext(Context);
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
    <TimeBoard />
    <OptionList />
  </>
};

export default Main;