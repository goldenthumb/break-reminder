"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const electron_1 = require("electron");
const constants_1 = require("../../../lib/constants");
const css = require('./BreakTitle.scss');
const BreakTitle = () => {
    const { options } = electron_1.ipcRenderer.sendSync(constants_1.IPC_EVENT.PREFERENCES);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: css['title'] }, "Time For a Break"),
        options.sound && (react_1.default.createElement("div", { className: css['sub-title'] }, `You'll hear a sound when done`))));
};
exports.default = BreakTitle;
