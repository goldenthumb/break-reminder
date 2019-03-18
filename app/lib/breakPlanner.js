import EventEmitter from 'event-emitter';

import timerStore from './timerStore';
import breakWindow from './breakWindow';

class BreakPlanner {
  constructor() {
    this._emitter = new EventEmitter();
  }

  on(eventName, listener) {
    this._emitter.on(eventName, listener);
  }

  once(eventName, listener) {
    this._emitter.once(eventName, listener);
  }

  startWorking(ms) {
    timerStore.clear('working');

    const workingTimer = setTimeout(() => {
      breakWindow.open();
      this._emitter.emit('endWorking');
    }, ms);

    timerStore.set('working', workingTimer);
  }

  clearWorkingTimer() {
    timerStore.clear('working');
  }

  startBreak(ms) {
    timerStore.clear('break');

    const breakTimer = setTimeout(() => {
      breakWindow.close();
      this._emitter.emit('endBreak');
    }, ms);

    timerStore.set('break', breakTimer);
  }

  clearBreakTimer() {
    timerStore.clear('break');
  }
}

const breakPlanner = new BreakPlanner();
export default breakPlanner;