"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = require("path");
const fs_1 = require("fs");
class Store {
    constructor(opts) {
        this._parseDataFile = (filePath, defaults) => {
            try {
                return JSON.parse(fs_1.readFileSync(filePath).toString());
            }
            catch (error) {
                return defaults;
            }
        };
        const userDataPath = (electron_1.app || electron_1.remote.app).getPath('userData');
        this._path = path_1.join(userDataPath, opts.configName + '.json');
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
        fs_1.writeFileSync(this._path, JSON.stringify(this._data));
    }
}
exports.default = Store;
