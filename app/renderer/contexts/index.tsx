import React, { createContext, useState, useEffect, useMemo } from 'react';
import { ipcRenderer } from 'electron';
import { IPC_EVENT } from '../../lib/enums';
import { BLOCKER_STATUS } from '../../main/Blocker';
import { Preferences, Options } from '../../main/store';
import BlockerOpenScheduler from '../../lib/BlockerOpenScheduler';
import Duration from '../../lib/Duration';
import Notifier from '../../lib/Notifier';

interface AppContext {
  state: ContextState;
  actions: ContextActions;
  services: {
    blockerOpenScheduler: BlockerOpenScheduler
  };
}

interface ContextState extends Preferences {
  isWorkingDuration: boolean;
}

interface ContextActions {
  setOptions: (options: Options) => void;
  setReminderInterval: (ms: number) => void;
  setBreakDuration: (ms: number) => void;
}

interface ViewerProps {
  children: React.ReactNode;
}

const Context = createContext<AppContext>(null!);
const { Provider: ContextProvider } = Context;

function Provider({ children }: ViewerProps) {
  const preferences: Preferences = ipcRenderer.sendSync(IPC_EVENT.GET_PREFERENCES);
  const [reminderInterval, setReminderInterval] = useState(preferences.reminderInterval);
  const [breakDuration, setBreakDuration] = useState(preferences.breakDuration);
  const [options, setOptions] = useState(preferences.options);
  const [isWorkingDuration, setWorkingDuration] = useState(true);
  const duration = useMemo(() => new Duration(), []);
  const notifier = useMemo(() => new Notifier('Preparing break ...', {
    body: 'Break will commence in 60 seconds.',
    silent: !preferences.options.sound
  }), []);
  const blockerOpenScheduler = useMemo(() => new BlockerOpenScheduler(duration, notifier), []);

  useEffect(() => {
    ipcRenderer.on(IPC_EVENT.BLOCKER, blockerListener);

    return () => {
      ipcRenderer.removeListener(IPC_EVENT.BLOCKER, blockerListener);
    }
  }, []);

  useEffect(() => {
    notifier.setActive(options.notification);
    notifier.setOption({ silent: !options.sound });
  }, [options]);

  useEffect(() => {
    ipcRenderer.send(IPC_EVENT.SET_PREFERENCES, {
      reminderInterval, breakDuration, options
    });
  }, [reminderInterval, breakDuration, options]);

  const blockerListener = (
    event: Electron.IpcMessageEvent,
    status: BLOCKER_STATUS
  ) => {
    const isWorkingMode = status === BLOCKER_STATUS.CLOSE;

    if (isWorkingMode) {
      const { reminderInterval } = ipcRenderer.sendSync(IPC_EVENT.GET_PREFERENCES);
      setReminderInterval(reminderInterval);
    }

    setWorkingDuration(isWorkingMode);
  };

  return (
    <ContextProvider
      value={{
        state: { reminderInterval, breakDuration, options, isWorkingDuration },
        actions: { setReminderInterval, setBreakDuration, setOptions },
        services: { blockerOpenScheduler }
      }}>
      {children}
    </ContextProvider>
  );
}

export { Provider, Context };
