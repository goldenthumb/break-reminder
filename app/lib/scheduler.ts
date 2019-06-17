import { EventEmitter } from 'events';
import notifier from './notifier';

export enum SCHEDULER {
  FINISH_WORKING = 'finish.working.duration',
  FINISH_BREAK = 'finish.break',
}

class Scheduler extends EventEmitter {
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
      this.emit(SCHEDULER.FINISH_WORKING);
    }, duration);

    // TODO: 고민 필요...
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
      this.emit(SCHEDULER.FINISH_BREAK);
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
