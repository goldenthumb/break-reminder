export enum IPC_EVENT {
  GET_PREFERENCES = 'get.preferences',
  SET_PREFERENCES = 'set.preferences',
  GET_Alarm_INFO = 'get.alarm-metadata',
  ACTIVE_POWER = 'active.power',
  BLOCKER = 'blocker',
  QUIT = 'quit',
}

export enum MILLISECOND {
  HOUR = 60 * 60 * 1000,
  MIN = 60 * 1000,
  SEC = 1000,
}
