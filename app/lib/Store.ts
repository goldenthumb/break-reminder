import { app } from 'electron';
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
    this._path = join(app.getPath('userData'), opts.configName + '.json');
    this._data = this._loadFile(this._path, opts.defaults);
  }

  load() {
    return this._data;
  }

  save(data: T) {
    this._data = data;
    this._save();
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

  _loadFile = (filePath: string, defaults: T) => {
    try {
      return JSON.parse(readFileSync(filePath).toString());
    } catch {
      return defaults;
    }
  }
}

export default Store;
