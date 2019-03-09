import React, { useEffect, useContext } from 'react';

import delay from 'delay';
import { openBlockWindow, closeBlockWindow } from '../lib/blockWinManager';

import { Context } from '../contexts';
import useGetConfig from '../hooks/useGetConfig';

import Header from '../components/Header';
import TimeBoard from '../components/TimeBoard';

const Main = () => {
  const [config] = useGetConfig();
  const { state, actions } = useContext(Context);
  const { blockWindows, breakInterval, breakDuration } = state;

  const setTimer = async () => {
    if (!config || blockWindows) return;

    const timer = await delay(breakInterval);
    const nextBlockWindows = openBlockWindow(config.renderPath);

    actions.setBlockWindows(nextBlockWindows);

    return () => timer.clear();
  };

  const closeBlockWindows = async () => {
    if (!blockWindows) return;

    const timer = await delay(breakDuration);

    closeBlockWindow(blockWindows);
    actions.setBlockWindows(null);

    return () => timer.clear();
  };

  useEffect(() => {
    setTimer();
  }, [config, blockWindows, breakInterval]);

  useEffect(() => {
    closeBlockWindows();
  }, [blockWindows, breakDuration]);

  return <>
    <Header />
    <TimeBoard />
  </>
};

export default Main;