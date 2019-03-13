import EventEmitter from 'event-emitter';

import TimerStore from './TimerStore';
import breakWindow from './breakWindow';

class BreakPlanner {
  constructor() {
    this._emitter = new EventEmitter();
    this._timerStore = new TimerStore();
  }

  on(eventName, listener) {
    this._emitter.on(eventName, listener);
  }

  startWorking(ms) {
    this._timerStore.clear('workingTimer');

    const workingTimer = setTimeout(() => {
      breakWindow.open();
      this._emitter.emit('endWorking');
    }, ms);

    this._timerStore.set('workingTimer', workingTimer);
  }

  clearWorkingTimer() {
    this._timerStore.clear('workingTimer');
  }

  startBreak(ms) {
    this._timerStore.clear('breakTimer');

    const breakTimer = setTimeout(() => {
      breakWindow.close();
      this._emitter.emit('endBreak');
    }, ms);

    this._timerStore.set('breakTimer', breakTimer);
  }

  clearBreakTimer() {
    this._timerStore.clear('breakTimer');
  }
}

const breakPlanner = new BreakPlanner();
export default breakPlanner;