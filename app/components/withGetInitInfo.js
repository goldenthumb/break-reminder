import React, { Component } from 'react';
import { ipcRenderer }from 'electron';

import { useConsumer } from '../contexts';

const withGetInitInfo = (WrappedComponent) => {
  class RequestInitInfo extends Component {
    constructor(props) {
      super(props);

      const { ctx: { actions } } = props;

      ipcRenderer.send('requestInitInfo');

      ipcRenderer.on('initInfo', (event, arg) => {
        actions.setConfig(arg);
      });
    }

    render() {
      const { ctx: { state } } = this.props;

      return (
        state.config && <WrappedComponent {...this.props} />
      );
    }
  }

  return useConsumer(RequestInitInfo);
};

export default withGetInitInfo;