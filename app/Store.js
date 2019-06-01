"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = require("path");
const fs = require("fs");
class Store {
    constructor(opts) {
        this._parseDataFile = (filePath, defaults) => {
            try {
                return JSON.parse(fs.readFileSync(filePath).toString());
            }
            catch (error) {
                return defaults;
            }
        };
        const userDataPath = (electron_1.app || electron_1.remote.app).getPath('userData');
        this._path = path.join(userDataPath, opts.configName + '.json');
        this._data = this._parseDataFile(this._path, opts.defaults);
    }
    all() {
        return this._data;
    }
    get(key) {
        return this._data[key];
    }
    set(key, val) {
        this._data[key] = val;
        this._save();
    }
    remove(key) {
        delete this._data[key];
        this._save();
    }
    _save() {
        fs.writeFileSync(this._path, JSON.stringify(this._data));
    }
}
exports.default = Store;
