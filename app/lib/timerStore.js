class TimerStore {
  constructor () {
    this.timers = {};
  }

  set(timer) {
    return this.timers[timer] = timer;
  }

  has(timer) {
    return !!this.timers[timer]
  }

  get(timer) {
    return this.timers[timer];
  }

  clear(timer) {
    if (this.has(timer)) {
      clearTimeout(this.timers[timer]);
    }
  }
}

const timerStore = new TimerStore();
export default timerStore;