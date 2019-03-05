import React, { Component } from 'react';
import { remote } from 'electron';

import { compose, delay } from '../lib/utils';
import { useConsumer } from '../contexts';
import withGetInitInfo from '../components/withGetInitInfo';

const { BrowserWindow, screen } = remote;

class Main extends Component {
  componentDidMount() {
    this.openBlockWindows();
  }

  componentDidUpdate(prevProps) {
    const { ctx: { state } } = this.props;
    const { ctx: { state: prevState } } = prevProps;

    if (!state.blockWindows && prevState.blockWindows) {
      this.openBlockWindows();
    }

    if (state.blockWindows && !prevState.blockWindows) {
      this.closeBlockWindows();
    }
  }

  async openBlockWindows() {
    const { ctx: { state, actions } } = this.props;
    const { intervalTime, config } = state;

    await delay(intervalTime);

    const blockWindows = {};

    for (const { id, size } of screen.getAllDisplays()) {
      const window = new BrowserWindow({
        resizable: false,
        show: false,
        ...size
      });

      window.loadURL(`${config.renderPath}?page=block`);
      window.once('ready-to-show', window.show);

      blockWindows[id] = { id, window };
    }

    actions.setBlockWindows(blockWindows);
  }

  async closeBlockWindows() {
    const { ctx: { state, actions } } = this.props;
    const { blockWindows, breakTime } = state;

    await delay(breakTime);

    Object.values(blockWindows).map(({ window }) => window.close());
    actions.setBlockWindows(null);
  }

  render() {
    return (
      <div>Main</div>
    )
  }
}

export default compose(withGetInitInfo, useConsumer)(Main);