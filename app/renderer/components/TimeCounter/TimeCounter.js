"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const css = require('./TimeCounter.scss');
const TimeCounter = ({ type, time, onIncrease, onDecrease }) => {
    return (React.createElement("div", { className: css['wrap'] },
        React.createElement("button", { type: "button", className: css['up'], onClick: onIncrease }, "\u25B2"),
        React.createElement("span", { className: css[type] }, time),
        React.createElement("button", { type: "button", className: css['down'], onClick: onDecrease }, "\u25BC"),
        React.createElement("span", { className: css['label'] }, type)));
};
exports.default = TimeCounter;
