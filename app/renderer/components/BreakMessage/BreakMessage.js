"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const electron_1 = require("electron");
const constants_1 = require("../../../lib/constants");
const css = require('./BreakMessage.scss');
const useTimer_1 = require("../../hooks/useTimer");
const BreakTitle_1 = require("../BreakTitle");
const Progress_1 = require("../Progress");
const Skip_1 = require("../Skip");
const Audio_1 = require("../Audio");
const BreakMessage = () => {
    const { breakDuration } = electron_1.ipcRenderer.sendSync(constants_1.IPC_EVENT.PREFERENCES);
    const breakTime = breakDuration - 2000;
    const { percent } = useTimer_1.default({ time: breakTime, interval: 100 });
    return (React.createElement("div", { className: css['message-wrap'] },
        React.createElement("div", { className: css['content'] },
            React.createElement(BreakTitle_1.default, null),
            React.createElement(Progress_1.default, { percent: percent }),
            React.createElement(Skip_1.default, null),
            React.createElement(Audio_1.default, null))));
};
exports.default = BreakMessage;
