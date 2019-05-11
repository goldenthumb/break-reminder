import { app, remote } from 'electron';
import * as path from 'path';
import * as fs from 'fs';

interface StoreOptions {
  configName: string;
  defaults: Preferences;
}

export interface Preferences {
  reminderInterval: number;
  breakDuration: number;
  options: Options;
}

export interface Options {
  startAtLogin: boolean;
  notification: boolean;
  sound: boolean;
}

class Store {
  private _path: string;
  private _data: Preferences;

  constructor(opts: StoreOptions) {
    const userDataPath = (app || remote.app).getPath('userData');
    this._path = path.join(userDataPath, opts.configName + '.json');
    this._data = parseDataFile(this._path, opts.defaults);
  }

  all(): Preferences {
    return this._data;
  }

  getOptions(): Options {
    return this._data['options'];
  }

  set(key: keyof Preferences, val: number | Options) {
    this._data[key] = val;
    this._save();
  }

  remove(key: keyof Preferences) {
    delete this._data[key];
    this._save();
  }

  _save() {
    fs.writeFileSync(this._path, JSON.stringify(this._data));
  }
}

const parseDataFile = (filePath: string, defaults: Preferences) => {
  try {
    return JSON.parse(fs.readFileSync(filePath).toString());
  } catch (error) {
    return defaults;
  }
};

export default Store;