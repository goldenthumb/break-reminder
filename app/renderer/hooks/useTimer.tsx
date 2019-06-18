import { useEffect, useState } from 'react';

enum STATUS {
  PLAY,
  PAUSE
}

export interface UseTimerProps {
  time: number;
  interval: number;
  autoPlay?: boolean;
}

const useTimer = ({ time, interval, autoPlay = true }: UseTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(time);
  const [status, setStatus] = useState(autoPlay ? STATUS.PLAY : STATUS.PAUSE);
  const percent = Math.round((time - timeLeft) / time * 100);

  useEffect(() => {
    if (status !== STATUS.PLAY) return;

    const timeLeftTimer = setTimeout(() => {
      const nextTimeLeft = timeLeft - interval;

      if (nextTimeLeft >= 0) {
        setTimeLeft(nextTimeLeft);
      }
    }, interval);

    return () => clearTimeout(timeLeftTimer);
  }, [status, timeLeft]);

  const play = () => setStatus(STATUS.PLAY);
  const pause = () => setStatus(STATUS.PAUSE);
  const reset = (updateTime = time) => setTimeLeft(updateTime);

  return { timeLeft, percent, play, pause, reset };
};

export default useTimer;
