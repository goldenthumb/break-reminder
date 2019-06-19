export enum IPC_EVENT {
  PREFERENCES = 'preferences',
  BLOCKER = 'blocker',
  REMINDER_INTERVAL = 'reminderInterval',
  BREAK_DURATION = 'breakDuration',
  OPTION = 'options',
  NOTIFICATION = 'notification',
  QUIT = 'quit',
}

export enum MILLISECOND {
  HOUR = 60 * 60 * 1000,
  MIN = 60 * 1000,
  SEC = 1000,
}
