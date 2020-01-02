import React, { createContext, useState, useEffect, useMemo } from 'react';
import { ipcRenderer } from 'electron';
import { IPC_EVENT } from '../../lib/enums';
import { BLOCKER_STATUS } from '../../main/Blocker';
import { Preferences, Options } from '../../main/store';
import Duration from '../../lib/Duration';
import Notifier from '../../lib/Notifier';
import BlockerOpenScheduler from '../../lib/BlockerOpenScheduler';

interface AppContext {
    state: ContextState;
    actions: ContextActions;
    services: {
        blockerOpenScheduler: BlockerOpenScheduler;
    };
}

interface ContextState extends Preferences {
    isWorkingMode: boolean;
}

interface ContextActions {
    setOptions: (options: Options) => void;
    setReminderInterval: (ms: number) => void;
    setBreakDuration: (ms: number) => void;
}

interface ViewerProps {
    children: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const Context = createContext<AppContext>(null!);
const { Provider: ContextProvider } = Context;

function Provider({ children }: ViewerProps) {
    const preferences: Preferences = ipcRenderer.sendSync(IPC_EVENT.GET_PREFERENCES);
    const [reminderInterval, setReminderInterval] = useState(preferences.reminderInterval);
    const [breakDuration, setBreakDuration] = useState(preferences.breakDuration);
    const [options, setOptions] = useState(preferences.options);
    const [isWorkingMode, setWorkingMode] = useState(true);
    const duration = useMemo(() => new Duration(), []);
    const notifier = useMemo(() => new Notifier('Preparing break ...', {
        body: 'Break will commence in 60 seconds.',
        silent: !preferences.options.sound,
    }), []);

    const blockerOpenScheduler = useMemo(() => new BlockerOpenScheduler(duration, notifier), []);

    useEffect(() => {
        ipcRenderer.on(IPC_EVENT.BLOCKER, listener);

        return () => {
            ipcRenderer.removeListener(IPC_EVENT.BLOCKER, listener);
        };

        function listener(event: Electron.IpcMessageEvent, status: BLOCKER_STATUS) {
            const isWorkingMode = status === BLOCKER_STATUS.CLOSE;

            if (isWorkingMode) {
                const { reminderInterval } = ipcRenderer.sendSync(IPC_EVENT.GET_PREFERENCES);
                setReminderInterval(reminderInterval);
            }

            setWorkingMode(isWorkingMode);
        }
    }, []);

    useEffect(() => {
        notifier.setActive(options.notification);
        notifier.setOption({ silent: !options.sound });
    }, [options]);

    useEffect(() => {
        ipcRenderer.send(IPC_EVENT.SET_PREFERENCES, {
            reminderInterval, breakDuration, options,
        });
    }, [reminderInterval, breakDuration, options]);

    return (
        <ContextProvider
            value={{
                state: { reminderInterval, breakDuration, options, isWorkingMode },
                actions: { setReminderInterval, setBreakDuration, setOptions },
                services: { blockerOpenScheduler },
            }}
        >
            {children}
        </ContextProvider>
    );
}

export { Provider, Context };
