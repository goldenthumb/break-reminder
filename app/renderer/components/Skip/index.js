"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const electron_1 = require("electron");
const constants_1 = require("../../../lib/constants");
const css = require('./Skip.scss');
const Button_1 = __importDefault(require("../Button"));
const Skip = () => (react_1.default.createElement("div", { className: css['wrap'] },
    react_1.default.createElement(Button_1.default, { theme: 'skip', action: () => {
            electron_1.ipcRenderer.send(constants_1.IPC_EVENT.BREAK_WINDOW, {
                status: 'skip',
            });
        } }, "skip")));
exports.default = Skip;
