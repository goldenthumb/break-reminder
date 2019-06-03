"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const io_1 = require("react-icons/io");
const electron_1 = require("electron");
const css = require('./Header.scss');
const Button_1 = __importDefault(require("../Button"));
const Header = () => (react_1.default.createElement("div", { className: css['header'] },
    react_1.default.createElement("div", { className: css['title'] }, "Break Reminder"),
    react_1.default.createElement("div", { className: css['button-wrap'] },
        react_1.default.createElement(Button_1.default, { theme: 'quit-icon', action: () => electron_1.ipcRenderer.send('quit') },
            react_1.default.createElement(io_1.IoIosPower, null)))));
exports.default = Header;
