import { ipcRenderer } from 'electron';

import { BLOCKER_STATUS } from '../main/Blocker';
import Duration from './Duration';
import { IPC_EVENT, MILLISECOND } from './enums';
import Notifier from './Notifier';

class BlockerOpenScheduler {
    private _duration: Duration;

    private _notifier: Notifier;

    private _startTime = 0;

    private _isRunning = false;

    private _notifierTimer: NodeJS.Timer | null = null;

    constructor(duration: Duration, notifier: Notifier) {
        this._duration = duration;
        this._notifier = notifier;
    }

    isRunning() {
        return this._isRunning;
    }

    getLeftDuration() {
        return Math.max(Number(this._startTime) - Date.now(), 0);
    }

    setDuration(delay: number) {
        this.clearDuration();

        this._isRunning = true;
        this._startTime = Date.now() + delay;

        this._duration.time(delay).callback(() => {
            ipcRenderer.send(IPC_EVENT.BLOCKER, BLOCKER_STATUS.OPEN);
        });

        if (delay - MILLISECOND.MIN > 0) {
            this._notifierTimer = setTimeout(
                () => this._notifier.run(),
                delay - MILLISECOND.MIN,
            );
        }
    }

    clearDuration() {
        if (this._notifierTimer) {
            clearTimeout(this._notifierTimer);
        }

        this._duration.clear();
    }

    pause() {
        if (!this._isRunning) return;
        this._isRunning = false;
        this.clearDuration();
    }

    resume(leftTime: number) {
        if (this._isRunning) return;
        this.setDuration(leftTime);
    }
}

export default BlockerOpenScheduler;
