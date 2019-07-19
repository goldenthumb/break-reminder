import Store from '../lib/Store';

export interface Options {
  startAtLogin: boolean;
  notification: boolean;
  sound: boolean;
}

export interface Preferences {
  reminderInterval: number;
  breakDuration: number;
  options: Options;
}

const defaultPreferences: Preferences = {
  reminderInterval: 30 * 60 * 1000,
  breakDuration: 20 * 1000,
  options: {
    startAtLogin: false,
    notification: true,
    sound: true
  }
};

export const store = new Store<Preferences>({
  configName: 'preferences',
  defaults: defaultPreferences
});
