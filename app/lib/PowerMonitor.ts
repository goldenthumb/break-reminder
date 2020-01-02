import { powerMonitor } from 'electron';
import { EventEmitter } from 'events';
import { Listener } from './types';

export default class PowerMonitor {
    private _emitter: EventEmitter;
    private _events: Array<string>;

    constructor() {
        this._emitter = new EventEmitter();
        this._events = [];

        this._attachEvents();
    }

    on(fn: Listener) {
        this._emitter.on('on', fn);
    }

    off(fn: Listener) {
        this._emitter.on('off', fn);
    }

    private _attachEvents() {
        powerMonitor.on('suspend', () => {
            if (!this._events.length) this._emitter.emit('off');
            this._events.push('suspend');
        });

        powerMonitor.on('resume', () => {
            this._events = this._events.filter((status) => status !== 'suspend');
            if (!this._events.length) this._emitter.emit('on');
        });

        powerMonitor.on('lock-screen', () => {
            if (!this._events.length) this._emitter.emit('off');
            this._events.push('lock');
        });

        powerMonitor.on('unlock-screen', () => {
            this._events = this._events.filter((status) => status !== 'lock');
            if (!this._events.length) this._emitter.emit('on');
        });
    }
}
