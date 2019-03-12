import React, { Component, createContext } from 'react';
import { ipcRenderer }from 'electron';



const Context = createContext();
const { Provider: ContextProvider } = Context;

class Provider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      config: null,
      breakInterval: 20 * 60 * 1000,
      breakDuration: 20 * 1000,
      showBreakWindow: false
    };

    this.actions = {
      setConfig: (config) => {
        this.setState({ config });
      },
      setBreakInterval: (breakInterval) => {
        this.setState({ breakInterval });
      },
      setBreakDuration: (breakDuration) => {
        this.setState({ breakDuration });
      },
      showBreakWindow: () => {
        this.setState({
          showBreakWindow: true
        });
      },
      closeBreakWindow: () => {
        this.setState({
          showBreakWindow: false
        });
      }
    };
  }

  componentDidMount() {
    ipcRenderer.send('requestConfig');
    ipcRenderer.on('config', this.ipcRendererListener);
  }

  componentWillUnmount() {
    ipcRenderer.removeListener('config', this.ipcRendererListener);
  }

  ipcRendererListener = (event, config) => {
    this.actions.setConfig(config);
  };

  render() {
    const { state, actions } = this;
    const { children } = this.props;
    const value = { state, actions };

    return (
      <ContextProvider value={value}>
        {children}
      </ContextProvider>
    );
  }
}

export { Provider, Context };