"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const css = require('./TimeCounter.scss');
const TimeCounter = ({ type, time, onIncrease, onDecrease }) => {
    return (react_1.default.createElement("div", { className: css['wrap'] },
        react_1.default.createElement("button", { type: "button", className: css['up'], onClick: onIncrease }, "\u25B2"),
        react_1.default.createElement("span", { className: css[type] }, time),
        react_1.default.createElement("button", { type: "button", className: css['down'], onClick: onDecrease }, "\u25BC"),
        react_1.default.createElement("span", { className: css['label'] }, type)));
};
exports.default = TimeCounter;
