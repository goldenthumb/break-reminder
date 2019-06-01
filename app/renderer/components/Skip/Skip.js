"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const electron_1 = require("electron");
const constants_1 = require("../../../lib/constants");
const css = require('./Skip.scss');
const Button_1 = require("../Button");
const Skip = () => (React.createElement("div", { className: css['wrap'] },
    React.createElement(Button_1.default, { theme: 'skip', action: () => {
            electron_1.ipcRenderer.send(constants_1.IPC_EVENT.BREAK_WINDOW, {
                status: 'skip',
            });
        } }, "skip")));
exports.default = Skip;
