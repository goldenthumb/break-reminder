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
const constants_1 = require("../../lib/constants");
const contexts_1 = require("../contexts");
const Header_1 = __importDefault(require("../components/Header"));
const Body_1 = __importDefault(require("../components/Body"));
const TimeBoard_1 = __importDefault(require("../components/TimeBoard"));
const BreakTimePicker_1 = __importDefault(require("../components/BreakTimePicker"));
const OptionList_1 = __importDefault(require("../components/OptionList"));
const Main = () => {
    const { state } = react_1.useContext(contexts_1.Context);
    const { showBreakWindow, reminderInterval, breakDuration } = state;
    react_1.useEffect(() => {
        if (showBreakWindow)
            return;
        electron_1.ipcRenderer.send(constants_1.IPC_EVENT.BREAK_WINDOW, {
            status: 'open',
            delay: reminderInterval
        });
    }, [showBreakWindow, reminderInterval]);
    react_1.useEffect(() => {
        if (!showBreakWindow)
            return;
        electron_1.ipcRenderer.send(constants_1.IPC_EVENT.BREAK_WINDOW, {
            status: 'close',
            delay: breakDuration
        });
    }, [showBreakWindow, breakDuration]);
    return react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Header_1.default, null),
        react_1.default.createElement(Body_1.default, null,
            react_1.default.createElement(TimeBoard_1.default, null),
            react_1.default.createElement(BreakTimePicker_1.default, null),
            react_1.default.createElement(OptionList_1.default, null)));
};
exports.default = Main;
