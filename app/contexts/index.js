import React, { Component, createContext } from 'react';
import { ipcRenderer }from 'electron';

const Context = createContext();
const { Provider: ContextProvider } = Context;

class Provider extends Component {
  constructor(props) {
    super(props);

    const initialState = ipcRenderer.sendSync('getInitialState');
    const { reminderInterval, breakDuration, options } = initialState;

    this.state = {
      reminderInterval,
      breakDuration,
      options,
      showBreakWindow: false
    };

    this.actions = {
      setOptions: (options) => {
        this.setState({ options });
      },
      setReminderInterval: (reminderInterval) => {
        this.setState({ reminderInterval });
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
    ipcRenderer.on('updateOptions', this.ipcRendererListener);
  }

  componentWillUnmount() {
    ipcRenderer.removeListener('updateOptions', this.ipcRendererListener);
  }

  ipcRendererListener = (event, options) => {
    this.actions.setOptions(options);
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