const IPC_EVENT = {
  PREFERENCES: 'preferences',
  MAIN_WINDOW: 'getMainWindowId',
  BREAK_WINDOW: 'breakWindow',
  REMINDER_INTERVAL: 'reminderInterval',
  BREAK_DURATION: 'breakDuration',
  OPTION: 'options',
  NOTIFICATION: 'notification',
};

const MILLISECOND = {
  HOUR: 60 * 60 * 1000,
  MIN: 60 * 1000,
  SEC: 1000
};

module.exports = {
  IPC_EVENT,
  MILLISECOND
};