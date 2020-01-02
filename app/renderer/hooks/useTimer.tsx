import { useEffect, useState } from 'react';

export interface UseTimerProps {
    time: number;
    interval: number;
    autoPlay?: boolean;
}

export default function useTimer({ time, interval, autoPlay = true }: UseTimerProps) {
    const [leftTime, setLeftTime] = useState(time);
    const [isPlay, setPlay] = useState(autoPlay);
    const percent = Math.round(((time - leftTime) / time) * 100);

    useEffect(() => {
        if (!isPlay) return;

        const timer = setTimeout(() => {
            const nextLeftTime = leftTime - interval;

            if (nextLeftTime >= 0) {
                setLeftTime(nextLeftTime);
            }
        }, interval);

        return () => clearTimeout(timer);
    }, [isPlay, leftTime]);

    const play = () => setPlay(true);
    const pause = () => setPlay(false);
    const reset = (updateTime = time) => setLeftTime(updateTime);
    const toggle = (bool?: boolean) => setPlay(bool || !isPlay);

    return { isPlay, leftTime, percent, play, pause, reset, toggle };
}
