"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const STATUS = {
    PLAY: 'play',
    PAUSE: 'pause',
};
const useTimer = ({ time, interval, autoPlay = true }) => {
    const { PLAY, PAUSE } = STATUS;
    const [timeLeft, setTimeLeft] = react_1.useState(time);
    const [status, setStatus] = react_1.useState(autoPlay ? PLAY : PAUSE);
    const percent = Math.round((time - timeLeft) / time * 100);
    react_1.useEffect(() => {
        if (status !== PLAY)
            return;
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
exports.default = useTimer;
