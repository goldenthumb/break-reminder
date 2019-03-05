import React, { Component } from 'react';
import { remote } from 'electron';

import { compose } from '../lib/utils';
import { useConsumer } from '../contexts';
import withGetInitInfo from '../components/withGetInitInfo';

const { BrowserWindow, screen } = remote;

let blockWindow = null;

class Main extends Component {
  constructor(props) {
    super(props);

    this.timer = null;
  }

  componentDidMount() {
    const { ctx: { state } } = this.props;
    const { intervalTime, config } = state;

    this.timer = setTimeout(() => {
      for (const { size } of screen.getAllDisplays()) {
        blockWindow = new BrowserWindow({
          resizable: false,
          show: false,
          ...size
        });

        blockWindow.loadURL(`${config.renderPath}?page=block`);

        blockWindow.once('ready-to-show', () => {
          blockWindow.show();
        });
      }
    }, intervalTime);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {

    return (
      <div>Main</div>
    )
  }
}

export default compose(withGetInitInfo, useConsumer)(Main);