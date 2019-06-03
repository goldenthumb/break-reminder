"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const electron_1 = require("electron");
const io_1 = require("react-icons/io");
const css = require('./TimeBoard.scss');
const contexts_1 = require("../../contexts");
const utils_1 = require("../../../lib/utils");
const constants_1 = require("../../../lib/constants");
const useTimer_1 = __importDefault(require("../../hooks/useTimer"));
const Button_1 = __importDefault(require("../Button"));
const TimeCounter_1 = __importDefault(require("../TimeCounter"));
const TimeBoard = () => {
    const { state: { reminderInterval, showBreakWindow } } = react_1.useContext(contexts_1.Context);
    const { timeLeft, play, pause, reset } = useTimer_1.default({ time: reminderInterval, interval: constants_1.MILLISECOND.MIN });
    const [isPlay, setPlayStatus] = react_1.useState(true);
    const [hour, min] = utils_1.msToTime(timeLeft);
    react_1.useEffect(() => {
        if (!showBreakWindow && timeLeft !== reminderInterval) {
            reset(reminderInterval);
        }
    }, [showBreakWindow, reminderInterval]);
    react_1.useEffect(() => {
        isPlay ? play() : pause();
    }, [isPlay]);
    const togglePlay = () => {
        if (showBreakWindow)
            return;
        const nextPlay = !isPlay;
        if (nextPlay) {
            electron_1.ipcRenderer.send(constants_1.IPC_EVENT.BREAK_WINDOW, {
                status: 'open',
                delay: timeLeft
            });
        }
        else {
            electron_1.ipcRenderer.send(constants_1.IPC_EVENT.BREAK_WINDOW, {
                status: 'pause'
            });
        }
        setPlayStatus(nextPlay);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: css['time-board'] },
            react_1.default.createElement(TimeCounter_1.default, { type: 'h', time: hour, onIncrease: () => {
                    if (hour >= 23)
                        return;
                    electron_1.ipcRenderer.send(constants_1.IPC_EVENT.REMINDER_INTERVAL, ((hour + 1) * constants_1.MILLISECOND.HOUR) + (min * constants_1.MILLISECOND.MIN));
                }, onDecrease: () => {
                    if (hour < 0)
                        return;
                    electron_1.ipcRenderer.send(constants_1.IPC_EVENT.REMINDER_INTERVAL, (hour === 0 ? 0 : ((hour - 1) * constants_1.MILLISECOND.HOUR)) + (min * constants_1.MILLISECOND.MIN));
                } }),
            react_1.default.createElement(TimeCounter_1.default, { type: 'm', time: min.toString().padStart(2, '0'), onIncrease: () => {
                    if (min >= 59)
                        return;
                    electron_1.ipcRenderer.send(constants_1.IPC_EVENT.REMINDER_INTERVAL, (hour * constants_1.MILLISECOND.HOUR) + ((min + 1) * constants_1.MILLISECOND.MIN));
                }, onDecrease: () => {
                    if (hour === 0 && min <= 1)
                        return;
                    electron_1.ipcRenderer.send(constants_1.IPC_EVENT.REMINDER_INTERVAL, (hour * constants_1.MILLISECOND.HOUR) + (min === 0 ? 0 : ((min - 1) * constants_1.MILLISECOND.MIN)));
                } })),
        react_1.default.createElement("div", { className: css['pause-btn-wrap'] },
            react_1.default.createElement(Button_1.default, { theme: 'round-red', action: togglePlay }, isPlay ? react_1.default.createElement(io_1.IoIosPause, null) : react_1.default.createElement(io_1.IoIosPlay, null)))));
};
exports.default = TimeBoard;
