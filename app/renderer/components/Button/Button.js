"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const css = require('./Button.scss');
const Button = ({ theme, action, children }) => (React.createElement("button", { type: 'button', className: css[theme], onClick: action }, children));
exports.default = Button;
