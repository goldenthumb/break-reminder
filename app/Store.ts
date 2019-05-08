import { app, remote } from 'electron';
import * as path from 'path';
import * as fs from 'fs';

class Store {
  private _path: string;
  private _data: object;

  constructor(opts) {
    const userDataPath = (app || remote.app).getPath('userData');
    this._path = path.join(userDataPath, opts.configName + '.json');
    this._data = parseDataFile(this._path, opts.defaults);
  }

  get(key) {
    return this._data[key];
  }

  all() {
    return this._data;
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

const parseDataFile = (filePath, defaults) => {
  try {
    return JSON.parse(fs.readFileSync(filePath).toString());
  } catch (error) {
    return defaults;
  }
};

export default Store;