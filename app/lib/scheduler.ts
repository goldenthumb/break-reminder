import { ipcRenderer } from 'electron';
import { IPC_EVENT } from './enums';
import { BLOCKER_STATUS } from '../mainProcess/Blocker';
import notifier from './notifier';

class Scheduler {
  public workingDuration: number = 0;
  public breakDuration: number = 0;
  private _workingTimer: NodeJS.Timer | null = null;
  private _breakTimer: NodeJS.Timer | null = null;

  setWorkingDuration(duration: number) {
    if (this._workingTimer) {
      clearTimeout(this._workingTimer);
    }

    this.workingDuration = duration;
    this._workingTimer = setTimeout(() => {
      ipcRenderer.send(IPC_EVENT.BLOCKER, BLOCKER_STATUS.OPEN);
    }, duration);

    // TODO: 고민 중...
    notifier.run(duration);
  }

  clearWorkingDuration() {
    if (this._workingTimer) {
      clearTimeout(this._workingTimer);
    }
  }

  setBreakDuration(duration: number) {
    if (this._breakTimer) {
      clearTimeout(this._breakTimer);
    }

    this.breakDuration = duration;
    this._breakTimer = setTimeout(() => {
      ipcRenderer.send(IPC_EVENT.BLOCKER, BLOCKER_STATUS.CLOSE);
    }, duration);
  }

  clearBreakDuration() {
    if (this._breakTimer) {
      clearTimeout(this._breakTimer);
    }
  }
}

const scheduler = new Scheduler();
export default scheduler;
