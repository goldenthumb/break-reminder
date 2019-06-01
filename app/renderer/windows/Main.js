"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_1 = require("react");
const electron_1 = require("electron");
const constants_1 = require("../../lib/constants");
const contexts_1 = require("../contexts");
const Header_1 = require("../components/Header");
const Body_1 = require("../components/Body");
const TimeBoard_1 = require("../components/TimeBoard");
const BreakTimePicker_1 = require("../components/BreakTimePicker");
const OptionList_1 = require("../components/OptionList");
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
    return React.createElement(React.Fragment, null,
        React.createElement(Header_1.default, null),
        React.createElement(Body_1.default, null,
            React.createElement(TimeBoard_1.default, null),
            React.createElement(BreakTimePicker_1.default, null),
            React.createElement(OptionList_1.default, null)));
};
exports.default = Main;
