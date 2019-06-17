import { MILLISECOND } from './enums';

export interface Notification {
  title?: string;
  options?: NotificationOptions;
}

interface NotificationOptions {
  body?: string;
  silent?: boolean;
}

class Notifier {
  private _timer: NodeJS.Timer | null = null;
  public title: string = 'Preparing break ...';
  public options: NotificationOptions = {
    body: 'Break will commence in 60 seconds.',
    silent: false
  };

  setNotification({ title, options }: Notification) {
    if (title) {
      this.title = title;
    }

    this.options = {
      ...this.options,
      ...options
    };
  }

  run(delay = 0) {
    delay = delay - MILLISECOND.MIN;

    if (delay < 0) return;

    if (this._timer) {
      clearTimeout(this._timer);
    }

    this._timer = setTimeout(() => {
       new Notification(this.title, this.options);
    }, delay);
  }
}

const notifier = new Notifier();
export default notifier;
