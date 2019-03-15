class TimerStore {
  constructor () {
    this.timers = {};
  }

  set(key, timer) {
    return this.timers[key] = timer;
  }

  has(key) {
    return !!this.timers[key]
  }

  get(key) {
    return this.timers[key];
  }

  clear(key) {
    if (this.has(key)) {
      clearTimeout(this.timers[key]);
    }
  }
}

const timerStore = new TimerStore();
export default timerStore;