import { msToTime } from '../../../lib/utils';
import { MILLISECOND } from '../../../lib/enums';

const MAX_HOUR = 23;
const MIN_HOUR = 0;

const MAX_MINUTE = 59;
const MIN_MINUTE = 1;

export type TimeType = {
  type: 'hour' | 'minute',
  time: number
}

export function increase({ type, time }: TimeType) {
  const [hour, minute] = msToTime(time);

  if (type === 'hour') {
    return increaseHour(hour, minute);
  }

  if (type === 'minute') {
    return increaseMinute(hour, minute);
  }
}

export function decrease({ type, time }: TimeType) {
  const [hour, minute] = msToTime(time);

  if (type === 'hour') {
    return decreaseHour(hour, minute);
  }

  if (type === 'minute') {
    return decreaseMinute(hour, minute);
  }
}

function increaseHour(hour: number, minute: number) {
  if (hour >= MAX_HOUR) return false;
  return ((hour + 1) * MILLISECOND.HOUR) + (minute * MILLISECOND.MIN);
}

function decreaseHour(hour: number, minute: number) {
  if (hour < MIN_HOUR) return;
  return (hour === 0 ? 0 : ((hour - 1) * MILLISECOND.HOUR)) + (minute * MILLISECOND.MIN);
}

function increaseMinute(hour: number, minute: number) {
  if (minute >= MAX_MINUTE) return;
  return (hour * MILLISECOND.HOUR) + ((minute + 1) * MILLISECOND.MIN);
}

function decreaseMinute(hour: number, minute: number) {
  if (hour === 0 && minute <= MIN_MINUTE) return;
  return (hour * MILLISECOND.HOUR) + (minute === 0 ? 0 : ((minute - 1) * MILLISECOND.MIN));
}
