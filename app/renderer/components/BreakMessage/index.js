"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const electron_1 = require("electron");
const constants_1 = require("../../../lib/constants");
const css = require('./BreakMessage.scss');
const useTimer_1 = __importDefault(require("../../hooks/useTimer"));
const BreakTitle_1 = __importDefault(require("../BreakTitle"));
const Progress_1 = __importDefault(require("../Progress"));
const Skip_1 = __importDefault(require("../Skip"));
const Audio_1 = __importDefault(require("../Audio"));
const BreakMessage = () => {
    const { breakDuration } = electron_1.ipcRenderer.sendSync(constants_1.IPC_EVENT.PREFERENCES);
    const breakTime = breakDuration - 2000;
    const { percent } = useTimer_1.default({ time: breakTime, interval: 100 });
    return (react_1.default.createElement("div", { className: css['message-wrap'] },
        react_1.default.createElement("div", { className: css['content'] },
            react_1.default.createElement(BreakTitle_1.default, null),
            react_1.default.createElement(Progress_1.default, { percent: percent }),
            react_1.default.createElement(Skip_1.default, null),
            react_1.default.createElement(Audio_1.default, null))));
};
exports.default = BreakMessage;
