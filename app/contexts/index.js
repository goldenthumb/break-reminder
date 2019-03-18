import React, { Component, createContext } from 'react';
import { ipcRenderer } from 'electron';
import breakWindow, { BREAK_WINDOW_STATUS } from '../lib/breakWindow';
import breakPlanner from '../lib/breakPlanner';

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
    ipcRenderer.on('updateOptions', this.optionListener);
    ipcRenderer.on('breakWindow', this.breakWindowListener);
  }

  componentWillUnmount() {
    ipcRenderer.removeListener('updateOptions', this.optionListener);
    ipcRenderer.removeListener('breakWindow', this.breakWindowListener);
  }

  optionListener = (event, options) => {
    this.actions.setOptions(options);
  };

  breakWindowListener = (event, { status }) => {
    if (status === BREAK_WINDOW_STATUS.CLOSE) {
      breakPlanner.clearBreakTimer();
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