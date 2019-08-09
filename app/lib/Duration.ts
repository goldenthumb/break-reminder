export default class Duration {
    public _duration: number = 0;
    private _timer: NodeJS.Timer | null = null;
    private _callback: (() => void) | null = null;

    time(duration: number = this._duration) {
        this._duration = duration;
        this._timer = setTimeout(() => {
            if (this._callback) this._callback();
        }, duration);

        return this;
    }

    callback(fn: () => void) {
        this._callback = fn;

        return this;
    }

    clear() {
        if (this._timer) {
            clearTimeout(this._timer);
        }

        return this;
    }
}
