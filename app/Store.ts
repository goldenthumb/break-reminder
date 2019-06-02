import { app, remote } from 'electron';
import { join } from 'path';
import { writeFileSync, readFileSync } from 'fs';

interface StoreOptions<Default> {
  configName: string;
  defaults: Default;
}

class Store<T extends object> {
  private _path: string;
  private _data: T;

  constructor(opts: StoreOptions<T>) {
    const userDataPath = (app || remote.app).getPath('userData');
    this._path = join(userDataPath, opts.configName + '.json');
    this._data = this._parseDataFile(this._path, opts.defaults);
  }

  all() {
    return this._data;
  }

  get<K extends keyof T>(key: K) {
    return this._data[key];
  }

  set<K extends keyof T>(key: K, val: T[K]) {
    this._data[key] = val;
    this._save();
  }

  remove(key: keyof T) {
    delete this._data[key];
    this._save();
  }

  _save() {
    writeFileSync(this._path, JSON.stringify(this._data));
  }

  _parseDataFile = (filePath: string, defaults: T) => {
    try {
      return JSON.parse(readFileSync(filePath).toString());
    } catch (error) {
      return defaults;
    }
  }
}

export default Store;