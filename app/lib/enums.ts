export enum IPC_EVENT {
  GET_PREFERENCES = 'get.preferences',
  SET_PREFERENCES = 'set.preferences',
  GET_ALARM_INFO = 'get.alarm-metadata',
  POWER_ON = 'power.on',
  POWER_OFF = 'power.off',
  BLOCKER = 'blocker',
  QUIT = 'quit',
}

export enum MILLISECOND {
  HOUR = 60 * 60 * 1000,
  MIN = 60 * 1000,
  SEC = 1000,
}
