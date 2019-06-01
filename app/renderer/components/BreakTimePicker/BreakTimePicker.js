"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_1 = require("react");
const electron_1 = require("electron");
const moment = require("moment");
const rc_time_picker_1 = require("rc-time-picker");
require("rc-time-picker/assets/index.css");
const css = require('./BreakTimePicker.scss');
const contexts_1 = require("../../contexts");
const constants_1 = require("../../../lib/constants");
const utils_1 = require("../../../lib/utils");
const time = moment();
const BreakTimePicker = () => {
    const { state: { breakDuration } } = react_1.useContext(contexts_1.Context);
    const [hour, min, sec] = utils_1.msToTime(breakDuration);
    time.set({ h: hour, m: min, s: sec });
    return (React.createElement("div", { className: css['time-picker-wrap'] },
        React.createElement("span", null, "break time :"),
        React.createElement(rc_time_picker_1.default, { className: css['break-time-picker'], showSecond: true, allowEmpty: false, defaultValue: time, onChange: (time) => {
                const { HOUR, MIN, SEC } = constants_1.MILLISECOND;
                const ms = time.hours() * HOUR + time.minutes() * MIN + time.seconds() * SEC;
                electron_1.ipcRenderer.send(constants_1.IPC_EVENT.BREAK_DURATION, ms);
            } })));
};
exports.default = BreakTimePicker;
