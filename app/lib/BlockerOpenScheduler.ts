import { ipcRenderer } from 'electron';
import { IPC_EVENT, MILLISECOND } from './enums';
import { BLOCKER_STATUS } from '../main/Blocker';
import Duration from './Duration';
import Notifier from './Notifier';

class BlockerOpenScheduler {
    private _duration: Duration;
    private _notifier: Notifier;
    private _startTime: Number = 0;
    private _isPause: boolean = true;
    private _notifierTimer: NodeJS.Timer | null = null;

    constructor(duration: Duration, notifier: Notifier) {
        this._duration = duration;
        this._notifier = notifier;
    }

    getLeftDuration() {
        return Number(this._startTime) - Date.now();
    }

    setDuration(delay: number) {
        this.clearDuration();

        this._isPause = false;
        this._startTime = Date.now() + delay;

        this._duration.time(delay).callback(() => {
            ipcRenderer.send(IPC_EVENT.BLOCKER, BLOCKER_STATUS.OPEN);
        });

        if (delay - MILLISECOND.MIN > 0)  {
            this._notifierTimer = setTimeout(
                () => this._notifier.run(),
                delay - MILLISECOND.MIN
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
        if (this._isPause) return;
        this._isPause = true;
        this.clearDuration();
    }

    resume(leftTime: number) {
        if (!this._isPause) return;
        this.setDuration(leftTime);
    }
}

export default BlockerOpenScheduler;
