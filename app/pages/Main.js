import React, { useEffect, useContext } from 'react';
import { remote } from 'electron';

import { delay } from '../lib/utils';

import { Context } from '../contexts';
import useGetConfig from '../hooks/useGetConfig';

import Header from '../components/Header';

const { BrowserWindow, screen } = remote;

const Main = () => {
  const [config] = useGetConfig();
  const { state, actions } = useContext(Context);
  const { blockWindows, intervalTime, breakTime } = state;

  const openBlockWindows = async () => {
    if (!config || blockWindows) return;

    await delay(intervalTime);

    const nextBlockWindows = {};

    for (const { id, size } of screen.getAllDisplays()) {
      const window = new BrowserWindow({
        resizable: false,
        show: false,
        ...size
      });

      window.loadURL(`${config.renderPath}?page=block`);
      window.once('ready-to-show', window.show);

      nextBlockWindows[id] = { id, window };
    }

    actions.setBlockWindows(nextBlockWindows);
  };

  const closeBlockWindows = async () => {
    if (!blockWindows) return;

    await delay(breakTime);

    Object.values(blockWindows).map(({ window }) => window.close());
    actions.setBlockWindows(null);
  };

  useEffect(() => {
    openBlockWindows();
    closeBlockWindows();
  }, [config, blockWindows, intervalTime, breakTime]);

  return <>
    <Header />
  </>
};

export default Main;