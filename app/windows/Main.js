import React, { useEffect, useContext } from 'react';

import delay from 'delay';
import breakWindow from '../lib/breakWindow';

import { Context } from '../contexts';
import useGetConfig from '../hooks/useGetConfig';

import Header from '../components/Header';
import TimeBoard from '../components/TimeBoard';
import OptionList from '../components/OptionList';

const Main = () => {
  const [config] = useGetConfig();
  const { state, actions } = useContext(Context);
  const { showBreakWindow, breakInterval, breakDuration } = state;

  const setBreakIntervalTimer = async () => {
    if (!config || showBreakWindow) return;

    const timer = await delay(breakInterval);

    breakWindow.open({ loadUrl: `${config.renderPath}?window=break` });
    actions.showBreakWindow();

    return () => timer.clear();
  };

  const setBreakDurationTimer = async () => {
    if (!showBreakWindow) return;

    const timer = await delay(breakDuration);

    breakWindow.close();
    actions.closeBreakWindow();

    return () => timer.clear();
  };

  useEffect(() => {
    setBreakIntervalTimer();
  }, [config, showBreakWindow, breakInterval]);

  useEffect(() => {
    setBreakDurationTimer();
  }, [showBreakWindow, breakDuration]);

  return <>
    <Header />
    <TimeBoard />
    <OptionList />
  </>
};

export default Main;