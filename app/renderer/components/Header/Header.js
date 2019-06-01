"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const io_1 = require("react-icons/io");
const electron_1 = require("electron");
const css = require('./Header.scss');
const Button_1 = require("../Button");
const Header = () => (React.createElement("div", { className: css['header'] },
    React.createElement("div", { className: css['title'] }, "Break Reminder"),
    React.createElement("div", { className: css['button-wrap'] },
        React.createElement(Button_1.default, { theme: 'quit-icon', action: () => electron_1.ipcRenderer.send('quit') },
            React.createElement(io_1.IoIosPower, null)))));
exports.default = Header;
