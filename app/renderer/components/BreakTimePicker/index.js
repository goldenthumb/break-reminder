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
const moment_1 = __importDefault(require("moment"));
const rc_time_picker_1 = __importDefault(require("rc-time-picker"));
require("rc-time-picker/assets/index.css");
const css = require('./BreakTimePicker.scss');
const contexts_1 = require("../../contexts");
const constants_1 = require("../../../lib/constants");
const utils_1 = require("../../../lib/utils");
const BreakTimePicker = () => {
    const { state: { breakDuration } } = react_1.useContext(contexts_1.Context);
    const [hour, min, sec] = utils_1.msToTime(breakDuration);
    const time = moment_1.default({ h: hour, m: min, s: sec });
    return (react_1.default.createElement("div", { className: css['time-picker-wrap'] },
        react_1.default.createElement("span", null, "break time :"),
        react_1.default.createElement(rc_time_picker_1.default, { className: css['break-time-picker'], showSecond: true, allowEmpty: false, defaultValue: time, onChange: (time) => {
                const { HOUR, MIN, SEC } = constants_1.MILLISECOND;
                const ms = time.hours() * HOUR + time.minutes() * MIN + time.seconds() * SEC;
                electron_1.ipcRenderer.send(constants_1.IPC_EVENT.BREAK_DURATION, ms);
            } })));
};
exports.default = BreakTimePicker;
