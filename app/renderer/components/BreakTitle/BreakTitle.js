"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const electron_1 = require("electron");
const constants_1 = require("../../../lib/constants");
const css = require('./BreakTitle.scss');
const BreakTitle = () => {
    const { options } = electron_1.ipcRenderer.sendSync(constants_1.IPC_EVENT.PREFERENCES);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: css['title'] }, "Time For a Break"),
        options.sound && (React.createElement("div", { className: css['sub-title'] }, `You'll hear a sound when done`))));
};
exports.default = BreakTitle;
