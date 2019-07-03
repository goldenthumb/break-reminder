import React, { Component, createContext } from 'react';
import { ipcRenderer } from 'electron';
import { IPC_EVENT } from '../../lib/enums';
import { BLOCKER_STATUS } from '../../mainProcess/Blocker';
import notifier from '../../lib/notifier';

import { Preferences, Options } from '../../mainProcess/store';

interface AppContext {
  state: ContextState;
  actions: ContextActions;
}

interface ContextState extends Preferences {
  isWorkingDuration: boolean;
}

interface ContextActions {
  setOptions: (options: Options) => void;
  setReminderInterval: (ms: number) => void;
  setBreakDuration: (ms: number) => void;
  setWorkingDuration: (active: boolean) => void;
}

const Context = createContext<AppContext>(null!);
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
      isWorkingDuration: true
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
      setWorkingDuration: (active: boolean) => {
        this.setState({
          isWorkingDuration: active
        });
      },
    };
  }

  componentDidMount() {
    ipcRenderer.on(IPC_EVENT.REMINDER_INTERVAL, this.reminderTimeListener);
    ipcRenderer.on(IPC_EVENT.BREAK_DURATION, this.breakTimeListener);
    ipcRenderer.on(IPC_EVENT.OPTION, this.optionListener);
    ipcRenderer.on(IPC_EVENT.BLOCKER, this.blockerListener);
  }

  componentWillUnmount() {
    ipcRenderer.removeListener(IPC_EVENT.REMINDER_INTERVAL, this.reminderTimeListener);
    ipcRenderer.removeListener(IPC_EVENT.BREAK_DURATION, this.breakTimeListener);
    ipcRenderer.removeListener(IPC_EVENT.OPTION, this.optionListener);
    ipcRenderer.removeListener(IPC_EVENT.BLOCKER, this.blockerListener);
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

  blockerListener = (event: Electron.IpcMessageEvent, status: BLOCKER_STATUS) => {
    if (status === BLOCKER_STATUS.OPEN) {
      this.actions.setWorkingDuration(false);
    }

    if (status === BLOCKER_STATUS.CLOSE) {
      this.actions.setWorkingDuration(true);
    }
  }

  render() {
    const { state, actions } = this;
    const { children } = this.props;

    return (
      <ContextProvider value={{ state, actions }}>
        {children}
      </ContextProvider>
    );
  }
}

export { Provider, Context };
