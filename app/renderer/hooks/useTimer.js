import { useEffect, useState } from 'react';

const STATUS = {
  PLAY: 'play',
  PAUSE: 'pause',
};

const useTimer = ({ time, interval, autoPlay = true }) => {
  const { PLAY, PAUSE } = STATUS;
  const [timeLeft, setTimeLeft] = useState(time);
  const [status, setStatus] = useState(autoPlay ? PLAY : PAUSE);
  const percent = parseInt((time - timeLeft) / time * 100);

  useEffect(() => {
    if (status !== PLAY) return;

    const timeLeftTimer = setTimeout(() => {
      const nextTimeLeft = timeLeft - interval;

      if (nextTimeLeft >= 0) {
        setTimeLeft(nextTimeLeft);
      }
    }, interval);

    return () => clearTimeout(timeLeftTimer);
  }, [status, timeLeft]);

  const play = () => setStatus(PLAY);
  const pause = () => setStatus(PAUSE);
  const reset = (updateTime = time) => setTimeLeft(updateTime);

  return { timeLeft, percent, play, pause, reset };
};

export default useTimer;