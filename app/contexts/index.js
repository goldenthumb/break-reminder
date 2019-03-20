import React, { Component, createContext } from 'react';
import { ipcRenderer } from 'electron';
import { IPC_EVENT } from '../lib/constants';

const Context = createContext();
const { Provider: ContextProvider } = Context;

class Provider extends Component {
  constructor(props) {
    super(props);

    const initialState = ipcRenderer.sendSync(IPC_EVENT.INITIAL_STATE);
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
    ipcRenderer.on(IPC_EVENT.OPTION, this.optionListener);
    ipcRenderer.on(IPC_EVENT.BREAK_WINDOW, this.breakWindowListener);
  }

  componentWillUnmount() {
    ipcRenderer.removeListener(IPC_EVENT.OPTION, this.optionListener);
    ipcRenderer.removeListener(IPC_EVENT.BREAK_WINDOW, this.breakWindowListener);
  }

  optionListener = (event, options) => {
    this.actions.setOptions(options);
  };

  breakWindowListener = (event, { status }) => {
    if (status === 'open') {
      this.actions.showBreakWindow();
    }

    if (status === 'close') {
      this.actions.closeBreakWindow();
    }
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