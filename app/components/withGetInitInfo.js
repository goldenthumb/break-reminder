import React, { Component } from 'react';
import { ipcRenderer }from 'electron';

import { useConsumer } from '../contexts';

const withGetInitInfo = (WrappedComponent) => {
  class RequestInitInfo extends Component {
    constructor(props) {
      super(props);

      ipcRenderer.send('requestInitInfo');

      ipcRenderer.on('initInfo', this.initInfoListener);
    }

    componentWillUnmount() {
      ipcRenderer.removeListener('initInfo', this.initInfoListener);
    }

    initInfoListener = (event, arg) => {
      const { ctx: { actions } } = this.props;

      actions.setConfig(arg);
    };

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