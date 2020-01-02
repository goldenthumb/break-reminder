export interface Notification {
    title?: string;
    options?: NotificationOptions;
}

export interface NotificationOptions {
    body?: string;
    silent?: boolean;
}

export default class Notifier {
    private _isActive = true;
    private _title: string;
    private _options: NotificationOptions;

    constructor(title: string, options: NotificationOptions) {
        this._title = title;
        this._options = options;
    }

    run() {
        if (!this._isActive) return;
        // eslint-disable-next-line no-new
        new Notification(this._title, this._options);
    }

    setOption(options: NotificationOptions) {
        this._options = {
            ...this._options,
            ...options,
        };
    }

    setActive(active: boolean) {
        this._isActive = active;
    }
}
