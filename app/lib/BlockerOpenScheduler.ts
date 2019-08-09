import { ipcRenderer } from 'electron';
import { IPC_EVENT, MILLISECOND } from './enums';
import { BLOCKER_STATUS } from '../main/Blocker';
import Duration from './Duration';
import Notifier from './Notifier';

class BlockerOpenScheduler {
    private _duration: Duration;
    private _notifier: Notifier;
    private _leftTime: Number = 0;
    private _isPause: boolean = true;
    private _notifierTimer: NodeJS.Timer | null = null;

    constructor(duration: Duration, notifier: Notifier) {
        this._duration = duration;
        this._notifier = notifier;
    }

    setDuration(delay: number) {
        this._isPause = false;
        this.clearDuration();

        this._duration.time(delay).callback(() => {
            ipcRenderer.send(IPC_EVENT.BLOCKER, BLOCKER_STATUS.OPEN);
        });

        if (delay - MILLISECOND.MIN < 0) return;

        this._notifierTimer = setTimeout(
            () => this._notifier.run(),
            delay - MILLISECOND.MIN
        );
    }

    clearDuration() {
        if (this._notifierTimer) {
            clearTimeout(this._notifierTimer);
        }

        this._duration.clear();
    }

    pause(leftTime: number) {
        if (this._isPause) return;
        this._isPause = true;
        this._leftTime = leftTime;
        this.clearDuration();
    }

    resume() {
        if (!this._isPause) return;
        this.setDuration(Number(this._leftTime));
    }
}

export default BlockerOpenScheduler;
