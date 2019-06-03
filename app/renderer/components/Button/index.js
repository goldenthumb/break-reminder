"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const css = require('./Button.scss');
const Button = ({ theme, action, children }) => (react_1.default.createElement("button", { type: 'button', className: css[theme], onClick: action }, children));
exports.default = Button;
