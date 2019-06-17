import React, { Component, createContext } from 'react';
import { ipcRenderer } from 'electron';
import { IPC_EVENT } from '../../lib/enums';
import { BREAK_WINDOW } from '../../windows/BreakWindow';
import notifier from '../../lib/notifier';

import { Preferences, Options } from '../../store';

export interface AppContext {
  state: ContextState;
  actions: ContextActions;
}

interface ContextState extends Preferences {
  showBreakWindow: boolean;
}

interface ContextActions {
  setOptions: (options: Options) => void;
  setReminderInterval: (ms: number) => void;
  setBreakDuration: (ms: number) => void;
  showBreakWindow: () => void;
  closeBreakWindow: () => void;
}

const Context = createContext({});
const { Provider: ContextProvider } = Context;

class Provider extends Component {
  public state: ContextState;
  public actions: ContextActions;

  constructor(props: {}) {
    super(props);

    const preferences = ipcRenderer.sendSync(IPC_EVENT.PREFERENCES);
    const { reminderInterval, breakDuration, options } = preferences;

    this.state = {
      reminderInterval,
      breakDuration,
      options,
      showBreakWindow: false
    };

    this.actions = {
      setOptions: (options: Options) => {
        this.setState({ options });
      },
      setReminderInterval: (ms: number) => {
        this.setState({
          reminderInterval: ms
        });
      },
      setBreakDuration: (ms: number) => {
        this.setState({
          breakDuration: ms
        });
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
    ipcRenderer.on(IPC_EVENT.REMINDER_INTERVAL, this.reminderTimeListener);
    ipcRenderer.on(IPC_EVENT.BREAK_DURATION, this.breakTimeListener);
    ipcRenderer.on(IPC_EVENT.OPTION, this.optionListener);
    ipcRenderer.on(IPC_EVENT.BREAK_WINDOW, this.breakWindowListener);
  }

  componentWillUnmount() {
    ipcRenderer.removeListener(IPC_EVENT.REMINDER_INTERVAL, this.reminderTimeListener);
    ipcRenderer.removeListener(IPC_EVENT.BREAK_DURATION, this.breakTimeListener);
    ipcRenderer.removeListener(IPC_EVENT.OPTION, this.optionListener);
    ipcRenderer.removeListener(IPC_EVENT.BREAK_WINDOW, this.breakWindowListener);
  }

  reminderTimeListener = (event: Electron.IpcMessageEvent, ms: number) => {
    this.actions.setReminderInterval(ms);
  }

  breakTimeListener = (event: Electron.IpcMessageEvent, ms: number) => {
    this.actions.setBreakDuration(ms);
  }

  optionListener = (event: Electron.IpcMessageEvent, options: Options) => {
    this.actions.setOptions(options);

    notifier.setNotification({
      options: {
        silent: !options.sound
      }
    });
  }

  breakWindowListener = (event: Electron.IpcMessageEvent, status: BREAK_WINDOW) => {
    if (status === BREAK_WINDOW.OPEN) {
      this.actions.showBreakWindow();
    }

    if (status === BREAK_WINDOW.CLOSE) {
      this.actions.closeBreakWindow();
    }
  }

  render() {
    const { state, actions } = this;
    const { children } = this.props;
    const value: AppContext = { state, actions };

    return (
      <ContextProvider value={value}>
        {children}
      </ContextProvider>
    );
  }
}

export { Provider, Context };
